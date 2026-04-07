const fs = require('fs');
let fileContent = fs.readFileSync('C:/Users/user/Desktop/練習用/bento-label-maker/script.js', 'utf8');

const newTemplatesStr = `    const defaultTemplates = {
        't200_1': { name: '豚汁', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '200', useJancode: false, jancodeValue: '', usePlaMark: true },
        't200_2': { name: 'おにぎり（鮭）', category: 'おにぎり', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、鮭フレーク、海苔（国産）／調味料（アミノ酸等）、着色料（紅麹）、（一部にさけ・大豆を含む）', price: '200', useJancode: false, jancodeValue: '', usePlaMark: true },
        't200_3': { name: 'おにぎり（こんぶ）', category: 'おにぎり', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、昆布佃煮、海苔（国産）／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・大豆を含む）', price: '200', useJancode: false, jancodeValue: '', usePlaMark: true },
        't200_4': { name: 'おにぎり（うめ）', category: 'おにぎり', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、梅干し、海苔（国産）／酸味料、調味料（アミノ酸等）、着色料（赤106）、（一部に大豆を含む）', price: '200', useJancode: false, jancodeValue: '', usePlaMark: true },

        't250_1': { name: '豚汁（小）', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '250', useJancode: false, jancodeValue: '', usePlaMark: true },
        't250_2': { name: '焼きそば（小）', category: '調理めん', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'ゆで中華めん（国内製造）、キャベツ、豚肉、もやし、人参、濃厚ソース、植物油脂、青のり／調味料（アミノ酸等）、カラメル色素、かんすい、酸味料、（一部に小麦・豚肉・大豆・りんごを含む）', price: '250', useJancode: false, jancodeValue: '', usePlaMark: true },
        't250_3': { name: '玉こんにゃく', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'こんにゃく、醤油、砂糖、みりん、風味調味料／調味料（アミノ酸等）、水酸化カルシウム、（一部に小麦・大豆を含む）', price: '250', useJancode: false, jancodeValue: '', usePlaMark: true },
        't250_4': { name: '岩下の新生姜タルタル', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'マヨネーズ、岩下の新生姜、ゆで卵、玉ねぎ、砂糖、食塩、香辛料／調味料（アミノ酸等）、酸味料、（一部に卵・大豆・りんごを含む）', price: '250', useJancode: false, jancodeValue: '', usePlaMark: true },

        't340_1': { name: '豚汁（中）', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_2': { name: 'ちくわの磯辺揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'ちくわ、小麦粉、植物油脂、青のり、食塩／加工デンプン、調味料（アミノ酸等）、（一部に小麦・卵・大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_3': { name: 'ちくわの磯辺揚げ＆紅生姜揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'ちくわ、紅生姜、小麦粉、植物油脂、青のり、食塩／加工デンプン、調味料（アミノ酸等）、酸味料、着色料（赤106）、（一部に小麦・卵・大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_4': { name: '野菜サラダ（小）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'キャベツ、レタス、人参、きゅうり、トマト、コーン／酸化防止剤（V.C）、（一部に大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_5': { name: 'マカロニサラダ', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'マカロニ、マヨネーズ、きゅうり、人参、玉ねぎ、ハム、食塩、香辛料／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に卵・大豆・豚肉・りんごを含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_6': { name: 'シシャモフライ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'シシャモ、パン粉、小麦粉、卵、植物油脂、食塩／加工デンプン、調味料（アミノ酸等）、（一部に小麦・卵・大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_7': { name: '海老かき揚げ1個', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '玉ねぎ、人参、えび、小麦粉、卵、植物油脂、食塩／膨張剤、着色料（ビタミンB2）、（一部に小麦・卵・えび・大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_8': { name: '冷やしうどん（小）', category: '調理めん', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'ゆでうどん（国内製造）、めんつゆ、ネギ、天かす／調味料（アミノ酸等）、酸味料、（一部に小麦・大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_9': { name: 'おにぎり1個セット', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、鮭フレーク、だし巻き卵、唐揚げ、海苔（国産）／調味料（アミノ酸等）、着色料（紅麹）、（一部に小麦・卵・鶏肉・さけ・大豆を含む）', price: '340', useJancode: false, jancodeValue: '', usePlaMark: true },

        't500_1': { name: '岩下の新生姜”本気”唐揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '鶏肉、岩下の新生姜、小麦粉、片栗粉、醤油、酒、植物油脂、食塩／調味料（アミノ酸等）、酸味料、（一部に小麦・鶏肉・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_2': { name: '野菜サラダ（中）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'キャベツ、レタス、人参、きゅうり、トマト、コーン／酸化防止剤（V.C）、（一部に大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_3': { name: '豚汁（大）', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_4': { name: '冷やしかき揚げうどん', category: '調理めん', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'ゆでうどん（国内製造）、野菜かき揚げ、めんつゆ、ネギ／調味料（アミノ酸等）、膨張剤、（一部に小麦・卵・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_5': { name: 'かつ丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、豚ロースカツ、卵、玉ねぎ、醤油、みりん、砂糖、風味調味料／調味料（アミノ酸等）、加工デンプン、着色料（カロチノイド）、（一部に小麦・卵・豚肉・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_6': { name: 'かき揚げ天丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、野菜かき揚げ、天丼のたれ／調味料（アミノ酸等）、カラメル色素、膨張剤、（一部に小麦・卵・えび・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_7': { name: '海老天丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、海老天ぷら、野菜天ぷら、天丼のたれ／調味料（アミノ酸等）、カラメル色素、膨張剤、（一部に小麦・卵・えび・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_8': { name: 'マーボー丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、豆腐、豚挽肉、ネギ、豆板醤、醤油、片栗粉／調味料（アミノ酸等）、豆腐用凝固剤、（一部に小麦・豚肉・大豆・ごまを含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_9': { name: 'おにぎり2個セット', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、鮭フレーク、梅干し、唐揚げ、だし巻き卵、海苔（国産）／調味料（アミノ酸等）、酸味料、（一部に小麦・卵・鶏肉・さけ・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_10': { name: 'パスタ（トマトクリーム）', category: '調理めん', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'スパゲティ（国内製造）、トマトソース、クリーム、ベーコン、プロセスチーズ／調味料（アミノ酸等）、乳化剤、発色剤（亜硝酸Na）、（一部に小麦・乳成分・豚肉・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_11': { name: 'おつまみパック6', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '唐揚げ、枝豆、ウインナー、ポテトフライ、玉子焼き、ちくわ磯辺揚げ／調味料（アミノ酸等）、リン酸塩（Na）、発色剤（亜硝酸Na）、（一部に小麦・卵・乳成分・鶏肉・豚肉・大豆を含む）', price: '500', useJancode: false, jancodeValue: '', usePlaMark: true },

        't660_1': { name: '岩下の新生姜”本気”唐揚げ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、岩下の新生姜本気唐揚げ、その他おかず／調味料（アミノ酸等）、酸味料、（一部に小麦・鶏肉・大豆を含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_2': { name: 'サバフライ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、サバフライ、その他おかず／調味料（アミノ酸等）、加工デンプン、（一部に小麦・卵・さば・大豆を含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_3': { name: 'チキンカツ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、チキンカツ、その他おかず／調味料（アミノ酸等）、加工デンプン、（一部に小麦・卵・鶏肉・大豆を含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_4': { name: 'とんかつ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、豚肉（ロース）、パン粉、とんかつソース、その他おかず／調味料（アミノ酸等）、カラメル色素、増粘多糖類、（一部に小麦・卵・豚肉・大豆・りんごを含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_5': { name: 'ローストポーク弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、ローストポーク、特製だれ、その他おかず／調味料（アミノ酸等）、カラメル色素、（一部に小麦・豚肉・大豆・りんごを含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_6': { name: 'よだれどり弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、蒸し鶏、辛味だれ（醤油、ラー油、ごま油など）、その他おかず／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆・ごまを含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_7': { name: 'とり胸低温調理弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、鶏胸肉、塩だれ、その他おかず／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆を含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_8': { name: '焼肉弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、牛肉、玉ねぎ、焼肉のたれ、その他おかず／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・牛肉・ごま・大豆・りんごを含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_9': { name: 'ガパオライス', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、鶏挽肉、パプリカ、玉ねぎ、バジル、ナンプラー、目玉焼き／調味料（アミノ酸等）、（一部に小麦・卵・鶏肉・大豆を含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_10': { name: 'サラダ（大）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'キャベツ、レタス、人参、きゅうり、トマト、コーン／酸化防止剤（V.C）、（一部に大豆を含む）', price: '660', useJancode: false, jancodeValue: '', usePlaMark: true },

        't750_1': { name: '岩下の新生姜”本気”唐揚げ（タルタル）弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、岩下の新生姜本気唐揚げ、岩下の新生姜タルタル、その他おかず／調味料（アミノ酸等）、酸味料、（一部に小麦・卵・鶏肉・大豆・りんごを含む）', price: '750', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_2': { name: '幕ノ内弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、焼き鮭、海老フライ、煮物、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・えび・さけ・鶏肉・豚肉・大豆を含む）', price: '750', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_3': { name: '焼きサバ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、塩鯖焼き、その他おかず／調味料（アミノ酸等）、酸化防止剤（V.C）、酸味料、（一部に小麦・さば・大豆を含む）', price: '750', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_4': { name: '筋トレ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '玄米（国産米）、鶏胸肉低温調理、ブロッコリー、ゆで卵／調味料（アミノ酸等）、（一部に卵・鶏肉を含む）', price: '750', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_5': { name: 'サラダ（おすすめ）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'レタス、ローストポーク、ゆで卵、トマト、ブロッコリー／酸化防止剤（V.C）、（一部に卵・豚肉・大豆を含む）', price: '750', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_6': { name: '若鶏の半身揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '鶏肉、香辛料、食塩、植物油脂／調味料（アミノ酸等）、（一部に鶏肉を含む）', price: '750', useJancode: false, jancodeValue: '', usePlaMark: true },

        't1000_1': { name: '日替わり弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '御飯（国産米）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆・ごま・りんごを含む）', price: '1000', useJancode: false, jancodeValue: '', usePlaMark: true },
        't1000_2': { name: '玄米日替わり弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '玄米（国産米）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆・ごま・りんごを含む）', price: '1000', useJancode: false, jancodeValue: '', usePlaMark: true },
        't1000_3': { name: '鍋セット', category: '惣菜半製品', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: '白菜、豚肉、ネギ、豆腐、きのこ類、鍋スープ／調味料（アミノ酸等）、豆腐用凝固剤、（一部に小麦・豚肉・大豆を含む）', price: '1000', useJancode: false, jancodeValue: '', usePlaMark: true },
        't1000_4': { name: '冷凍岩下の新生姜”本気”唐揚げ', category: '冷凍食品', consumeDays: '30', storeMethod: '-18℃以下で保存してください', ingredients: '鶏肉、岩下の新生姜、小麦粉、片栗粉、醤油、酒、植物油脂、食塩／調味料（アミノ酸等）、酸味料、（一部に小麦・鶏肉・大豆を含む）', price: '1000', useJancode: false, jancodeValue: '', usePlaMark: true }
    };`;

