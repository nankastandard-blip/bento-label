document.addEventListener('DOMContentLoaded', function() {
    console.log("Bento Label Maker - Script V3.1 Initializing...");

    var el = {
        inputs: {
            preset: document.getElementById('preset-select'),
            quickPreset: document.getElementById('quick-preset-select'),
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
            useQRCode1: document.getElementById('use-qrcode1'),
            qrcodeValue1: document.getElementById('qrcode1-value'),
            useQRCode2: document.getElementById('use-qrcode2'),
            qrcodeValue2: document.getElementById('qrcode2-value'),
            useJancode: document.getElementById('use-jancode'),
            jancodeValue: document.getElementById('jancode-value'),
            toggleRecommendation: document.getElementById('toggle-recommendation')
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
            priceTax: document.getElementById('preview-price-tax'),
            qrcode1: document.getElementById('preview-qrcode1'),
            qrcode2: document.getElementById('preview-qrcode2'),
            barcode: document.getElementById('preview-barcode'),
            recommendation: document.getElementById('preview-recommendation')
        },
        buttons: {
            autoFill: document.getElementById('auto-fill-btn'),
            printBtns: [document.getElementById('print-btn-header'), document.getElementById('print-btn-footer')]
        },
        wrappers: {
            qrcode1: document.getElementById('qrcode1-wrapper'),
            qrcode2: document.getElementById('qrcode2-wrapper'),
            jancode: document.getElementById('jancode-wrapper')
        }
    };

    var dict = [
        // Thai
        { keywords: ['\u30d1\u30c3\u30bf\u30a4'], data: { ingredients: '\u30d3\u30fc\u30d5\u30f3\uff08\u56fd\u5185\u88fd\u9020\uff09\u3001\u3048\u3073\u3001\u3082\u3084\u3057\u3001\u30cb\u30e9\u3001\u5375\u3001\u30ca\u30f3\u30d7\u30e9\u30fc\u3001\u7802\u7cd6\u3001\u30d4\u30fc\u30ca\u30c3\u30c4\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u3048\u3073\u30fb\u843d\u82b1\u751f\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '580', protein: '15.0', fat: '18.0', carb: '85.0', salt: '4.5' } },
        { keywords: ['\u30ac\u30d1\u30aa'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9d20\u8089\u3001\u30ca\u30f3\u30d7\u30e9\u30fc\u3001\u30d0\u30b8\u30eb\u3001\u5375\u3001\u30d1\u30d7\u30ea\u30ab\u3001\u7389\u306d\u304e\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u9d20\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '650', protein: '24.0', fat: '20.0', carb: '88.0', salt: '4.2' } },
        { keywords: ['\u30b0\u30ea\u30fc\u30f3\u30ab\u30ec\u30fc'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9d20\u8089\u3001\u30b3\u30b3\u30ca\u30c3\u30c4\u30df\u30eb\u30af\u3001\u306a\u3059\u3001\u30bf\u30b1\u30ce\u30b3\u3001\u30ab\u30ec\u30fc\u30da\u30fc\u30b9\u30c8\uff0f\uff08\u4e00\u90e8\u306b\u4e73\u6210\u5206\u30fb\u9d20\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '720', protein: '20.0', fat: '35.0', carb: '85.0', salt: '3.8' } },
        // Japanese
        { keywords: ['\u5e55\u306e\u5185', '\u5e55\u5185'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9bad\u5869\u713c\u304d\u3001\u5375\u713c\u304d\u3001\u713c\u7269\u3001\u60e3\u83dc\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u3048\u3073\u30fb\u3055\u3051\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '680', protein: '22.0', fat: '18.0', carb: '95.0', salt: '3.2' } },
        { keywords: ['\u30c1\u30ad\u30f3\u5357\u86ee'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9d20\u8089\u3001\u30bf\u30eb\u30bf\u30eb\u30bd\u30fc\u30b9\u3001\u5357\u86ee\u9162\u3001\u30ad\u30e3\u30d9\u30c4\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u9d20\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '850', protein: '25.0', fat: '40.0', carb: '98.0', salt: '3.5' } },
        { keywords: ['\u5510\u63da\u3052', '\u304b\u3089\u3042\u3052'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u9d20\u5510\u63da\u3052\u3001\u526f\u83dc\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u9d20\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '820', protein: '28.0', fat: '32.0', carb: '96.0', salt: '3.5' } },
        // Italian/Western
        { keywords: ['\u30ca\u30dd\u30ea\u30bf\u30f3'], data: { ingredients: '\u3086\u3067\u30b9\u30d1\u30d2\u30c6\u30a3\uff08\u56fd\u5185\u88fd\u9020\uff09\u3001\u30a6\u30a4\u30f3\u30ca\u30fc\u3001\u7389\u306d\u304e\u3001\u30d4\u30fc\u30de\u30f3\u3001\u30b1\u30c1\u30e3\u30c3\u30d7\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u4e73\u6210\u5206\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '620', protein: '15.0', fat: '22.0', carb: '88.0', salt: '3.8' } },
        { keywords: ['\u30cf\u30f3\u30d0\u30fc\u30b0'], data: { ingredients: '\u5fa1\u98ef\uff08\u7c73\uff08\u56fd\u7523\uff09\uff09\u3001\u30cf\u30f3\u30d0\u30fc\u30b0\u3001\u30c7\u30df\u30b0\u30e9\u30b9\u30bd\u30fc\u30b9\u3001\u30dd\u30c6\u30c8\u3001\u526f\u83dc\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u725b\u8089\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u039f\u542b\u3080\uff09', calories: '780', protein: '22.0', fat: '28.0', carb: '95.0', salt: '3.4' } },
        // Salad
        { keywords: ['\u30b7\u30fc\u30b6\u30fc\u30b5\u30e9\u30c0'], data: { ingredients: '\u30ed\u30e1\u30a4\u30f3\u30ec\u30bf\u30b9\u3001\u30af\u30eb\u30c8\u30f3\u3001\u30c1\u30fc\u30ba\u3001\u30b7\u30fc\u30b6\u30fc\u30c9\u30ec\u30c3\u30b7\u30f3\u30b0\u3001\u30d9\u30fc\u30b3\u30f3\uff0f\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '240', protein: '8.0', fat: '15.0', carb: '10.0', salt: '1.2' } },
        { keywords: ['\u30dd\u30c6\u30c8\u30b5\u30e9\u30c0'], data: { ingredients: '\u3058\u3083\u304c\u3044\u3082\ufeff\uff08\u56fd\u7523\uff09\u3001\u30de\u30e8\u30cd\u30fc\u30ba\u3001\u4eba\u53c2\u3001\u7389\u306d\u304e\u3001\u30cf\u30e0\uff0f\uff08\u4e00\u90e8\u306b\u5375\u30fb\u4e73\u6210\u5206\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09', calories: '180', protein: '3.0', fat: '12.0', carb: '15.0', salt: '0.8' } }
    ];

    function updatePreview() {
        try {
            if (el.preview.name) el.preview.name.textContent = el.inputs.name.value || "";
            if (el.preview.ingredients) el.preview.ingredients.textContent = el.inputs.ingredients.value || "";
            if (el.preview.store) el.preview.store.textContent = el.inputs.storeMethod.value || "";
            var days = parseInt(el.inputs.consumeDays.value || 0);
            var d = new Date(); d.setDate(d.getDate() + days);
            if (el.preview.consume) el.preview.consume.textContent = d.toLocaleDateString();
            ['calories','protein','fat','carb','salt'].forEach(function(k) {
                if (el.preview[k]) el.preview[k].textContent = el.inputs[k].value || "-";
            });
            // QR Code bypass TDZ
            [1, 2].forEach(function(n) {
                var useChecked = el.inputs['useQRCode' + n].checked;
                var val = el.inputs['qrcodeValue' + n].value;
                var img = el.preview['qrcode' + n];
                if (useChecked && val && img) {
                    if (typeof window['QRCode'] !== 'undefined') {
                        window['QRCode'].toDataURL(val, function(err, url) { if (!err) { img.src = url; img.style.display = 'block'; } });
                    }
                } else if (img) img.style.display = 'none';
            });
        } catch(e) {}
    }

    el.buttons.autoFill?.addEventListener('click', function() {
        var name = (el.inputs.name.value || "").trim();
        var hit = dict.filter(function(d) {
            return d.keywords.some(function(k) { return name.indexOf(k) !== -1 || k.indexOf(name) !== -1; });
        })[0];
        if (hit) {
            Object.keys(hit.data).forEach(function(k) { if (el.inputs[k]) el.inputs[k].value = hit.data[k]; });
            updatePreview();
        } else { alert("\u898b\u3064\u304b\u308a\u307e\u305b\u3093"); }
    });

    document.querySelectorAll('input, select, textarea').forEach(function(inp) {
        inp.addEventListener('input', updatePreview);
        inp.addEventListener('change', updatePreview);
    });

    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var target = this.getAttribute('data-target');
            document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
            document.querySelectorAll('.tab-content').forEach(function(c) { c.style.display = 'none'; });
            this.classList.add('active'); document.getElementById(target).style.display = 'block';
        });
    });

    el.buttons.printBtns.forEach(function(btn) { if (btn) btn.addEventListener('click', function() { window.print(); }); });

    updatePreview();
});
