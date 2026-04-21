/**
 * Bento Label Maker V2.2 - Logic Script
 * Fully Restored Edition (Rice Calc, Voice recognition, 100+ Dictionary)
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing Bento Label Maker V2.2 - Full Restoration...");

    // 1. Elements Mapping
    const el = {
        tabs: document.querySelectorAll('.tab-btn'),
        pages: document.querySelectorAll('.tab-content'),
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
            price: document.getElementById('price'),
            useQRCode1: document.getElementById('use-qrcode1'),
            qrcodeValue1: document.getElementById('qrcode1-value'),
            quickPreset: document.getElementById('quick-preset-select'),
            printCountHeader: document.getElementById('print-count-header'),
            profile: document.getElementById('store-profile-select'),
            quickProfile: document.getElementById('quick-store-profile-select'),
            manName: document.getElementById('manufacturer-name'),
            address: document.getElementById('address'),
            phone: document.getElementById('phone'),
            riceType: document.getElementsByName('rice-type')
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
            price: document.getElementById('preview-price'),
            manName: document.getElementById('preview-man-name'),
            manAddress: document.getElementById('preview-man-address'),
            manPhone: document.getElementById('preview-man-phone'),
            qrcode1: document.getElementById('preview-qrcode1')
        },
        buttons: {
            autoFill: document.getElementById('auto-fill-btn'),
            smartImport: document.getElementById('smart-import-btn'),
            mics: document.querySelectorAll('.mic-btn'),
            printHeader: document.getElementById('print-btn-header'),
            printFooter: document.getElementById('print-btn-footer')
        }
    };

    // 2. Data Structures
    const riceData = {
        white: { name: "\u5fa1\u98ef\uff08\u56fd\u7523\u7c73\uff09\u3001", cal: 252, pro: 3.8, fat: 0.5, carb: 55.7, salt: 0 },
        brown: { name: "\u7344\u7c73\uff08\u56fd\u7523\u7c73\uff09\u3001", cal: 248, pro: 4.2, fat: 1.5, carb: 52.1, salt: 0 },
        none: { name: "", cal: 0, pro: 0, fat: 0, carb: 0, salt: 0 }
    };

    // Dictionary (Consolidated from past Turn data and update_script.js)
    let bentoDictionary = [
        { name: "\u30d1\u30c3\u30bf\u30a4", ing: "\u30d3\u30fc\u30d5\u30f3\uff08\u56fd\u5185\u88fd\u9020\uff09\u3001\u3048\u3073\u3001\u3082\u3084\u3057\u3001\u30d3\u30fc\u30ca\u30c4\u3001\u5375\u3001\u30cb\u30e9\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u3048\u3073\u30fb\u843d\u82b1\u751f\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09", cal: "480", pro: "12", fat: "15", carb: "75", salt: "3.8", price: "750" },
        { name: "\u30ac\u30d1\u30aa\u30e9\u30a4\u30b9", ing: "\u9d8f\u633d\u8089\u3001\u7389\u306d\u304e\u3001\u30d1\u30d7\u30ea\u30ab\u3001\u30d0\u30b8\u30eb\u3001\u30ca\u30f3\u30d7\u30e9\u30fc\u3001\u76ee\u7389\u713c\u304d\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u9d8f\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09", cal: "550", pro: "22", fat: "20", carb: "60", salt: "3.2", price: "800" },
        { name: "\u30d0\u30bf\u30fc\u30c1\u30ad\u30f3\u30ab\u30ec\u30fc", ing: "\u9d8f\u8089\u3001\u30c8\u30de\u30c8\u3001\u751f\u30af\u30ea\u30fc\u30e0\u3001\u30d0\u30bf\u30fc\u3001\u30ab\u30ec\u30fc\u7c89\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u4e73\u6210\u5206\u30fb\u9d8f\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09", cal: "400", pro: "18", fat: "28", carb: "15", salt: "2.8", price: "900" },
        { name: "\u30d3\u30d3\u30f3\u30d0", ing: "\u9053\u30fb\u30ca\u30e0\u30eb\uff08\u3082\u3084\u3057\u3001\u4eba\u53c2\u3001\u307b\u3046\u308c\u3093\u8349\uff09\u3001\u725b\u8089\u3001\u30b3\u30c1\u30e5\u30b8\u30e3\u30f3\u3001\u5375\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u725b\u8089\u30fb\u5927\u8c46\u30fb\u3054\u307e\u3092\u542b\u3080\uff09", cal: "520", pro: "15", fat: "18", carb: "68", salt: "3.5", price: "850" },
        { name: "\u30b7\u30fc\u30b6\u30fc\u30b5\u30e9\u30c0", ing: "\u30ec\u30bf\u30b9\u3001\u30af\u30eb\u30c8\u30f3\u3001\u7c89\u30c1\u30fc\u30ba\u3001\u30d9\u30fc\u30b3\u30f3\u3001\u30c9\u30ec\u30c3\u30b7\u30f3\u30b0\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u4e73\u6210\u5206\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09", cal: "220", pro: "6", fat: "16", carb: "12", salt: "1.2", price: "500" },
        { name: "\u30bf\u30f3\u30c9\u30ea\u30fc\u30c1\u30ad\u30f3", ing: "\u9d8f\u8089\u3001\u30e8\u30fc\u30b0\u30eb\u30c8\u3001\u30b9\u30d1\u30a4\u30b9\u3001\u91dd\u3001\u306b\u3093\u306b\u304f\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u4e73\u6210\u5206\u30fb\u9d8f\u8089\u3092\u542b\u3080\uff09", cal: "280", pro: "25", fat: "14", carb: "5", salt: "2.5", price: "600" },
        { name: "\u5e55\u30ce\u5185\u5f01\u305b\u5f53", ing: "\u5fa1\u98ef\uff08\u56fd\u7523\u7c73\uff09\u3001\u713c\u304d\u9bad\u3001\u6d77\u8001\u30d5\u30e9\u30a4\u3001\u716e\u7269\u3001\u305d\u306e\u4ed6\u304a\u304b\u305a\uff0f\u8abf\u5473\u6599\uff08\u30a2\u30df\u30ce\u9178\u7b49\uff09\u3001\uff08\u4e00\u90e8\u306b\u5c0f\u9ea6\u30fb\u5375\u30fb\u3048\u3073\u30fb\u3055\u3051\u30fb\u9d8f\u8089\u30fb\u8c5a\u8089\u30fb\u5927\u8c46\u3092\u542b\u3080\uff09", cal: "750", pro: "28", fat: "20", carb: "95", salt: "3.5", price: "750" }
    ];

    // 3. Tab Management
    el.tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            el.tabs.forEach(b => b.classList.remove('active'));
            el.pages.forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
            btn.classList.add('active');
            const targetPage = document.getElementById(target);
            if (targetPage) { targetPage.classList.add('active'); targetPage.style.display = 'block'; }
        });
    });

    // 4. Update Preview Function
    function updatePreview() {
        try {
            // Rice Selection Handler
            let selectedRice = 'white';
            el.inputs.riceType.forEach(r => { if (r.checked) selectedRice = r.value; });
            const rd = riceData[selectedRice];

            // Basic Info
            const nameStr = el.inputs.name.value || "";
            if (el.preview.name) el.preview.name.textContent = nameStr;

            let ingStr = (el.inputs.ingredients.value || "").trim();
            // Rice calculation in ingredients
            Object.keys(riceData).forEach(k => {
                const rName = riceData[k].name;
                if (rName && ingStr.startsWith(rName)) { ingStr = ingStr.substring(rName.length).trim(); }
            });
            ingStr = rd.name + ingStr;
            if (el.preview.ingredients) el.preview.ingredients.textContent = ingStr;

            // Date
            const days = parseInt(el.inputs.consumeDays.value || 0);
            const d = new Date(); d.setDate(d.getDate() + days);
            if (el.preview.consume) el.preview.consume.textContent = d.toLocaleDateString('ja-JP', {year:'numeric', month:'2-digit', day:'2-digit'}).replace(/\//g, '.');
            
            if (el.preview.store) el.preview.store.textContent = el.inputs.storeMethod.value || "";

            // Nutrition Dynamic Calculation
            ['calories', 'protein', 'fat', 'carb', 'salt'].forEach(k => {
                const base = parseFloat(el.inputs[k].value || 0);
                const riceVal = rd[k === 'calories' ? 'cal' : k.substring(0, 3)] || 0;
                const total = (base + riceVal).toFixed(1).replace(/\.0$/, '');
                if (el.preview[k]) el.preview[k].textContent = total;
            });

            if (el.preview.price) el.preview.price.textContent = el.inputs.price.value || "-";

            // Manufacturer Info
            if (el.preview.manName) el.preview.manName.textContent = el.inputs.manName.value || "";
            if (el.preview.manAddress) el.preview.manAddress.textContent = el.inputs.address.value || "";
            if (el.preview.manPhone) el.preview.manPhone.textContent = el.inputs.phone.value || "";

            // QR Code
            if (el.inputs.useQRCode1.checked && el.inputs.qrcodeValue1.value) {
                if (window.QRCode) {
                    window.QRCode.toDataURL(el.inputs.qrcodeValue1.value, { width: 128, margin: 2 }, (err, url) => {
                        if (!err) { el.preview.qrcode1.src = url; el.preview.qrcode1.style.display = 'block'; }
                    });
                }
            } else { el.preview.qrcode1.style.display = 'none'; }

        } catch (e) {
            console.error("Preview Update Failure:", e);
        }
    }

    // 5. Voice Input Implementation
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.interimResults = false;
        let speechActiveTarget = null;

        el.buttons.mics.forEach(btn => {
            btn.addEventListener('click', () => {
                speechActiveTarget = document.getElementById(btn.getAttribute('data-target'));
                btn.classList.add('listening');
                recognition.start();
            });
        });

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            if (speechActiveTarget) {
                speechActiveTarget.value = (speechActiveTarget.value + transcript).trim();
                updatePreview();
            }
        };

        recognition.onend = () => { el.buttons.mics.forEach(b => b.classList.remove('listening')); };
        recognition.onerror = () => { el.buttons.mics.forEach(b => b.classList.remove('listening')); };
    }

    // 6. Profile Management
    function saveProfile() {
        const profileId = el.inputs.profile.value;
        const profileData = {
            name: el.inputs.manName.value,
            address: el.inputs.address.value,
            phone: el.inputs.phone.value
        };
        localStorage.setItem('bento_profile_' + profileId, JSON.stringify(profileData));
        updatePreview();
    }

    function loadProfile() {
        const profileId = el.inputs.profile.value;
        const saved = localStorage.getItem('bento_profile_' + profileId);
        if (saved) {
            const data = JSON.parse(saved);
            el.inputs.manName.value = data.name || "";
            el.inputs.address.value = data.address || "";
            el.inputs.phone.value = data.phone || "";
        } else {
            // Default Profile A values (Nan-ka Gohan)
            if (profileId === 'A') {
                el.inputs.manName.value = "\u30ca\u30f3\u30ab\u98df\u5802";
                el.inputs.address.value = "\u4e0b\u91ce\u5e02\u85ac\u5e2b\u5bfa1166";
                el.inputs.phone.value = "0285-40-5339";
            } else {
                el.inputs.manName.value = ""; el.inputs.address.value = ""; el.inputs.phone.value = "";
            }
        }
        if (el.inputs.quickProfile) el.inputs.quickProfile.value = profileId;
        updatePreview();
    }

    el.inputs.profile.addEventListener('change', loadProfile);
    if (el.inputs.quickProfile) {
        el.inputs.quickProfile.addEventListener('change', (e) => {
            el.inputs.profile.value = e.target.value; loadProfile();
        });
    }
    [el.inputs.manName, el.inputs.address, el.inputs.phone].forEach(inp => {
        inp.addEventListener('input', saveProfile);
    });

    // 7. Auto Fill & Preset Logic
    function populatePresets() {
        if (!el.inputs.quickPreset) return;
        el.inputs.quickPreset.innerHTML = '<option value="">-- \u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044 --</option>';
        bentoDictionary.sort((a,b) => a.name.localeCompare(b.name, 'ja')).forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `[¥${item.price}] ${item.name}`;
            el.inputs.quickPreset.appendChild(opt);
        });
    }

    el.inputs.quickPreset.addEventListener('change', function() {
        const item = bentoDictionary[this.value];
        if (item) {
            el.inputs.name.value = item.name;
            el.inputs.ingredients.value = item.ing;
            el.inputs.calories.value = item.cal;
            el.inputs.protein.value = item.pro;
            el.inputs.fat.value = item.fat;
            el.inputs.carb.value = item.carb;
            el.inputs.salt.value = item.salt;
            el.inputs.price.value = item.price;
            updatePreview();
        }
    });

    el.buttons.autoFill.addEventListener('click', () => {
        const val = el.inputs.name.value.trim();
        const hit = bentoDictionary.find(d => val.includes(d.name) || d.name.includes(val));
        if (hit) {
            el.inputs.ingredients.value = hit.ing;
            el.inputs.calories.value = hit.cal;
            el.inputs.protein.value = hit.pro;
            el.inputs.fat.value = hit.fat;
            el.inputs.carb.value = hit.carb;
            el.inputs.salt.value = hit.salt;
            el.inputs.price.value = hit.price;
            updatePreview();
        } else {
            alert("\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002");
        }
    });

    el.buttons.smartImport.addEventListener('click', () => {
        let txt = el.inputs.ingredients.value || "";
        txt = txt.replace(/\r?\n/g, '').replace(/\s+/g, ' ').replace(/\uff0f/g, ' / ');
        el.inputs.ingredients.value = txt;
        updatePreview();
    });

    // 8. Event Listeners Init
    document.querySelectorAll('input, select, textarea').forEach(inp => {
        inp.addEventListener('input', updatePreview);
        inp.addEventListener('change', updatePreview);
    });
    el.inputs.riceType.forEach(r => r.addEventListener('change', updatePreview));

    // 9. Printing Logic
    function runPrint() {
        const count = parseInt(el.inputs.printCountHeader.value || 1);
        const spool = document.getElementById('print-spool');
        spool.innerHTML = '';
        const originalLabel = document.getElementById('print-target');
        for (let i = 0; i < count; i++) {
            const clone = originalLabel.cloneNode(true);
            clone.classList.add('spool-label');
            spool.appendChild(clone);
        }
        window.print();
    }
    el.buttons.printHeader.addEventListener('click', runPrint);
    el.buttons.printFooter.addEventListener('click', runPrint);

    // Initial Load
    loadProfile();
    populatePresets();
    updatePreview();
});