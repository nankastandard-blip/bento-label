document.addEventListener('DOMContentLoaded', function() {
    console.log("Bento Label Maker Script v2 Loaded");

    var elements = {
        inputs: {
            name: document.getElementById('product-name'),
            ingredients: document.getElementById('ingredients'),
            useQRCode1: document.getElementById('use-qrcode1'),
            qrcodeValue1: document.getElementById('qrcode1-value')
        },
        preview: {
            name: document.getElementById('preview-name'),
            ingredients: document.getElementById('preview-ingredients'),
            qrcode1: document.getElementById('preview-qrcode1')
        },
        buttons: {
            autoFill: document.getElementById('auto-fill-btn'),
            printBtns: [document.getElementById('print-btn-header')]
        }
    };

    // Dictionary with Escaped Japanese
    var bentoDictionary = [
        // Thai
        { keywords: ['\u30d1\u30c3\u30bf\u30a4', 'pattai'], data: { ingredients: '\u30d3\u30fc\u30d5\u30f3\uff08\u56fd\u5185\u88fd\u9020\uff09\u3001\u3048\u3073\u3001\u3082\u3084\u3057\u3001\u30cb\u30e9\u3001\u5375\u3001\u30ca\u30f3\u30d7\u30e9\u30fc\u3001\u7802\u7cd6\u3001\u30d4\u30fc\u30ca\u30c3\u30c4\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u3048\u3073\u30fb\u843d\u82b1\u751f\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09' } },
        { keywords: ['\u30ac\u30d1\u30aa', 'gapao'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9d20\u8089\u3001\u30ca\u30f3\u30d7\u30e9\u30fc\u3001\u30d0\u30b8\u30eb\u3001\u5375\u3001\u30d1\u30d7\u30ea\u30ab\u3001\u7389\u306d\u304e\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u9d20\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09' } },
        // Japanese
        { keywords: ['\u5e55\u306e\u5185', 'makunouchi'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9bad\u5869\u713c\u304d\u3001\u5375\u713c\u304d\u3001\u713c\u304d\u7269\u3001\u60e3\u83dc\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u3048\u3073\u30fb\u3055\u3051\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09' } },
        { keywords: ['\u5510\u63da\u3052', 'karaage'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9d20\u5510\u63da\u3052\u3001\u526f\u83dc\u3001\u30ad\u30e3\u30d9\u30c4\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u9d20\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09' } },
        // Italian
        { keywords: ['\u30da\u30da\u30ed\u30f3\u30c1\u30fc\u30ce', 'peperoncino'], data: { ingredients: '\u3086\u3067\u30b9\u30d1\u30d2\u30c6\u30a3\uff08\u56fd\u5185\u88fd\u9020\uff09\u3001\u30aa\u30ea\u30fc\u30d6\u30aa\u30a4\u30eb\u3001\u30cb\u30f3\u30cb\u30af\u3001\u5510\u8f9b\u5b50\u3001\u30a2\u30f3\u30child\u30d3\u3001\u30d1\u30bb\u30ea\u3001\u98df\u5869\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09' } },
        // Salad
        { keywords: ['\u30b7\u30fc\u30b6\u30fc\u30b5\u30e9\u30c0', 'caesar'], data: { ingredients: '\u30ed\u30e1\u30a4\u30f3\u30ec\u30bf\u30b9\u3001\u30af\u30eb\u30c8\u30f3\u3001\u30c1\u30fc\u30ba\u3001\u30b7\u30fc\u30b6\u30fc\u30c9\u30ec\u30c3\u30b7\u30f3\u30b0\u3001\u30d9\u30fc\u30b3\u30f3\u3001\u5375\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09' } }
    ];

    function updatePreview() {
        try {
            if (elements.preview.name && elements.inputs.name) {
                elements.preview.name.textContent = elements.inputs.name.value || "";
            }
            if (elements.preview.ingredients && elements.inputs.ingredients) {
                elements.preview.ingredients.textContent = elements.inputs.ingredients.value || "";
            }
            if (elements.inputs.useQRCode1 && elements.inputs.useQRCode1.checked) {
                var val = elements.inputs.qrcodeValue1.value || "test";
                if (typeof window.QRCode !== 'undefined') {
                    window.QRCode.toDataURL(val, function(err, url) {
                        if (!err && elements.preview.qrcode1) {
                            elements.preview.qrcode1.src = url;
                            elements.preview.qrcode1.style.display = 'block';
                        }
                    });
                }
            } else if (elements.preview.qrcode1) {
                elements.preview.qrcode1.style.display = 'none';
            }
        } catch (e) {
            console.error("Preview Update Error:", e);
        }
    }

    if (elements.buttons.autoFill) {
        elements.buttons.autoFill.addEventListener('click', function() {
            var name = (elements.inputs.name.value || "").trim();
            if (!name) return alert("\u540d\u79f0\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044");

            var hit = bentoDictionary.filter(function(d) {
                return d.keywords.some(function(k) {
                    return name.indexOf(k) !== -1 || k.indexOf(name) !== -1;
                });
            })[0];

            if (hit) {
                elements.inputs.ingredients.value = hit.data.ingredients;
                updatePreview();
            } else {
                alert("\u898b\u3064\u304b\u308a\u307e\u305b\u3093");
            }
        });
    }

    var allInps = document.querySelectorAll('input, textarea, select');
    for (var i = 0; i < allInps.length; i++) {
        allInps[i].addEventListener('input', updatePreview);
        allInps[i].addEventListener('change', updatePreview);
    }

    elements.buttons.printBtns.forEach(function(btn) {
        if (btn) btn.addEventListener('click', function() { window.print(); });
    });

    updatePreview();
});