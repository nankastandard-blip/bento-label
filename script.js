document.addEventListener('DOMContentLoaded', () => {
    // プレビュー更新関数の定義（最上部）
    function updatePreview() {
        try {
            console.log("[App] Updating preview...");
            const displayName = elements.inputs.name?.value?.trim() || '商品名未入力';
            if (elements.preview.name) {
                elements.preview.name.textContent = displayName;
                // 名称の文字数に応じてフォントサイズを自動調整
                if (displayName.length > 15) elements.preview.name.style.fontSize = '8pt';
                else if (displayName.length > 11) elements.preview.name.style.fontSize = '9pt';
                else elements.preview.name.style.fontSize = '10.5pt';
            }

            // 本日のおすすめ表示
            if (elements.preview.recommendation) {
                elements.preview.recommendation.style.display = elements.inputs.toggleRecommendation?.checked ? 'block' : 'none';
            }

            if (elements.preview.category) elements.preview.category.textContent = elements.inputs.category?.value || '弁当';
            
            // 原材料名の表示
            if (elements.preview.ingredients) {
                const rawIngredients = elements.inputs.ingredients?.value || '-';
                elements.preview.ingredients.textContent = formatIngredientsWithOrigin(rawIngredients);
            }
            
            // 消費期限の計算
            const daysAdd = parseInt(elements.inputs.consumeDays?.value) || 0;
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + daysAdd);
            const formattedDate = `${targetDate.getFullYear().toString().slice(-2)}.${String(targetDate.getMonth() + 1).padStart(2, '0')}.${String(targetDate.getDate()).padStart(2, '0')}`;
            if (elements.preview.consume) elements.preview.consume.textContent = formattedDate;
            
            const hintEl = document.getElementById('calculated-date-hint');
            if (hintEl) hintEl.textContent = `印字される日付: ${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;

            if (elements.preview.store) elements.preview.store.textContent = elements.inputs.storeMethod?.value || '-';
            if (elements.preview.calories) elements.preview.calories.textContent = elements.inputs.calories?.value || '-';
            if (elements.preview.protein) elements.preview.protein.textContent = elements.inputs.protein?.value ? parseFloat(elements.inputs.protein.value).toFixed(1) : '-';
            if (elements.preview.fat) elements.preview.fat.textContent = elements.inputs.fat?.value ? parseFloat(elements.inputs.fat.value).toFixed(1) : '-';
            if (elements.preview.carb) elements.preview.carb.textContent = elements.inputs.carb?.value ? parseFloat(elements.inputs.carb.value).toFixed(1) : '-';
            if (elements.preview.salt) elements.preview.salt.textContent = elements.inputs.salt?.value ? parseFloat(elements.inputs.salt.value).toFixed(1) : '-';

            const price = parseInt(elements.inputs.price?.value) || 0;
            if (elements.preview.priceTax) elements.preview.priceTax.textContent = price > 0 ? price.toLocaleString() : '-';

            // 製造者情報
            const syncStore = (idx) => {
                const suffix = idx === 1 ? '' : '2';
                const elPrv = elements.preview;
                const elInp = elements.inputs;
                if (elPrv[`manufacturerTitle${suffix}`]) elPrv[`manufacturerTitle${suffix}`].textContent = elInp[`manufacturerTitle${suffix}`]?.value || '製造者';
                if (elPrv[`manufacturer${suffix}`]) elPrv[`manufacturer${suffix}`].textContent = elInp[`manufacturer${suffix}`]?.value || '-';
                if (elPrv[`address${suffix}`]) elPrv[`address${suffix}`].textContent = elInp[`address${suffix}`]?.value || '-';
                
                const isManuf = elInp[`manufacturerTitle${suffix}`]?.value === '製造者' || elInp[`manufacturerTitle${suffix}`]?.value === '製造所';
                const phoneV = elInp[`phone${suffix}`]?.value?.trim() || '';
                if (elPrv[`phoneContainer${suffix}`]) {
                    if (isManuf && phoneV) {
                        elPrv[`phoneContainer${suffix}`].style.display = 'block';
                        if (elPrv[`phone${suffix}`]) elPrv[`phone${suffix}`].textContent = phoneV;
                    } else elPrv[`phoneContainer${suffix}`].style.display = 'none';
                }
            };
            syncStore(1);
            if (elements.inputs.useSecondStore?.checked && elements.preview.storeInfo2) {
                elements.preview.storeInfo2.style.display = 'flex'; syncStore(2);
            } else if (elements.preview.storeInfo2) elements.preview.storeInfo2.style.display = 'none';

            // リサイクルマーク
            const packMarkChecked = document.querySelector('input[name="packaging-mark"]:checked');
            const packMarkVal = packMarkChecked ? packMarkChecked.value : 'プラ';
            if (elements.preview.packagingMark) {
                if (packMarkVal === 'なし') elements.preview.packagingMark.style.display = 'none';
                else {
                    elements.preview.packagingMark.style.display = 'inline-flex';
                    const svgPla = `<svg viewBox="0 0 100 100"><path d="M25,14 h50 a11,11 0 0 1 11,11 v20" stroke="#000" stroke-width="4.5" fill="none" /><polygon points="86,40 100,56 72,56" fill="#000" /><path d="M75,86 h-50 a11,11 0 0 1 -11,-11 v-20" stroke="#000" stroke-width="4.5" fill="none" /><polygon points="14,60 0,44 28,44" fill="#000" /><text x="50" y="65" font-family="sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="#000">プラ</text></svg>`;
                    const svgKami = `<svg viewBox="0 0 100 100"><path d="M15,20 h70 a10,10 0 0 1 10,10 v40 a10,10 0 0 1 -10,10 h-70 a10,10 0 0 1 -10,-10 v-40 a10,10 0 0 1 10,-10Z" stroke="#000" stroke-width="5" fill="none" /><text x="50" y="66" font-family="sans-serif" font-size="42" font-weight="900" text-anchor="middle" fill="#000">紙</text></svg>`;
                    elements.preview.packagingMark.innerHTML = (packMarkVal === '紙') ? svgKami : svgPla;
                }
            }

            // バーコード生成 (重要: 印刷安定のため画像方式)
            if (elements.inputs.useJancode?.checked && elements.inputs.jancodeValue?.value) {
                if (elements.preview.barcodeContainer) elements.preview.barcodeContainer.style.display = 'block';
                try {
                    const val = elements.inputs.jancodeValue.value.trim();
                    const format = (val.length === 13 && /^\d+$/.test(val)) ? "EAN13" : "CODE128";
                    const tempCanvas = document.createElement('canvas');
                    if (typeof JsBarcode === 'function') {
                        JsBarcode(tempCanvas, val, { format: format, width: 2, height: 40, displayValue: true, fontSize: 14, margin: 0 });
                        if (elements.preview.barcodeImg) elements.preview.barcodeImg.src = tempCanvas.toDataURL();
                    }
                } catch (err) { console.error("Barcode error", err); }
            } else if (elements.preview.barcodeContainer) elements.preview.barcodeContainer.style.display = 'none';

            // QRコード生成
            [1, 2].forEach(n => {
                const useQR = elements.inputs[`useQRCode${n}`]?.checked;
                const val = elements.inputs[`qrcodeValue${n}`]?.value?.trim();
                const previewImg = elements.preview[`qrcode${n}`];
                if (useQR && val && previewImg) {
                    previewImg.style.display = 'block';
                    if (typeof QRCode !== 'undefined') {
                        QRCode.toDataURL(val, { width: 120, margin: 1 }).then(url => { previewImg.src = url; }).catch(e => console.error(e));
                    }
                } else if (previewImg) previewImg.style.display = 'none';
            });
            console.log("[App] updatePreview success");
        } catch (e) { console.error("[App] updatePreview error:", e); }
    }

    // ===== 💡 データベース =====
    const bentoDictionary = [
        { keywords: ['日替わり', '日替'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆を含む）', calories: '700', protein: '20.0', fat: '25.0', carb: '95.0', salt: '3.0', price: '600' } },
        { keywords: ['チキン南蛮', '南蛮'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、鶏肉（ブラジル産）、タルタルソース、南蛮酢、その他おかず／（一部に小麦・卵・乳成分・鶏肉・大豆を含む）', calories: '850', protein: '25.0', fat: '35.0', carb: '105.0', salt: '3.5', price: '600' } },
        { keywords: ['とんかつ', '豚カツ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、豚ロースカツ（国産）、とんかつソース、その他おかず／（一部に小麦・卵・乳成分・豚肉・大豆・りんごを含む）', calories: '920', protein: '28.0', fat: '40.0', carb: '110.0', salt: '3.8', price: '650' } },
        { keywords: ['唐揚げ', 'からあげ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、鶏肉の唐揚げ、その他おかず／（一部に小麦・卵・乳成分・鶏肉・大豆を含む）', calories: '820', protein: '28.5', fat: '32.1', carb: '95.6', salt: '3.5', price: '550' } },
        { keywords: ['おにぎり', 'オニギリ'], data: { ingredients: '塩飯（米（国産）、塩）、さけ、海苔（国産）／調味料（アミノ酸等）、（一部にさけ・大豆を含む）', calories: '350', protein: '8.5', fat: '2.0', carb: '72.0', salt: '1.8', price: '200', category: 'おにぎり' } },
        { keywords: ['ハンバーグ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、ハンバーグ（牛肉、豚肉）、デミグラスソース、その他おかず／（一部に小麦・卵・乳成分・牛肉・豚肉・大豆を含む）', calories: '780', protein: '22.0', fat: '30.0', carb: '100.0', salt: '3.2', price: '650' } },
        { keywords: ['パッタイ'], data: { ingredients: 'ビーフン（国内製造）、えび、厚揚げ、もやし、ニラ、卵、パッタイソース／（一部に小麦・卵・えび・落花生・大豆を含む）', calories: '580', protein: '15.0', fat: '18.0', carb: '85.0', salt: '4.5', price: '600', category: '調理めん' } }
    ];

    const elements = {
        inputs: {
            preset: document.getElementById('preset-select'),
            storeProfile: document.getElementById('store-profile-select'),
            storeProfileName: document.getElementById('store-profile-name'),
            name: document.getElementById('product-name'),
            category: document.getElementById('category'),
            ingredients: document.getElementById('ingredients'),
            consumeDays: document.getElementById('consume-days'),
            storeMethod: document.getElementById('store-method'),
            calories: document.getElementById('calories'),
            protein: document.getElementById('protein'),
            fat: document.getElementById('fat'),
            carb: document.getElementById('carb'),
            salt: document.getElementById('salt'),
            price: document.getElementById('price'),
            manufacturerTitle: document.getElementById('manufacturer-title'),
            manufacturer: document.getElementById('manufacturer'),
            address: document.getElementById('address'),
            phone: document.getElementById('phone'),
            useSecondStore: document.getElementById('use-second-store'),
            manufacturerTitle2: document.getElementById('manufacturer-title2'),
            manufacturer2: document.getElementById('manufacturer2'),
            address2: document.getElementById('address2'),
            phone2: document.getElementById('phone2'),
            useQRCode1: document.getElementById('use-qrcode1'),
            qrcodeValue1: document.getElementById('qrcode1-value'),
            useQRCode2: document.getElementById('use-qrcode2'),
            qrcodeValue2: document.getElementById('qrcode2-value'),
            useJancode: document.getElementById('use-jancode'),
            jancodeValue: document.getElementById('jancode-value'),
            toggleRecommendation: document.getElementById('toggle-recommendation'),
            smartImportText: document.getElementById('smart-import-text'),
            quickPreset: document.getElementById('quick-preset-select'),
            quickStoreProfile: document.getElementById('quick-store-profile-select')
        },
        wrappers: {
            qrcode1: document.getElementById('qrcode1-wrapper'),
            qrcode2: document.getElementById('qrcode2-wrapper'),
            secondStore: document.getElementById('second-store-wrapper'),
            jancode: document.getElementById('jancode-wrapper'),
            inlineScanner: document.getElementById('inline-scanner-container')
        },
        preview: {
            recommendation: document.getElementById('preview-recommendation'),
            name: document.getElementById('preview-name'),
            category: document.getElementById('preview-category'),
            ingredients: document.getElementById('preview-ingredients'),
            consume: document.getElementById('preview-consume'),
            store: document.getElementById('preview-store'),
            calories: document.getElementById('preview-calories'),
            protein: document.getElementById('preview-protein'),
            fat: document.getElementById('preview-fat'),
            carb: document.getElementById('preview-carb'),
            salt: document.getElementById('preview-salt'),
            priceTax: document.getElementById('preview-price-tax'),
            manufacturerTitle: document.getElementById('preview-manufacturer-title'),
            manufacturer: document.getElementById('preview-manufacturer'),
            address: document.getElementById('preview-address'),
            phone: document.getElementById('preview-phone'),
            phoneContainer: document.getElementById('preview-phone-container'),
            storeInfo2: document.getElementById('preview-store-info-2'),
            manufacturerTitle2: document.getElementById('preview-manufacturer-title2'),
            manufacturer2: document.getElementById('preview-manufacturer2'),
            address2: document.getElementById('preview-address2'),
            phone2: document.getElementById('preview-phone2'),
            phoneContainer2: document.getElementById('preview-phone-container2'),
            qrcode1: document.getElementById('preview-qrcode1'),
            qrcode2: document.getElementById('preview-qrcode2'),
            packagingMark: document.getElementById('preview-packaging-mark'),
            barcodeContainer: document.getElementById('preview-barcode-container'),
            barcodeImg: document.getElementById('preview-barcode')
        },
        buttons: {
            printBtns: [document.getElementById('print-btn-header'), document.getElementById('print-btn-footer')],
            printCountH: document.getElementById('print-count-header'),
            savePreset: document.getElementById('save-preset-btn'),
            autoFill: document.getElementById('auto-fill-btn'),
            searchWeb: document.getElementById('search-web-btn'),
            executeSmartImport: document.getElementById('execute-smart-import'),
            startScan: document.getElementById('start-scan-btn'),
            stopScan: document.getElementById('stop-scan-btn')
        }
    };

    let userTemplates = {};
    let userManuallyChangedCategory = false; 
    let userManuallyChangedStoreMethod = false;
    let html5QrScanner = null;

    // --- State & Storage ---
    const saveTemplates = () => localStorage.setItem('bentoAllTemplates', JSON.stringify(userTemplates));
    const loadTemplates = () => {
        userTemplates = JSON.parse(localStorage.getItem('bentoAllTemplates') || '{}');
        renderPresetOptions();
    };
    const renderPresetOptions = () => {
        const html = '<option value="">-- メニューを選択 --</option>' + Object.keys(userTemplates).map(id => `<option value="${id}">${userTemplates[id].name || '未設定'}</option>`).join('');
        if (elements.inputs.preset) elements.inputs.preset.innerHTML = html;
        if (elements.inputs.quickPreset) elements.inputs.quickPreset.innerHTML = html;
    };
    const syncToggles = () => {
        if (elements.wrappers.qrcode1) elements.wrappers.qrcode1.style.display = elements.inputs.useQRCode1?.checked ? 'block' : 'none';
        if (elements.wrappers.qrcode2) elements.wrappers.qrcode2.style.display = elements.inputs.useQRCode2?.checked ? 'block' : 'none';
        if (elements.wrappers.secondStore) elements.wrappers.secondStore.style.display = elements.inputs.useSecondStore?.checked ? 'block' : 'none';
        if (elements.wrappers.jancode) elements.wrappers.jancode.style.display = elements.inputs.useJancode?.checked ? 'block' : 'none';
    };
    const loadStoreInfo = (id) => {
        const info = JSON.parse(localStorage.getItem(`bentoStoreInfo_${id}`) || '{}');
        Object.keys(info).forEach(k => {
            if (elements.inputs[k]) {
                if (elements.inputs[k].type === 'checkbox') elements.inputs[k].checked = !!info[k];
                else elements.inputs[k].value = info[k] || '';
            }
        });
        syncToggles(); updatePreview();
    };
    const saveStoreInfo = () => {
        const d = {}; ['manufacturerTitle','manufacturer','address','phone','useSecondStore','manufacturerTitle2','manufacturer2','address2','phone2','useQRCode1','qrcodeValue1','useQRCode2','qrcodeValue2']
        .forEach(k => { if (elements.inputs[k]) d[k] = elements.inputs[k].type === 'checkbox' ? elements.inputs[k].checked : elements.inputs[k].value; });
        localStorage.setItem(`bentoStoreInfo_${elements.inputs.storeProfile.value}`, JSON.stringify(d));
    };

    // --- Init ---
    const init = () => {
        loadTemplates();
        const names = JSON.parse(localStorage.getItem('bentoStoreProfileNames') || '{"DEFAULT":"基本パターン"}');
        const profilesHtml = Object.keys(names).map(id => `<option value="${id}">${names[id]}</option>`).join('');
        [elements.inputs.storeProfile, elements.inputs.quickStoreProfile].forEach(el => { if (el) el.innerHTML = profilesHtml; });
        loadStoreInfo(elements.inputs.storeProfile.value);
    };

    const setupListeners = () => {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
                btn.classList.add('active');
                if (document.getElementById(target)) document.getElementById(target).style.display = 'block';
            });
        });

        // Toggles
        ['useQRCode1', 'useQRCode2', 'useSecondStore', 'useJancode'].forEach(id => {
            elements.inputs[id]?.addEventListener('change', () => { syncToggles(); saveStoreInfo(); updatePreview(); });
        });

        // Auto-Fill (高度なフィードバック・重複対応版)
        elements.buttons.autoFill?.addEventListener('click', () => {
            const name = elements.inputs.name.value;
            if (!name) return alert("お弁当の名称を入力してください。");
            const hits = bentoDictionary.filter(d => d.keywords.some(k => name.includes(k)));
            
            if (hits.length === 0) {
                alert('辞書に該当する商品が見つかりませんでした。');
            } else if (hits.length === 1) {
                applyData(hits[0].data);
                alert('辞書から「' + hits[0].keywords[0] + '」のデータを自動入力しました。');
            } else {
                let msg = '複数の候補が見つかりました。番号を入力してください：\n';
                hits.forEach((h, i) => msg += (i + 1) + ': ' + h.keywords[0] + '\n');
                const choice = prompt(msg, '1');
                if (choice && hits[choice - 1]) {
                    applyData(hits[choice - 1].data);
                    alert('「' + hits[choice - 1].keywords[0] + '」のデータを適用しました。');
                }
            }
        });

        // Smart Import
        elements.buttons.executeSmartImport?.addEventListener('click', () => {
            const data = smartParse(elements.inputs.smartImportText.value);
            if (Object.keys(data).length > 0) {
                Object.keys(data).forEach(k => { if (elements.inputs[k]) elements.inputs[k].value = data[k]; });
                updatePreview(); alert("解析が完了しました。");
            } else alert("解析できる情報が見つかりませんでした。");
        });

        // Search Web
        elements.buttons.searchWeb?.addEventListener('click', () => {
            const name = elements.inputs.name.value;
            if (!name) return alert("検索したい商品名を入力してください。");
            window.open(`https://www.google.com/search?q=${encodeURIComponent(name + ' 栄養成分 原材料')}`, '_blank');
        });

        // Scanner
        elements.buttons.startScan?.addEventListener('click', () => {
            elements.wrappers.inlineScanner.style.display = 'block';
            if (typeof Html5QrcodeScanner !== 'undefined') {
                html5QrScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
                html5QrScanner.render(text => { elements.inputs.jancodeValue.value = text; html5QrScanner.clear(); elements.wrappers.inlineScanner.style.display = 'none'; updatePreview(); });
            }
        });
        elements.buttons.stopScan?.addEventListener('click', () => { if (html5QrScanner) html5QrScanner.clear(); elements.wrappers.inlineScanner.style.display = 'none'; });

        // Auto Inference
        elements.inputs.name?.addEventListener('input', () => {
            const inf = inferCategory(elements.inputs.name.value);
            if (inf && !userManuallyChangedCategory) {
                elements.inputs.category.value = inf;
                if (!userManuallyChangedStoreMethod) elements.inputs.storeMethod.value = inferStoreMethod(inf, elements.inputs.name.value);
            }
            updatePreview();
        });

        // Manual changes
        elements.inputs.category?.addEventListener('change', () => userManuallyChangedCategory = true);
        elements.inputs.storeMethod?.addEventListener('change', () => userManuallyChangedStoreMethod = true);

        // Rice Radio
        document.querySelectorAll('input[name="rice-type"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                let cur = elements.inputs.ingredients.value;
                ["御飯（米（国産））", "玄米（米（国産））", "麦入り御飯（米（国産）、大麦）", "もち米（国産）", "五穀米（米（国産）、五穀）"].forEach(t => cur = cur.replace(t, ""));
                elements.inputs.ingredients.value = (e.target.value === "なし") ? cur.replace(/^、/, "") : e.target.value + (cur.startsWith('、') ? '' : '、') + cur;
                updatePreview();
            });
        });

        // Presets & Print
        [elements.inputs.preset, elements.inputs.quickPreset].forEach(el => el?.addEventListener('change', e => { if (userTemplates[e.target.value]) applyData(userTemplates[e.target.value]); }));
        elements.buttons.savePreset?.addEventListener('click', () => { const n = elements.inputs.name.value.trim(); if (!n) return alert("名称を入力してください"); const id = elements.inputs.preset.value || ('U_'+Date.now()); userTemplates[id] = getCurrentFormData(); userTemplates[id].name = n; saveTemplates(); renderPresetOptions(); alert("テンプレートを保存しました。"); });
        elements.buttons.printBtns.forEach(b => b?.addEventListener('click', () => {
            const count = parseInt(document.getElementById('print-count-footer')?.value || document.getElementById('print-count-header')?.value) || 1;
            const spool = document.getElementById('print-spool');
            spool.innerHTML = '';
            for (let i = 0; i < count; i++) { const clone = document.getElementById('print-target').cloneNode(true); clone.removeAttribute('id'); spool.appendChild(clone); }
            window.print();
        }));

        // Generic Save Store Info
        document.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', () => { if (el.id.includes('manufacturer') || el.id.includes('address') || el.id.includes('phone') || el.id.includes('qrcode')) saveStoreInfo(); updatePreview(); });
        });
    };

    // --- Helpers ---
    const smartParse = (text) => {
        const res = {};
        const pts = { calories: /(?:熱量|エネルギー|kcal|量)[\s:：]?(?:[\d,.]+)/i, protein: /(?:蛋白質|たんぱく質|たんぱく)[\s:：]?(?:[\d,.]+)/, fat: /(?:脂質)[\s:：]?(?:[\d,.]+)/, carb: /(?:炭水化物|糖質)[\s:：]?(?:[\d,.]+)/, salt: /(?:食塩相当量|食塩)[\s:：]?(?:[\d,.]+)/, ingredients: /(?:原材料名|原材料)(\s|：|:)?([\s\S]+?)(?=(栄養成分|アレルギー|保存方法|販売者|製造者|$))/ };
        const ext = (s) => (s && s.match(/[\d,.]+/)) ? s.match(/[\d,.]+/)[0].replace(/,/g, '') : null;
        Object.keys(pts).forEach(k => { const m = text.match(pts[k]); if (m) { if (k === 'ingredients') res[k] = m[2].trim().replace(/^[:：\s]+/, ""); else res[k] = ext(m[0]); } });
        return res;
    };
    const inferCategory = (name) => { const n = name.toLowerCase(); if (n.includes('弁当')) return '弁当'; if (n.includes('おにぎり')) return 'おにぎり'; if (n.includes('惣菜') || n.includes('サラダ')) return '惣菜'; if (n.includes('うどん') || n.includes('そば') || n.includes('パスタ')) return '調理めん'; return null; };
    const inferStoreMethod = (cat, name='') => { if (name.includes('冷凍')) return '-18℃以下で保存'; if (['弁当','惣菜','調理めん','おにぎり'].includes(cat)) return '10℃以下で保存'; return '直射日光・高温多湿を避け保存'; };
    const formatIngredientsWithOrigin = (t) => t;
    const getCurrentFormData = () => { const d = {}; ['name','category','ingredients','consumeDays','storeMethod','calories','protein','fat','carb','salt','price','useJancode','jancodeValue'].forEach(k => { if (elements.inputs[k]) d[k] = elements.inputs[k].type === 'checkbox' ? elements.inputs[k].checked : elements.inputs[k].value; }); return d; };
    const applyData = (data) => {
        Object.keys(data).forEach(k => { if (elements.inputs[k]) { if (elements.inputs[k].type === 'checkbox') elements.inputs[k].checked = !!data[k]; else elements.inputs[k].value = data[k] || ''; } });
        syncToggles(); updatePreview();
    };

    init(); setupListeners();
});
