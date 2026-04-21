document.addEventListener('DOMContentLoaded', () => {
    // プレビュー更新関数の定義（Hoisting を確実にするため最上部付近に配置）
    function updatePreview() {
        try {
            console.log("[App] Updating preview...");
            const displayName = elements.inputs.name?.value?.trim() || '商品名未入力';
            if (elements.preview.name) {
                elements.preview.name.textContent = displayName;
                
                // 名称の文字数に応じてフォントサイズを自動調整
                if (displayName.length > 15) {
                    elements.preview.name.style.fontSize = '8pt';
                } else if (displayName.length > 11) {
                    elements.preview.name.style.fontSize = '9pt';
                } else {
                    elements.preview.name.style.fontSize = '10.5pt';
                }
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
            if (hintEl) {
                hintEl.textContent = `印字される日付: ${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
            }

            if (elements.preview.store) elements.preview.store.textContent = elements.inputs.storeMethod?.value || '-';
            if (elements.preview.calories) elements.preview.calories.textContent = elements.inputs.calories?.value || '-';
            if (elements.preview.protein) elements.preview.protein.textContent = elements.inputs.protein?.value ? parseFloat(elements.inputs.protein.value).toFixed(1) : '-';
            if (elements.preview.fat) elements.preview.fat.textContent = elements.inputs.fat?.value ? parseFloat(elements.inputs.fat.value).toFixed(1) : '-';
            if (elements.preview.carb) elements.preview.carb.textContent = elements.inputs.carb?.value ? parseFloat(elements.inputs.carb.value).toFixed(1) : '-';
            if (elements.preview.salt) elements.preview.salt.textContent = elements.inputs.salt?.value ? parseFloat(elements.inputs.salt.value).toFixed(1) : '-';

            const price = parseInt(elements.inputs.price?.value) || 0;
            if (elements.preview.priceTax) elements.preview.priceTax.textContent = price > 0 ? price.toLocaleString() : '-';

            // 製造者情報 (1つ目)
            if (elements.preview.manufacturerTitle) elements.preview.manufacturerTitle.textContent = elements.inputs.manufacturerTitle?.value || '製造者';
            if (elements.preview.manufacturer) elements.preview.manufacturer.textContent = elements.inputs.manufacturer?.value || '-';
            if (elements.preview.address) elements.preview.address.textContent = elements.inputs.address?.value || '-';
            
            const isManufacturer = elements.inputs.manufacturerTitle?.value === '製造者' || elements.inputs.manufacturerTitle?.value === '製造所';
            const phoneVal = elements.inputs.phone?.value?.trim() || '';
            if (elements.preview.phoneContainer) {
                if (isManufacturer && phoneVal) {
                    elements.preview.phoneContainer.style.display = 'block';
                    if (elements.preview.phone) elements.preview.phone.textContent = phoneVal;
                } else {
                    elements.preview.phoneContainer.style.display = 'none';
                }
            }

            // 第2の事業者情報
            const useSecond = elements.inputs.useSecondStore?.checked || false;
            if (useSecond && elements.preview.storeInfo2) {
                elements.preview.storeInfo2.style.display = 'flex';
                if (elements.preview.manufacturerTitle2) elements.preview.manufacturerTitle2.textContent = elements.inputs.manufacturerTitle2?.value || '製造者';
                if (elements.preview.manufacturer2) elements.preview.manufacturer2.textContent = elements.inputs.manufacturer2?.value || '-';
                if (elements.preview.address2) elements.preview.address2.textContent = elements.inputs.address2?.value || '-';
                
                const isManufacturer2 = elements.inputs.manufacturerTitle2?.value === '製造者' || elements.inputs.manufacturerTitle2?.value === '製造所';
                const phoneVal2 = elements.inputs.phone2?.value?.trim() || '';
                if (elements.preview.phoneContainer2) {
                    if (isManufacturer2 && phoneVal2) {
                        elements.preview.phoneContainer2.style.display = 'block';
                        if (elements.preview.phone2) elements.preview.phone2.textContent = phoneVal2;
                    } else {
                        elements.preview.phoneContainer2.style.display = 'none';
                    }
                }
            } else if (elements.preview.storeInfo2) {
                elements.preview.storeInfo2.style.display = 'none';
            }

            // リサイクルマーク
            const packMarkChecked = document.querySelector('input[name="packaging-mark"]:checked');
            const packMarkVal = packMarkChecked ? packMarkChecked.value : 'プラ';
            if (elements.preview.packagingMark) {
                if (packMarkVal === 'なし') {
                    elements.preview.packagingMark.style.display = 'none';
                } else {
                    elements.preview.packagingMark.style.display = 'inline-flex';
                    const svgPla = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M25,14 h50 a11,11 0 0 1 11,11 v20" stroke="#000" stroke-width="4.5" fill="none" /><polygon points="86,40 100,56 72,56" fill="#000" /><path d="M75,86 h-50 a11,11 0 0 1 -11,-11 v-20" stroke="#000" stroke-width="4.5" fill="none" /><polygon points="14,60 0,44 28,44" fill="#000" /><text x="50" y="65" font-family="'MS PGothic', 'Noto Sans JP', sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="#000">プラ</text></svg>`;
                    const svgKami = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15,20 h70 a10,10 0 0 1 10,10 v40 a10,10 0 0 1 -10,10 h-70 a10,10 0 0 1 -10,-10 v-40 a10,10 0 0 1 10,-10Z" stroke="#000" stroke-width="5" fill="none" /><text x="50" y="66" font-family="'MS PGothic', 'Noto Sans JP', sans-serif" font-size="42" font-weight="900" text-anchor="middle" fill="#000">紙</text></svg>`;
                    elements.preview.packagingMark.innerHTML = (packMarkVal === '紙') ? svgKami : svgPla;
                    elements.preview.packagingMark.setAttribute('data-type', packMarkVal);
                }
            }

            // バーコード生成
            if (elements.inputs.useJancode?.checked) {
                if (elements.preview.barcodeContainer) elements.preview.barcodeContainer.style.display = 'block';
                try {
                    const val = elements.inputs.jancodeValue?.value?.trim() || '4900000000000';
                    const format = (val.length === 13 && /^\d+$/.test(val)) ? "EAN13" : "CODE128";
                    if (typeof JsBarcode === 'function' && elements.preview.barcodeSvg) {
                        JsBarcode(elements.preview.barcodeSvg, val, {
                            format: format, width: 1.3, height: 20, displayValue: true, fontSize: 10, margin: 0
                        });
                    }
                } catch (err) { console.error("Barcode generation error", err); }
            } else {
                if (elements.preview.barcodeContainer) elements.preview.barcodeContainer.style.display = 'none';
            }

            // QRコード生成 (1つ目)
            if (elements.inputs.useQRCode1?.checked && elements.inputs.qrcodeValue1?.value?.trim() && elements.preview.qrcode1) {
                elements.preview.qrcode1.style.display = 'block';
                if (typeof QRCode !== 'undefined') {
                    QRCode.toDataURL(elements.inputs.qrcodeValue1.value.trim(), {
                        width: 120, margin: 1, color: { dark: "#000000", light: "#ffffff" }
                    })
                    .then(url => {
                        if (elements.preview.qrcode1) elements.preview.qrcode1.src = url;
                    })
                    .catch(err => console.error("[QR1] Generation error:", err));
                }
            } else if (elements.preview.qrcode1) {
                elements.preview.qrcode1.style.display = 'none';
            }

            // QRコード生成 (2つ目)
            if (useSecond && elements.inputs.useQRCode2?.checked && elements.inputs.qrcodeValue2?.value?.trim() && elements.preview.qrcode2) {
                elements.preview.qrcode2.style.display = 'block';
                if (typeof QRCode !== 'undefined') {
                    QRCode.toDataURL(elements.inputs.qrcodeValue2.value.trim(), {
                        width: 120, margin: 1, color: { dark: "#000000", light: "#ffffff" }
                    })
                    .then(url => {
                        if (elements.preview.qrcode2) elements.preview.qrcode2.src = url;
                    })
                    .catch(err => console.error("[QR2] Generation error:", err));
                }
            } else if (elements.preview.qrcode2) {
                elements.preview.qrcode2.style.display = 'none';
            }

            console.log("[App] updatePreview executed successfully");
        } catch (globalErr) {
            console.error("[App] updatePreview stopped by error:", globalErr);
        }
    }

    // ===== 💡 データベース =====
    const bentoDictionary = [
        { keywords: ['日替わり', '日替'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆・ごま・りんごを含む）', calories: '700', protein: '20.0', fat: '25.0', carb: '95.0', salt: '3.0', price: '600' } },
        { keywords: ['チキン南蛮', '南蛮'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、鶏肉（ブラジル産）、タルタルソース、南蛮酢、その他おかず／（一部に小麦・卵・乳成分・鶏肉・大豆を含む）', calories: '850', protein: '25.0', fat: '35.0', carb: '105.0', salt: '3.5', price: '600' } },
        { keywords: ['とんかつ', '豚カツ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、豚ロースカツ（国産）、とんかつソース、その他おかず／（一部に小麦・卵・乳成分・豚肉・大豆・りんごを含む）', calories: '920', protein: '28.0', fat: '40.0', carb: '110.0', salt: '3.8', price: '650' } },
        { keywords: ['ハンバーグ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、ハンバーグ（牛肉、豚肉）、デミグラスソース、その他おかず／（一部に小麦・卵・乳成分・牛肉・豚肉・大豆を含む）', calories: '780', protein: '22.0', fat: '30.0', carb: '100.0', salt: '3.2', price: '650' } },
        { keywords: ['焼肉', '焼き肉', '牛カルビ', 'カルビ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、牛肉、玉ねぎ、焼肉のたれ、その他おかず／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・牛肉・ごま・大豆・りんごを含む）', calories: '810', protein: '20.0', fat: '28.0', carb: '115.0', salt: '3.5', price: '700' } },
        { keywords: ['唐揚げ', 'からあげ'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、鶏肉の唐揚げ、その他おかず／（一部に小麦・卵・乳成分・鶏肉・大豆を含む）', calories: '820', protein: '28.5', fat: '32.1', carb: '95.6', salt: '3.5', price: '550' } },
        { keywords: ['おにぎり', 'オニギリ', 'おむすび'], data: { ingredients: '塩飯（米（国産）、塩）、鮭フレーク、海苔（国産）／調味料（アミノ酸等）、着色料（紅麹）、（一部にさけ・大豆を含む）', calories: '350', protein: '8.5', fat: '2.0', carb: '72.0', salt: '1.8', price: '200', category: 'おにぎり' } },
        { keywords: ['チャーハン', '炒飯'], data: { ingredients: '麦入り御飯（米（国産）、大麦）、焼豚、卵、ネギ、植物油脂、中華調味料、醤油、食塩、胡椒／調味料（アミノ酸等）、着色料（カラメル）、（一部に小麦・卵・乳成分・豚肉・大豆・ごまを含む）', calories: '680', protein: '15.0', fat: '22.0', carb: '95.0', salt: '4.2', price: '500' } },
        { keywords: ['やきそば', '焼きそば'], data: { ingredients: 'ゆで中華めん（国内製造）、キャベツ、豚肉、もやし、人参、濃厚ソース、植物油脂、青のり／調味料（アミノ酸等）、カラメル色素、かんすい、酸味料、（一部に小麦・豚肉・大豆・りんごを含む）', calories: '550', protein: '12.0', fat: '18.0', carb: '75.0', salt: '4.5', price: '400', category: '調理めん' } },
        { keywords: ['コロッケ', 'じゃがいも'], data: { ingredients: 'じゃがいも（国産）、玉ねぎ、パン粉、小麦粉、砂糖、植物油脂、食塩、香辛料／加工デンプン、調味料（アミノ酸）、（一部に小麦・大豆を含む）', calories: '280', protein: '4.5', fat: '15.0', carb: '32.0', salt: '0.8', price: '150', category: '惣菜' } },
        { keywords: ['メンチ', 'メンチカツ'], data: { ingredients: '食肉（豚肉（国産）、牛肉（国産））、玉ねぎ、パン粉、小麦粉、卵、砂糖、食塩、香辛料、植物油脂／加工デンプン、調味料（アミノ酸）、（一部に小麦・卵・乳成分・牛肉・豚肉・大豆を含む）', calories: '310', protein: '10.5', fat: '20.0', carb: '22.0', salt: '1.2', price: '180', category: '惣菜' } },
        { keywords: ['とり天', '鶏天', 'たれ付きとり天'], data: { ingredients: '鶏肉（ブラジル産）、小麦粉、卵、澱粉、植物油脂、醤油、おろしにんにく、おろし生姜、食塩、親潮／調味料（アミノ酸等）、パプリカ色素、（一部に小麦・卵・鶏肉・大豆を含む）', calories: '320', protein: '18.5', fat: '18.0', carb: '15.0', salt: '1.5', price: '350', category: '惣菜' } },
        { keywords: ['サラダ', 'ポテトサラダ', 'マカロニサラダ'], data: { ingredients: 'じゃがいも（国産）、マヨネーズ、きゅうり、人参、玉ねぎ、ハム、食塩、香辛料／調味料（アミノ酸等）、（一部に卵・大豆・豚肉・りんごを含む）', calories: '150', protein: '2.5', fat: '12.0', carb: '10.0', salt: '0.6', price: '200', category: '惣菜', storeMethod: '10℃以下で保存' } },
        { keywords: ['パッタイ'], data: { ingredients: 'ビーフン（国内製造）、えび、厚揚げ、もやし、ニラ、卵、おろしにんにく、パッタイソース、ピーナッツ、植物油脂／調味料（アミノ酸等）、酸味料、（一部に小麦・卵・えび・落花生・大豆・ごまを含む）', calories: '580', protein: '15.0', fat: '18.0', carb: '85.0', salt: '4.5', price: '600', category: '調理めん' } }
    ];

    // DOM要素の取得
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
            barcodeSvg: document.getElementById('preview-barcode')
        },
        buttons: {
            printBtns: [document.getElementById('print-btn-header'), document.getElementById('print-btn-footer')],
            printCountH: document.getElementById('print-count-header'),
            printCountF: document.getElementById('print-count-footer'),
            savePreset: document.getElementById('save-preset-btn'),
            copyPreset: document.getElementById('copy-preset-btn'),
            deletePreset: document.getElementById('delete-preset-btn'),
            autoFill: document.getElementById('auto-fill-btn'),
            searchWeb: document.getElementById('search-web-btn'),
            copyStoreProfile: document.getElementById('copy-store-profile-btn'),
            deleteStoreProfile: document.getElementById('delete-store-profile-btn'),
            quickCountMinus: document.getElementById('quick-count-minus'),
            quickCountPlus: document.getElementById('quick-count-plus'),
            startScan: document.getElementById('start-scan-btn'),
            stopScan: document.getElementById('stop-scan-btn')
        }
    };

    let userTemplates = {};
    let userManuallyChangedCategory = false; 
    let userManuallyChangedStoreMethod = false;
    let html5QrScanner = null;

    // --- Core Methods ---
    const saveTemplates = () => localStorage.setItem('bentoAllTemplates', JSON.stringify(userTemplates));
    const loadTemplates = () => {
        const saved = localStorage.getItem('bentoAllTemplates');
        userTemplates = saved ? JSON.parse(saved) : {};
        renderPresetOptions();
    };

    const renderPresetOptions = () => {
        const optionsHtml = '<option value="">-- メニューを選択 --</option>' +
            Object.keys(userTemplates).map(id => `<option value="${id}">${userTemplates[id].name || '未設定'}</option>`).join('');
        if (elements.inputs.preset) elements.inputs.preset.innerHTML = optionsHtml;
        if (elements.inputs.quickPreset) elements.inputs.quickPreset.innerHTML = optionsHtml;
    };

    const getActiveProfileId = () => elements.inputs.storeProfile?.value || 'DEFAULT';

    const getStoreProfileNames = () => {
        const saved = localStorage.getItem('bentoStoreProfileNames');
        return saved ? JSON.parse(saved) : { 'DEFAULT': '基本パターン' };
    };

    const updateProfileDropdown = () => {
        const names = getStoreProfileNames();
        const optionsHtml = Object.keys(names).map(id => `<option value="${id}">${names[id]}</option>`).join('');
        if (elements.inputs.storeProfile) elements.inputs.storeProfile.innerHTML = optionsHtml;
        if (elements.inputs.quickStoreProfile) elements.inputs.quickStoreProfile.innerHTML = optionsHtml;
    };

    const syncToggles = () => {
        if (elements.wrappers.qrcode1) elements.wrappers.qrcode1.style.display = elements.inputs.useQRCode1?.checked ? 'block' : 'none';
        if (elements.wrappers.qrcode2) elements.wrappers.qrcode2.style.display = elements.inputs.useQRCode2?.checked ? 'block' : 'none';
        if (elements.wrappers.secondStore) elements.wrappers.secondStore.style.display = elements.inputs.useSecondStore?.checked ? 'block' : 'none';
        if (elements.wrappers.jancode) elements.wrappers.jancode.style.display = elements.inputs.useJancode?.checked ? 'block' : 'none';
    };

    const loadStoreInfo = (profileId) => {
        const saved = localStorage.getItem(`bentoStoreInfo_${profileId}`);
        if (saved) {
            const info = JSON.parse(saved);
            Object.keys(info).forEach(k => {
                if (elements.inputs[k]) {
                    if (elements.inputs[k].type === 'checkbox') elements.inputs[k].checked = !!info[k];
                    else elements.inputs[k].value = info[k] || '';
                }
            });
        }
        syncToggles();
        updatePreview();
    };

    const saveStoreInfo = () => {
        const profileId = getActiveProfileId();
        const info = {};
        [
            'manufacturerTitle', 'manufacturer', 'address', 'phone', 
            'useSecondStore', 'manufacturerTitle2', 'manufacturer2', 'address2', 'phone2',
            'useQRCode1', 'qrcodeValue1', 'useQRCode2', 'qrcodeValue2'
        ].forEach(k => {
            if (elements.inputs[k]) info[k] = (elements.inputs[k].type === 'checkbox') ? elements.inputs[k].checked : elements.inputs[k].value;
        });
        localStorage.setItem(`bentoStoreInfo_${profileId}`, JSON.stringify(info));
    };

    // --- Initialization ---
    const init = () => {
        loadTemplates();
        updateProfileDropdown();
        loadStoreInfo(getActiveProfileId());
        const names = getStoreProfileNames();
        if (elements.inputs.storeProfileName) elements.inputs.storeProfileName.value = names[getActiveProfileId()] || '';
    };

    // --- Event Listeners ---
    const setupEventListeners = () => {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
                btn.classList.add('active');
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.style.display = 'block';
            });
        });

        // Smart features (Typing inference)
        elements.inputs.name?.addEventListener('input', () => {
            const val = elements.inputs.name.value;
            const inferred = inferCategory(val);
            if (inferred && !userManuallyChangedCategory) {
                elements.inputs.category.value = inferred;
                if (!userManuallyChangedStoreMethod) {
                    elements.inputs.storeMethod.value = inferStoreMethod(inferred, val);
                }
            }
            updatePreview();
        });

        elements.inputs.category?.addEventListener('change', () => userManuallyChangedCategory = true);
        elements.inputs.storeMethod?.addEventListener('change', () => userManuallyChangedStoreMethod = true);

        elements.buttons.autoFill?.addEventListener('click', () => {
            const name = elements.inputs.name.value;
            const hit = bentoDictionary.find(d => d.keywords.some(k => name.includes(k)));
            if (hit) {
                Object.keys(hit.data).forEach(k => { if (elements.inputs[k]) elements.inputs[k].value = hit.data[k]; });
                updatePreview();
                alert('辞書からデータを入力しました。');
            }
        });

        // Profile selectors
        [elements.inputs.storeProfile, elements.inputs.quickStoreProfile].forEach(el => {
            el?.addEventListener('change', (e) => {
                const val = e.target.value;
                if (elements.inputs.storeProfile) elements.inputs.storeProfile.value = val;
                if (elements.inputs.quickStoreProfile) elements.inputs.quickStoreProfile.value = val;
                loadStoreInfo(val);
            });
        });

        // Toggles
        ['useQRCode1', 'useQRCode2', 'useSecondStore', 'useJancode'].forEach(id => {
            elements.inputs[id]?.addEventListener('change', () => { syncToggles(); saveStoreInfo(); updatePreview(); });
        });

        // Preview sync
        document.querySelectorAll('input, select, textarea').forEach(el => {
            if (el.id.startsWith('preview')) return;
            el.addEventListener('input', () => {
                if (el.id.includes('manufacturer') || el.id.includes('address')) saveStoreInfo();
                updatePreview();
            });
        });

        // Rice Radio Buttons
        document.querySelectorAll('input[name="rice-type"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                let current = elements.inputs.ingredients.value;
                const rices = ["御飯（米（国産））", "玄米（米（国産））", "麦入り御飯（米（国産）、大麦）", "もち米（国産）", "五穀米（米（国産）、五穀）"];
                rices.forEach(t => current = current.replace(t, ""));
                if (e.target.value !== "なし") elements.inputs.ingredients.value = e.target.value + (current.startsWith('、') ? '' : '、') + current;
                else elements.inputs.ingredients.value = current.replace(/^、/, "");
                updatePreview();
            });
        });

        // Preset Actions
        [elements.inputs.preset, elements.inputs.quickPreset].forEach(el => {
            el?.addEventListener('change', (e) => {
                const id = e.target.value;
                if (id && userTemplates[id]) applyPreset(userTemplates[id]);
            });
        });

        elements.buttons.savePreset?.addEventListener('click', () => {
            if (!elements.inputs.name.value) return alert("商品名を入力してください");
            const id = elements.inputs.preset.value || ('U_' + Date.now());
            userTemplates[id] = getCurrentFormData();
            saveTemplates(); renderPresetOptions();
            elements.inputs.preset.value = id; alert("保存しました");
        });

        // Print
        const doPrint = () => {
            const count = parseInt(elements.buttons.printCountH.value) || 1;
            const spool = document.getElementById('print-spool');
            if (!spool) return;
            spool.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const clone = document.getElementById('print-target').cloneNode(true);
                clone.removeAttribute('id'); spool.appendChild(clone);
            }
            window.print();
        };
        elements.buttons.printBtns.forEach(b => b?.addEventListener('click', doPrint));

        // Scanner
        elements.buttons.startScan?.addEventListener('click', () => {
            if (elements.wrappers.inlineScanner) elements.wrappers.inlineScanner.style.display = 'block';
            if (typeof Html5QrcodeScanner !== 'undefined') {
                html5QrScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
                html5QrScanner.render((text) => {
                    elements.inputs.jancodeValue.value = text;
                    html5QrScanner.clear(); elements.wrappers.inlineScanner.style.display = 'none';
                    updatePreview();
                });
            }
        });
        elements.buttons.stopScan?.addEventListener('click', () => { if (html5QrScanner) html5QrScanner.clear(); elements.wrappers.inlineScanner.style.display = 'none'; });
    };

    // --- Helpers ---
    const inferCategory = (name) => {
        if (!name) return null;
        const n = name.toLowerCase();
        if (n.includes('弁当')) return '弁当';
        if (n.includes('おにぎり')) return 'おにぎり';
        if (n.includes('惣菜') || n.includes('サラダ')) return '惣菜';
        if (n.includes('うどん') || n.includes('そば') || n.includes('パスタ')) return '調理めん';
        return null;
    };
    const inferStoreMethod = (cat, name='') => {
        if (name.includes('冷凍')) return '-18℃以下で保存';
        if (['弁当','惣菜','調理めん','おにぎり'].includes(cat)) return '10℃以下で保存';
        return '直射日光・高温多湿を避け保存';
    };
    const formatIngredientsWithOrigin = (t) => t;
    const getCurrentFormData = () => {
        const d = {};
        ['name', 'category', 'ingredients', 'consumeDays', 'storeMethod', 'calories', 'protein', 'fat', 'carb', 'salt', 'price', 'useJancode', 'jancodeValue'].forEach(k => {
            if (elements.inputs[k]) d[k] = (elements.inputs[k].type === 'checkbox') ? elements.inputs[k].checked : elements.inputs[k].value;
        });
        return d;
    };
    const applyPreset = (d) => {
        Object.keys(d).forEach(k => {
            if (elements.inputs[k]) {
                if (elements.inputs[k].type === 'checkbox') elements.inputs[k].checked = !!d[k];
                else elements.inputs[k].value = d[k] || '';
            }
        });
        syncToggles(); updatePreview();
    };

    init();
    setupEventListeners();
});
