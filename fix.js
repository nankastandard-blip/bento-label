const fs = require('fs');

const index = \<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>お弁当ラベルメーカー</title>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/lib/browser.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div style="padding: 20px;">
        <h1>🍱 お弁当ラベルメーカー</h1>
        <div>
            <input type="text" id="product-name" placeholder="商品名を入力 (例: パッタイ)">
            <button id="auto-fill-btn">🪄 自動入力</button>
        </div>
        <textarea id="ingredients" style="width: 100%; height: 100px;"></textarea>
        <div id="preview" style="border: 1px solid #000; padding: 10px; margin-top: 10px;">
            <div id="preview-name"></div>
            <div id="preview-ingredients"></div>
            <img id="preview-qrcode" style="width: 100px; height: 100px;">
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>\;

const script = \
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('product-name');
    const ingInput = document.getElementById('ingredients');
    const previewName = document.getElementById('preview-name');
    const previewIng = document.getElementById('preview-ingredients');
    const previewQR = document.getElementById('preview-qrcode');
    const btn = document.getElementById('auto-fill-btn');

    const dict = [
        { key: 'パッタイ', ing: 'ビーフン、えび、もやし、ナンプラー' },
        { key: '幕の内', ing: 'ご飯、鮭、卵焼き、惣菜' }
    ];

    function update() {
        previewName.textContent = nameInput.value;
        previewIng.textContent = ingInput.value;
        if (typeof window.QRCode !== 'undefined') {
            window.QRCode.toDataURL(nameInput.value || "test", (err, url) => {
                if (!err) previewQR.src = url;
            });
        }
    }

    btn.addEventListener('click', () => {
        const val = nameInput.value;
        const hit = dict.find(d => val.includes(d.key));
        if (hit) {
            ingInput.value = hit.ing;
            update();
        }
    });

    nameInput.addEventListener('input', update);
});
\;

fs.writeFileSync('index.html', index, 'utf8');
fs.writeFileSync('script.js', script, 'utf8');
console.log('Success');
