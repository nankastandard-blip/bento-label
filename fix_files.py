import os

# --- index.html ---
index_html = r"""<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>お弁当ラベルメーカー</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
    <script src="https://unpkg.com/html5-qrcode"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/lib/browser.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container no-print">
        <header class="app-header">
            <div class="header-content">
                <h1>🍱 お弁当ラベルメーカー</h1>
                <p>ブラウザで入力して、ワンクリックで食品表示ラベルを印刷</p>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <input type="number" id="print-count-header" class="form-control" value="1" min="1" style="width: 70px; padding: 0.4rem;">
                <button id="print-btn-header" class="print-btn primary-btn">ラベルを印刷する</button>
            </div>
        </header>

        <main class="app-main">
            <section class="editor-section">
                <div class="tabs-container no-print">
                    <button class="tab-btn active" data-target="tab-quick-print">✨ かんたん印刷</button>
                    <button class="tab-btn" data-target="tab-editor">⚙️ 管理・編集</button>
                </div>

                <div id="tab-quick-print" class="tab-content active">
                    <div class="card">
                        <div class="card-body">
                            <label>🏪 店舗・販売元:</label>
                            <select id="quick-store-profile-select" class="form-control"></select>
                            <label style="margin-top: 1rem; display: block;">🍱 メニューを選択</label>
                            <select id="quick-preset-select" class="form-control">
                                <option value="">-- メニューを選択 --</option>
                            </select>
                            <button id="print-btn-footer" class="print-btn primary-btn" style="width: 100%; margin-top: 2rem;">🚀 この内容で印刷する</button>
                        </div>
                    </div>
                </div>

                <div id="tab-editor" class="tab-content" style="display: none;">
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label>店舗プロファイル</label>
                                <select id="store-profile-select" class="form-control">
                                    <option value="A">店舗 A (既定)</option>
                                    <option value="B">店舗 B</option>
                                    <option value="C">店舗 C</option>
                                </select>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label>商品名</label>
                                <div style="display: flex; gap: 0.5rem;">
                                    <input type="text" id="product-name" class="form-control" placeholder="例：チキン南蛮弁当">
                                    <button type="button" id="auto-fill-btn" class="action-btn">🪄 自動入力</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>原材料名</label>
                                <textarea id="ingredients" class="form-control" rows="4"></textarea>
                            </div>
                            <div class="form-row">
                                <div class="col-6">
                                    <label>消費期限 (日数)</label>
                                    <select id="consume-days" class="form-control">
                                        <option value="0">当日</option>
                                        <option value="1" selected>翌日</option>
                                        <option value="2">2日後</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label>保存方法</label>
                                    <input type="text" id="store-method" class="form-control" value="直射日光を避け保存">
                                </div>
                            </div>
                            <div class="nutrition-grid" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                                <div style="width: 80px;"><label>熱量</label><input type="number" id="calories" class="form-control"></div>
                                <div style="width: 80px;"><label>蛋白質</label><input type="number" id="protein" class="form-control"></div>
                                <div style="width: 80px;"><label>脂質</label><input type="number" id="fat" class="form-control"></div>
                                <div style="width: 80px;"><label>炭水化物</label><input type="number" id="carb" class="form-control"></div>
                                <div style="width: 80px;"><label>食塩</label><input type="number" id="salt" class="form-control"></div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label><input type="checkbox" id="use-qrcode1"> QRコード1を表示</label>
                                <input type="text" id="qrcode1-value" class="form-control" placeholder="URL等">
                            </div>
                             <div class="form-group">
                                <label><input type="checkbox" id="use-jancode"> バーコードを表示</label>
                                <input type="text" id="jancode-value" class="form-control" placeholder="JANコード">
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="preview-section">
                <div id="print-target" class="label-preview" style="background: white; border: 1px solid #000; padding: 10px; width: 300px; min-height: 200px;">
                    <div id="preview-name" style="font-weight: bold; font-size: 11pt;"></div>
                    <div style="font-size: 8pt; margin-top: 5px;"><strong>原材料名：</strong><span id="preview-ingredients"></span></div>
                    <div style="font-size: 8pt;"><strong>消費期限：</strong><span id="preview-consume"></span></div>
                    <div style="font-size: 8pt;"><strong>保存方法：</strong><span id="preview-store"></span></div>
                    <hr style="margin: 5px 0;">
                    <div style="font-size: 7pt;">
                        熱量 <span id="preview-calories"></span>kcal, 蛋白質 <span id="preview-protein"></span>g, 脂質 <span id="preview-fat"></span>g, 炭物 <span id="preview-carb"></span>g, 食塩 <span id="preview-salt"></span>g
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                        <img id="preview-qrcode1" style="width: 50px; height: 50px; display: none;">
                        <img id="preview-barcode" style="height: 30px; display: none;">
                    </div>
                </div>
            </section>
        </main>
    </div>
    <div id="print-spool" class="print-only"></div>
    <script src="script.js"></script>
</body>
</html>
"""