fileContent = fileContent.replace(/const defaultTemplates = \{[\s\S]*?\};\n\n    let userTemplates/, newTemplatesStr + "\n\n    let userTemplates");

const oldLoadTemplates = `    const loadTemplates = () => {
        const saved = localStorage.getItem('bentoAllTemplates');
        if (saved) {
            userTemplates = JSON.parse(saved);
        } else {
            userTemplates = { ...defaultTemplates };
            const oldCustom = localStorage.getItem('bentoCustomPresets');
            if (oldCustom) {
                const oldObj = JSON.parse(oldCustom);
                Object.keys(oldObj).forEach(k => {
                    userTemplates['custom_' + k] = oldObj[k];
                });
            }
        }
    };`;

const newLoadTemplates = `    const loadTemplates = () => {
        const saved = localStorage.getItem('bentoAllTemplates');
        let shouldSave = false;
        
        if (saved) {
            userTemplates = JSON.parse(saved);
        } else {
            userTemplates = {};
            shouldSave = true;
        }
        
        // 常に指定されたテンプレートがなければ追加する（アップデート用）
        Object.keys(defaultTemplates).forEach(k => {
            if (!userTemplates[k]) {
                userTemplates[k] = defaultTemplates[k];
                shouldSave = true;
            }
        });
        
        // もう不要なサバの塩焼き弁当、唐揚げ弁当、幕の内等の古いキーを削除
        if(userTemplates['tmpl_saba']) { delete userTemplates['tmpl_saba']; shouldSave = true; }
        if(userTemplates['tmpl_karaage']) { delete userTemplates['tmpl_karaage']; shouldSave = true; }
        if(userTemplates['tmpl_maku']) { delete userTemplates['tmpl_maku']; shouldSave = true; }
        
        const oldCustom = localStorage.getItem('bentoCustomPresets');
        if (oldCustom) {
            const oldObj = JSON.parse(oldCustom);
            Object.keys(oldObj).forEach(k => {
                if (!userTemplates['custom_' + k]) {
                    userTemplates['custom_' + k] = oldObj[k];
                    shouldSave = true;
                }
            });
            localStorage.removeItem('bentoCustomPresets');
        }
        
        if (shouldSave) saveTemplates();
    };`;
