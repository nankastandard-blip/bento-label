const fs = require('fs');
const path = require('path');

const indexHtml = \<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>??????????</title>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/lib/browser.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div style="padding: 20px;">
        <h1>?? ?????????? (???)</h1>
        <div style="margin-bottom: 10px;">
            <input type="text" id="product-name" placeholder="?????? (?: ????)" style="padding: 5px; width: 250px;">
            <button id="auto-fill-btn" style="padding: 5px;">?? ????</button>
        </div>
        <div>
            <textarea id="ingredients" style="width: 100%; height: 60px;" placeholder="????"></textarea>
        </div>
        <div style="margin-top: 10px; border: 1px solid #ccc; padding: 10px; width: 300px;">
            <div id="preview-name" style="font-weight: bold;"></div>
            <div id="preview-ingredients" style="font-size: 0.8rem; margin-top: 5px;"></div>
            <div id="qrcode-container" style="margin-top: 10px;">
                <img id="preview-qrcode1" style="width: 100px; height: 100px; border: 1px solid #ddd;">
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>\;

const scriptJs = \
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script v1.2 loaded");
    const inputs = {
        name: document.getElementById('product-name'),
        ingredients: document.getElementById('ingredients')
    };
    const preview = {
        name: document.getElementById('preview-name'),
        ingredients: document.getElementById('preview-ingredients'),
        qrcode1: document.getElementById('preview-qrcode1')
    };
    const autoFillBtn = document.getElementById('auto-fill-btn');

    const dictionary = [
        { keywords: ['????', 'pattai'], ingredients: '????????????????????????????????????????????????????????????' },
        { keywords: ['???', '??'], ingredients: '???????????????????????????????????????????????' }
    ];

    function updateQRCode(text) {
        if (typeof window.QRCode !== 'undefined') {
            window.QRCode.toDataURL(text || "test", (err, url) => {
                if (!err) preview.qrcode1.src = url;
            });
        }
    }

    autoFillBtn?.addEventListener('click', () => {
        const val = inputs.name.value;
        const hit = dictionary.find(d => d.keywords.some(k => val.includes(k)));
        if (hit) {
            inputs.ingredients.value = hit.ingredients;
            preview.name.textContent = val;
            preview.ingredients.textContent = hit.ingredients;
            updateQRCode(val);
        } else {
            alert("???????");
        }
    });

    inputs.name?.addEventListener('input', () => {
        preview.name.textContent = inputs.name.value;
        updateQRCode(inputs.name.value);
    });
});
\;

fs.writeFileSync('index.html', indexHtml, 'utf8');
fs.writeFileSync('script.js', scriptJs, 'utf8');
console.log('Files written via Node.js (UTF-8 assured)');