# --- script.js ---
# (I will use \u escaped strings for Japanese in Python to be safe)
script_js = r"""
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        inputs: {
            name: document.getElementById('product-name'),
            ingredients: document.getElementById('ingredients'),
            consumeDays: document.getElementById('consume-days'),
            storeMethod: document.getElementById('store-method'),
            calories: document.getElementById('calories'),
            protein: document.getElementById('protein'),
            fat: document.getElementById('fat'),
            carb: document.getElementById('carb'),
            salt: document.getElementById('salt'),
            useQRCode1: document.getElementById('use-qrcode1'),
            qrcodeValue1: document.getElementById('qrcode1-value'),
            useJancode: document.getElementById('use-jancode'),
            jancodeValue: document.getElementById('jancode-value'),
            storeProfile: document.getElementById('store-profile-select'),
            quickStoreProfile: document.getElementById('quick-store-profile-select'),
            quickPreset: document.getElementById('quick-preset-select')
        },
        preview: {
            name: document.getElementById('preview-name'),
            ingredients: document.getElementById('preview-ingredients'),
            consume: document.getElementById('preview-consume'),
            store: document.getElementById('preview-store'),
            calories: document.getElementById('preview-calories'),
            protein: document.getElementById('preview-protein'),
            fat: document.getElementById('preview-fat'),
            carb: document.getElementById('preview-carb'),
            salt: document.getElementById('preview-salt'),
            qrcode1: document.getElementById('preview-qrcode1'),
            barcode: document.getElementById('preview-barcode')
        },
        buttons: {
            autoFill: document.getElementById('auto-fill-btn'),
            printBtns: [document.getElementById('print-btn-header'), document.getElementById('print-btn-footer')]
        }
    };

    function updatePreview() {
        console.log("Updating preview...");
        try {
            if (elements.preview.name) elements.preview.name.textContent = elements.inputs.name?.value || '';
            if (elements.preview.ingredients) elements.preview.ingredients.textContent = elements.inputs.ingredients?.value || '';
            if (elements.preview.store) elements.preview.store.textContent = elements.inputs.storeMethod?.value || '';
            
            // Date
            const days = parseInt(elements.inputs.consumeDays?.value || 0);
            const d = new Date(); d.setDate(d.getDate() + days);
            if (elements.preview.consume) elements.preview.consume.textContent = d.toLocaleDateString();

            ['calories','protein','fat','carb','salt'].forEach(k => {
                if (elements.preview[k]) elements.preview[k].textContent = elements.inputs[k]?.value || '-';
            });

            // QR code (Safe access to window.QRCode)
            if (elements.inputs.useQRCode1?.checked && elements.inputs.qrcodeValue1?.value) {
                if (typeof window.QRCode !== 'undefined') {
                    window.QRCode.toDataURL(elements.inputs.qrcodeValue1.value)
                        .then(url => { if (elements.preview.qrcode1) { elements.preview.qrcode1.src = url; elements.preview.qrcode1.style.display = 'block'; } })
                        .catch(err => console.error(err));
                }
            } else if (elements.preview.qrcode1) {
                elements.preview.qrcode1.style.display = 'none';
            }
        } catch(e) { console.error("Update Error", e); }
    }

    const bentoDictionary = [
        { keywords: ['パッタイ', 'タイ'], data: { ingredients: 'ビーフン（国内製造）、えび、もやし、ニラ、卵、ナンプラー、砂糖、ピーナッツ／（一部に小麦・卵・えび・落花生・大豆を含む）', calories: '580', protein: '15.0', fat: '18.0', carb: '85.0', salt: '4.5' } },
        { keywords: ['幕の内', '和食'], data: { ingredients: 'ご飯（米（国産））、鮭塩焼き、卵焼き、鶏肉、野菜／（一部に小麦・卵・乳・さけ・鶏肉・大豆を含む）', calories: '650', protein: '22.0', fat: '18.0', carb: '92.0', salt: '3.2' } },
        { keywords: ['イタリアン', 'パスタ', 'ボロネーゼ'], data: { ingredients: 'スパゲティ、牛肉、豚肉、トマトソース、玉ねぎ／（一部に小麦・乳・牛肉・豚肉・大豆を含む）', calories: '620', protein: '18.0', fat: '25.0', carb: '80.0', salt: '3.0' } },
        { keywords: ['サラダ', 'シーザー'], data: { ingredients: 'レタス、クルトン、チーズ、ドレッシング／（一部に小麦・卵・乳・大豆を含む）', calories: '240', protein: '8.0', fat: '15.0', carb: '10.0', salt: '1.2' } }
    ];

    elements.buttons.autoFill?.addEventListener('click', () => {
        const name = elements.inputs.name.value.trim();
        if (!name) return alert("名称を入力してください");
        const hit = bentoDictionary.find(d => d.keywords.some(k => name.includes(k) || k.includes(name)));
        if (hit) {
            Object.keys(hit.data).forEach(k => { if (elements.inputs[k]) elements.inputs[k].value = hit.data[k]; });
            updatePreview();
            alert("「" + name + "」の内容を適用しました");
        } else {
            alert("見つかりませんでした");
        }
    });

    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', updatePreview);
    });

    updatePreview();
});
"""

base_path = r"c:\Users\user\Desktop\練習用\bento-label-maker"
with open(os.path.join(base_path, "index.html"), "w", encoding="utf-8") as f:
    f.write(index_html)
with open(os.path.join(base_path, "script.js"), "w", encoding="utf-8") as f:
    f.write(script_js)

print("Restoration complete (UTF-8 assured)")