fileContent = fileContent.replace(oldLoadTemplates, newLoadTemplates);

const oldRender = `    const renderPresetOptions = () => {
        const select = elements.inputs.preset;
        const currentVal = select.value;
        
        select.innerHTML = '<option value="">-- 新規作成 (入力欄をクリアする) --</option>';
        Object.keys(userTemplates).forEach(id => {
            const data = userTemplates[id];
            const option = document.createElement('option');
            option.value = id;
            option.textContent = data.name || '(無名)';
            select.appendChild(option);
        });
        
        select.value = userTemplates[currentVal] ? currentVal : '';
        
        const isDefault = select.value === '';
        if(elements.buttons.deletePreset) {
            elements.buttons.deletePreset.style.opacity = isDefault ? '0.5' : '1';
            elements.buttons.deletePreset.style.pointerEvents = isDefault ? 'none' : 'auto';
        }
        if(elements.buttons.savePreset) {
            elements.buttons.savePreset.style.opacity = isDefault ? '0.5' : '1';
            elements.buttons.savePreset.style.pointerEvents = isDefault ? 'none' : 'auto';
        }
    };`;

const newRender = `    const renderPresetOptions = () => {
        const select = elements.inputs.preset;
        const currentVal = select.value;
        
        select.innerHTML = '<option value="">-- 新規作成 (入力欄をクリアする) --</option>';
        
        // 金額順 -> 名前順 でソート
        const sortedKeys = Object.keys(userTemplates).sort((a, b) => {
            const priceA = parseInt(userTemplates[a].price) || 0;
            const priceB = parseInt(userTemplates[b].price) || 0;
            if (priceA !== priceB) return priceA - priceB;
            const nameA = userTemplates[a].name || '';
            const nameB = userTemplates[b].name || '';
            return nameA.localeCompare(nameB, 'ja');
        });
        
        sortedKeys.forEach(id => {
            const data = userTemplates[id];
            const option = document.createElement('option');
            option.value = id;
            // オプション名に金額を表示
            const priceStr = data.price ? \`[¥\${data.price}] \` : '';
            option.textContent = \`\${priceStr}\${data.name || '(無名)'}\`;
            select.appendChild(option);
        });
        
        select.value = userTemplates[currentVal] ? currentVal : '';
        
        const isDefault = select.value === '';
        if(elements.buttons.deletePreset) {
            elements.buttons.deletePreset.style.opacity = isDefault ? '0.5' : '1';
            elements.buttons.deletePreset.style.pointerEvents = isDefault ? 'none' : 'auto';
        }
        if(elements.buttons.savePreset) {
            elements.buttons.savePreset.style.opacity = isDefault ? '0.5' : '1';
            elements.buttons.savePreset.style.pointerEvents = isDefault ? 'none' : 'auto';
        }
    };`;
fileContent = fileContent.replace(oldRender, newRender);

const oldStoreInfo = `    const loadStoreInfo = (profileId = null) => {
        if (!profileId) {
            profileId = localStorage.getItem('bentoLastProfile') || 'A';
            if (elements.inputs.storeProfile) elements.inputs.storeProfile.value = profileId;
        }

        // 過去の移行用（最初の設定をパターンAに引き継ぐ）
        let saved = localStorage.getItem(\`bentoStoreInfo_\${profileId}\`);
        if (!saved && profileId === 'A') {
            saved = localStorage.getItem('bentoStoreInfo'); // 旧バージョンのデータ
        }
        
        if (saved) {
            const info = JSON.parse(saved);
            elements.inputs.manufacturerTitle.value = info.title || '製造者';
            elements.inputs.manufacturer.value = info.name || '';
            elements.inputs.address.value = info.address || '';
            elements.inputs.phone.value = info.phone || '';
            elements.inputs.useSecondStore.checked = info.useSecond || false;
            elements.inputs.manufacturerTitle2.value = info.title2 || '製造者';
            elements.inputs.manufacturer2.value = info.name2 || '';
            elements.inputs.address2.value = info.address2 || '';
            elements.inputs.phone2.value = info.phone2 || '';
            
            // toggle UI
            document.getElementById('second-store-wrapper').style.display = elements.inputs.useSecondStore.checked ? 'block' : 'none';
        } else {
            // 見つからない場合はクリアする（初期値等にする）
            elements.inputs.manufacturerTitle.value = '製造者';
            elements.inputs.manufacturer.value = '';
            elements.inputs.address.value = '';
            elements.inputs.phone.value = '';
            elements.inputs.useSecondStore.checked = false;
            elements.inputs.manufacturerTitle2.value = '製造者';
            elements.inputs.manufacturer2.value = '';
            elements.inputs.address2.value = '';
            elements.inputs.phone2.value = '';
            document.getElementById('second-store-wrapper').style.display = 'none';
        }
        
        loadStoreProfileNameInput();
        updatePreview();
    };`;

const newStoreInfo = `    const loadStoreInfo = (profileId = null) => {
        if (!profileId) {
            profileId = localStorage.getItem('bentoLastProfile') || 'A';
            if (elements.inputs.storeProfile) elements.inputs.storeProfile.value = profileId;
        }

        let saved = localStorage.getItem(\`bentoStoreInfo_\${profileId}\`);
        if (!saved && profileId === 'A') {
            saved = localStorage.getItem('bentoStoreInfo'); // 旧バージョンのデータ
        }
        
        if (saved) {
            const info = JSON.parse(saved);
            elements.inputs.manufacturerTitle.value = info.title || '製造者';
            elements.inputs.manufacturer.value = info.name || '';
            elements.inputs.address.value = info.address || '';
            elements.inputs.phone.value = info.phone || '';
            elements.inputs.useSecondStore.checked = info.useSecond || false;
            elements.inputs.manufacturerTitle2.value = info.title2 || '製造者';
            elements.inputs.manufacturer2.value = info.name2 || '';
            elements.inputs.address2.value = info.address2 || '';
            elements.inputs.phone2.value = info.phone2 || '';
        } else {
            if (profileId === 'A') {
                elements.inputs.manufacturerTitle.value = '製造者';
                elements.inputs.manufacturer.value = 'ナンカ食堂';
                elements.inputs.address.value = '下野市薬師寺1166';
                elements.inputs.phone.value = '0285-40-5339';
                elements.inputs.useSecondStore.checked = true;
                elements.inputs.manufacturerTitle2.value = '販売者';
                elements.inputs.manufacturer2.value = '株式会社ナンカゴハン';
                elements.inputs.address2.value = '東京都渋谷区神宮前6-23-4桑野ビル2F';
                elements.inputs.phone2.value = '';
                
                // 初回アクセス時に設定を保存しておく
                const info = {
                    title: '製造者', name: 'ナンカ食堂', address: '下野市薬師寺1166', phone: '0285-40-5339',
                    useSecond: true, title2: '販売者', name2: '株式会社ナンカゴハン', address2: '東京都渋谷区神宮前6-23-4桑野ビル2F', phone2: ''
                };
                localStorage.setItem('bentoStoreInfo_A', JSON.stringify(info));
                
            } else {
                elements.inputs.manufacturerTitle.value = '製造者';
                elements.inputs.manufacturer.value = '';
                elements.inputs.address.value = '';
                elements.inputs.phone.value = '';
                elements.inputs.useSecondStore.checked = false;
                elements.inputs.manufacturerTitle2.value = '製造者';
                elements.inputs.manufacturer2.value = '';
                elements.inputs.address2.value = '';
                elements.inputs.phone2.value = '';
            }
        }
        
        document.getElementById('second-store-wrapper').style.display = elements.inputs.useSecondStore.checked ? 'block' : 'none';
        loadStoreProfileNameInput();
        updatePreview();
    };`;
fileContent = fileContent.replace(oldStoreInfo, newStoreInfo);

fs.writeFileSync('C:/Users/user/Desktop/練習用/bento-label-maker/script.js', fileContent);
console.log('Script updated successfully!');
