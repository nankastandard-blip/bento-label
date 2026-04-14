document.addEventListener('DOMContentLoaded', () => {
    // 削除予定だったdefaultPresets（以下のロジックでuserTemplatesに移行済み）

    // ===== 💡 自動入力用：お弁当データベース =====
    const bentoDictionary = [
        {
            keywords: ['日替わり', '日替'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆・ごま・りんごを含む）',
                calories: '700', protein: '20.0', fat: '25.0', carb: '95.0', salt: '3.0', price: '600'
            }
        },
        {
            keywords: ['チキン南蛮', '南蛮'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、鶏肉、タルタルソース、南蛮酢、その他おかず／調味料（アミノ酸等）、酸味料、増粘剤（加工デンプン）、香辛料抽出物、（一部に小麦・卵・乳成分・鶏肉・大豆を含む）',
                calories: '850', protein: '25.0', fat: '35.0', carb: '105.0', salt: '3.5', price: '600'
            }
        },
        {
            keywords: ['とんかつ', 'トンカツ', '豚カツ', 'カツ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、豚肉（ロース）、パン粉、とんかつソース、その他おかず／調味料（アミノ酸等）、カラメル色素、増粘多糖類、（一部に小麦・卵・乳成分・豚肉・大豆・りんごを含む）',
                calories: '920', protein: '28.0', fat: '40.0', carb: '110.0', salt: '3.8', price: '650'
            }
        },
        {
            keywords: ['ハンバーグ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、ハンバーグ（牛肉、豚肉、玉ねぎ、パン粉）、デミグラスソース、その他おかず／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・卵・乳成分・牛肉・豚肉・大豆を含む）',
                calories: '780', protein: '22.0', fat: '30.0', carb: '100.0', salt: '3.2', price: '650'
            }
        },
        {
            keywords: ['焼肉', '焼き肉', '牛カルビ', 'カルビ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、牛肉、玉ねぎ、焼肉のたれ、その他おかず／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・牛肉・ごま・大豆・りんごを含む）',
                calories: '810', protein: '20.0', fat: '28.0', carb: '115.0', salt: '3.5', price: '700'
            }
        },
        {
            keywords: ['生姜焼き', 'しょうが焼き', '豚肉'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、豚肉、玉ねぎ、生姜だれ、その他おかず／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・卵・豚肉・大豆・りんごを含む）',
                calories: '750', protein: '23.0', fat: '25.0', carb: '105.0', salt: '3.2', price: '600'
            }
        },
        {
            keywords: ['のり', '海苔', '白身魚', 'ちくわ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、焼き海苔、白身魚フライ、ちくわ磯辺揚げ、その他おかず／調味料（アミノ酸等）、着色料（カロチノイド）、（一部に小麦・卵・大豆・魚介類を含む）',
                calories: '650', protein: '18.0', fat: '15.0', carb: '108.0', salt: '3.0', price: '450'
            }
        },
        {
            keywords: ['しゃけ', '鮭', 'サケ', '塩鮭'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、焼き鮭、その他おかず／調味料（アミノ酸等）、着色料（カロチノイド）、（一部に小麦・卵・大豆・ごま・さけを含む）',
                calories: '620', protein: '22.0', fat: '15.0', carb: '90.0', salt: '2.8', price: '550'
            }
        },
        {
            keywords: ['サバ', '鯖', 'さば'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、塩鯖焼き、その他おかず／調味料（アミノ酸等）、酸化防止剤（V.C）、酸味料、着色料（赤106）、（一部に小麦・卵・さば・大豆・ごまを含む）',
                calories: '654', protein: '22.1', fat: '18.4', carb: '92.3', salt: '2.8', price: '580'
            }
        },
        {
            keywords: ['幕の内', '幕ノ内'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、焼き鮭、海老フライ、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・えび・さけ・鶏肉・豚肉・大豆を含む）',
                calories: '590', protein: '19.8', fat: '14.2', carb: '88.1', salt: '3.1', price: '680'
            }
        },
        {
            keywords: ['唐揚げ', 'からあげ', 'から揚げ', '竜田揚げ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、鶏肉の唐揚げ、その他おかず／調味料（アミノ酸等）、膨張剤、酸味料、着色料（赤106）、（一部に小麦・卵・乳成分・鶏肉・りんご・大豆を含む）',
                calories: '820', protein: '28.5', fat: '32.1', carb: '95.6', salt: '3.5', price: '550'
            }
        },
        {
            keywords: ['おにぎり', 'オニギリ', 'おむすび'],
            data: {
                ingredients: '塩飯（米（国産）、塩）、鮭フレーク、海苔（国産）／調味料（アミノ酸等）、着色料（紅麹）、（一部にさけ・大豆を含む）',
                calories: '350', protein: '8.5', fat: '2.0', carb: '72.0', salt: '1.8', price: '200',
                category: 'おにぎり'
            }
        },
        // ===== ここから追加分のお弁当・丼・麺類 =====
        {
            keywords: ['チャーハン', '炒飯'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、焼豚、卵、ネギ、植物油脂、中華調味料、醤油、食塩、胡椒／調味料（アミノ酸等）、着色料（カラメル）、（一部に小麦・卵・乳成分・豚肉・大豆・ごまを含む）',
                calories: '680', protein: '15.0', fat: '22.0', carb: '95.0', salt: '4.2', price: '500',
                category: '弁当'
            }
        },
        {
            keywords: ['カレー'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、カレールウ、豚肉、玉ねぎ、人参、じゃがいも、福神漬け、植物油脂／調味料（アミノ酸等）、カラメル色素、酸味料、香料、（一部に小麦・乳成分・豚肉・大豆・りんごを含む）',
                calories: '820', protein: '18.0', fat: '25.0', carb: '120.0', salt: '3.8', price: '550',
                category: '弁当'
            }
        },
        {
            keywords: ['やきそば', '焼きそば', 'ヤキソバ'],
            data: {
                ingredients: 'ゆで中華めん（国内製造）、キャベツ、豚肉、もやし、人参、濃厚ソース、植物油脂、青のり／調味料（アミノ酸等）、カラメル色素、かんすい、酸味料、（一部に小麦・豚肉・大豆・りんごを含む）',
                calories: '550', protein: '12.0', fat: '18.0', carb: '75.0', salt: '4.5', price: '400',
                category: '調理めん'
            }
        },
        {
            keywords: ['オムライス'],
            data: {
                ingredients: 'ケチャップライス（米（国産）、トマトケチャップ、玉ねぎ、鶏肉、植物油脂）、卵焼き、トマトソース／調味料（アミノ酸等）、加工デンプン、酸味料、（一部に小麦・卵・鶏肉・大豆を含む）',
                calories: '650', protein: '18.0', fat: '20.0', carb: '90.0', salt: '3.5', price: '580',
                category: '弁当'
            }
        },
        {
            keywords: ['かつ丼', 'カツ丼'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、豚ロースカツ、卵、玉ねぎ、醤油、みりん、砂糖、風味調味料／調味料（アミノ酸等）、加工デンプン、着色料（カロチノイド）、（一部に小麦・卵・豚肉・大豆を含む）',
                calories: '950', protein: '30.0', fat: '35.0', carb: '120.0', salt: '4.5', price: '650',
                category: '弁当'
            }
        },
        {
            keywords: ['牛丼'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、牛肉、玉ねぎ、醤油、砂糖、みりん、白ワイン、生姜／調味料（アミノ酸等）、（一部に小麦・牛肉・大豆・りんごを含む）',
                calories: '800', protein: '22.0', fat: '30.0', carb: '105.0', salt: '3.5', price: '550',
                category: '弁当'
            }
        },
        {
            keywords: ['麻婆豆腐', 'マーボー'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、豆腐、豚挽肉、ネギ、豆板醤、甜面醤、醤油、植物油脂、片栗粉／調味料（アミノ酸等）、増粘剤（加工デンプン）、カラメル色素、豆腐用凝固剤、（一部に小麦・豚肉・大豆・ごまを含む）',
                calories: '750', protein: '20.0', fat: '28.0', carb: '95.0', salt: '4.0', price: '550',
                category: '弁当'
            }
        },
        // ===== ここから惣菜・おかず =====
        {
            keywords: ['コロッケ', 'じゃがいも', 'ポテトコロッケ'],
            data: {
                ingredients: 'じゃがいも（国産）、玉ねぎ、パン粉、小麦粉、砂糖、植物油脂、食塩、香辛料／加工デンプン、調味料（アミノ酸）、（一部に小麦・大豆を含む）',
                calories: '280', protein: '4.5', fat: '15.0', carb: '32.0', salt: '0.8', price: '150',
                category: '惣菜'
            }
        },
        {
            keywords: ['メンチ', 'メンチカツ'],
            data: {
                ingredients: '食肉（豚肉（国産）、牛肉（国産））、玉ねぎ、パン粉、小麦粉、卵、砂糖、食塩、香辛料、植物油脂／加工デンプン、調味料（アミノ酸）、（一部に小麦・卵・乳成分・牛肉・豚肉・大豆を含む）',
                calories: '310', protein: '10.5', fat: '20.0', carb: '22.0', salt: '1.2', price: '180',
                category: '惣菜'
            }
        },
        {
            keywords: ['サラダ', 'ポテトサラダ', 'マカロニサラダ'],
            data: {
                ingredients: 'じゃがいも（国産）（またはマカロニ（国内製造））、マヨネーズ、きゅうり、人参、玉ねぎ、ハム、食塩、香辛料／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に卵・大豆・豚肉・りんごを含む）',
                calories: '150', protein: '2.5', fat: '12.0', carb: '10.0', salt: '0.6', price: '200',
                category: '惣菜',
                storeMethod: '10℃以下で保存してください'
            }
        },
        {
            keywords: ['きんぴら', '金平'],
            data: {
                ingredients: 'ごぼう（国産または中国産）、人参、醤油、砂糖、みりん、ごま油、ごま／調味料（アミノ酸等）、（一部に小麦・大豆・ごまを含む）',
                calories: '90', protein: '2.0', fat: '3.5', carb: '13.0', salt: '1.1', price: '180',
                category: '惣菜'
            }
        },
        {
            keywords: ['ひじき', '煮物', '筑前煮', '肉じゃが'],
            data: {
                ingredients: '野菜（国産じゃがいも、人参、玉ねぎ、里芋など）、醤油、砂糖、みりん、風味調味料、植物油脂／調味料（アミノ酸等）、（一部に小麦・大豆を含む）',
                calories: '120', protein: '3.0', fat: '2.5', carb: '15.0', salt: '1.2', price: '250',
                category: '惣菜'
            }
        },
        {
            keywords: ['天ぷら', '天プラ', 'かき揚げ', '天婦羅'],
            data: {
                ingredients: '野菜（玉ねぎ、人参、さつまいも、かぼちゃ等）、魚介類（えび、いか等）、小麦粉、卵、植物油脂、食塩／膨張剤、着色料（ビタミンB2）、（一部に小麦・卵・えび・いかを含む）',
                calories: '350', protein: '6.0', fat: '20.0', carb: '36.0', salt: '0.5', price: '300',
                category: '惣菜'
            }
        },
        {
            keywords: ['酢豚'],
            data: {
                ingredients: '豚肉（国産）、玉ねぎ、人参、ピーマン、椎茸、ケチャップ、砂糖、醤油、醸造酢、植物油脂、片栗粉／調味料（アミノ酸等）、増粘剤（加工デンプン）、酸味料、（一部に小麦・豚肉・大豆を含む）',
                calories: '400', protein: '12.0', fat: '25.0', carb: '28.0', salt: '2.0', price: '350',
                category: '惣菜'
            }
        },
        {
            keywords: ['エビフライ', '海老フライ'],
            data: {
                ingredients: 'えび（国産）、パン粉、小麦粉、卵、植物油脂、食塩、タルタルソース／加工デンプン、調味料（アミノ酸等）、増粘剤（タマリンド）、香辛料抽出物、（一部に小麦・卵・乳成分・えび・大豆を含む）',
                calories: '320', protein: '15.0', fat: '18.0', carb: '22.0', salt: '1.5', price: '380',
                category: '惣菜'
            }
        },
        {
            keywords: ['春巻き', 'はるまき'],
            data: {
                ingredients: '野菜（キャベツ、人参、たけのこ、椎茸）、豚肉、春巻きの皮（小麦粉、植物油脂、食塩）、醤油、ごま油、砂糖／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に小麦・豚肉・大豆・ごまを含む）',
                calories: '280', protein: '6.0', fat: '16.0', carb: '26.0', salt: '1.2', price: '200',
                category: '惣菜'
            }
        },
        // ==== タイ料理 ====
        {
            keywords: ['ガパオ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、鶏挽肉、パプリカ、玉ねぎ、バジル、ナンプラー、オイスターソース、植物油脂、目玉焼き／調味料（アミノ酸等）、（一部に小麦・卵・鶏肉・大豆を含む）',
                calories: '710', protein: '22.8', fat: '24.2', carb: '98.1', salt: '4.1', price: '680'
            }
        },
        {
            keywords: ['パッタイ'],
            data: {
                ingredients: 'ビーフン（国内製造）、えび、厚揚げ、もやし、ニラ、卵、おろしにんにく、パッタイソース（砂糖、ナンプラー、タマリンドなど）、ピーナッツ、植物油脂／調味料（アミノ酸等）、酸味料、（一部に小麦・卵・えび・落花生・大豆・ごまを含む）',
                calories: '580', protein: '15.0', fat: '18.0', carb: '85.0', salt: '4.5', price: '600',
                category: '調理めん'
            }
        },
        {
            keywords: ['グリーンカレー'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、ココナッツミルク、鶏肉、茄子、たけのこ、ピーマン、グリーンカレーペースト、ナンプラー、砂糖／調味料（アミノ酸等）、（一部に乳成分・鶏肉・大豆を含む）',
                calories: '620', protein: '18.0', fat: '25.0', carb: '88.0', salt: '3.8', price: '650'
            }
        },
        {
            keywords: ['カオマンガイ'],
            data: {
                ingredients: '味付け御飯（米（国産）、鶏だし、生姜）、ゆで鶏肉、きゅうり、パクチー、特製だれ（味噌、醤油、生姜、にんにく等）／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆を含む）',
                calories: '650', protein: '25.0', fat: '18.0', carb: '92.0', salt: '3.5', price: '650'
            }
        },
        // ==== インド料理 ====
        {
            keywords: ['バターチキン'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、バターチキンカレー（鶏肉（ブラジル産）、トマトペースト、生クリーム、バター、カシューナッツ、香辛料など）／調味料（アミノ酸等）、着色料（パプリカ色素）、（一部に小麦・乳成分・鶏肉・カシューナッツ・大豆を含む）',
                calories: '850', protein: '28.0', fat: '35.0', carb: '95.0', salt: '3.2', price: '700'
            }
        },
        {
            keywords: ['キーマカレー'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、キーマカレー（豚挽肉、牛肉、玉ねぎ、トマト、香辛料など）、ゆで卵／調味料（アミノ酸等）、カラメル色素、（一部に小麦・牛肉・豚肉・大豆を含む）',
                calories: '780', protein: '22.5', fat: '28.0', carb: '105.0', salt: '3.5', price: '650'
            }
        },
        {
            keywords: ['タンドリーチキン'],
            data: {
                ingredients: '鶏肉（ブラジル産）、ヨーグルト、生姜、にんにく、トマトペースト、香辛料、植物油脂、食塩／調味料（アミノ酸等）、（一部に乳成分・鶏肉・大豆を含む）',
                calories: '320', protein: '35.0', fat: '18.0', carb: '4.5', salt: '2.1', price: '450',
                category: '惣菜'
            }
        },
        // ==== 中華・その他 ====
        {
            keywords: ['エビチリ', '海老のチリソース'],
            data: {
                ingredients: 'えび、玉ねぎ、トマトケチャップ、豆板醤、醤油、砂糖、みりん、生姜、にんにく、片栗粉／調味料（アミノ酸等）、（一部にえび・小麦・大豆を含む）',
                calories: '320', protein: '12.0', fat: '18.0', carb: '22.0', salt: '2.5', price: '450',
                category: '惣菜'
            }
        },
        {
            keywords: ['油淋鶏', 'ユーリンチー'],
            data: {
                ingredients: '鶏肉（ブラジル産）、長ねぎ、生姜、にんにく、醤油、酢、砂糖、ごま油、植物油脂、片栗粉／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆・ごまを含む）',
                calories: '550', protein: '28.0', fat: '35.0', carb: '15.0', salt: '2.8', price: '500', 
                category: '惣菜'
            }
        },
        {
            keywords: ['青椒肉絲', 'チンジャオ'],
            data: {
                ingredients: '豚肉、ピーマン、たけのこ、醤油、オイスターソース、砂糖、酒、植物油脂、片栗粉／調味料（アミノ酸等）、（一部に小麦・豚肉・大豆を含む）',
                calories: '420', protein: '18.0', fat: '28.0', carb: '12.0', salt: '2.2', price: '500', 
                category: '惣菜'
            }
        },
        {
            keywords: ['回鍋肉', 'ホイコーロー'],
            data: {
                ingredients: '豚肉、キャベツ、ピーマン、ネギ、味噌、醤油、豆板醤、植物油脂、砂糖／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に小麦・豚肉・大豆・ごまを含む）',
                calories: '450', protein: '16.0', fat: '32.0', carb: '12.0', salt: '3.0', price: '500',
                category: '惣菜'
            }
        },
        {
            keywords: ['棒棒鶏', 'バンバンジー', '蒸し鶏'],
            data: {
                ingredients: '鶏肉、きゅうり、ごまソース（練りごま、醤油、酢、砂糖、ラー油等）／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆・ごまを含む）',
                calories: '280', protein: '25.0', fat: '18.0', carb: '4.5', salt: '1.8', price: '450',
                category: '惣菜', storeMethod: '10℃以下で保存してください'
            }
        },
        {
            keywords: ['中華丼'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、中華あん（白菜、海老、豚肉、人参、たけのこ、椎茸、うずら卵、醤油、片栗粉等）／調味料（アミノ酸等）、（一部に小麦・卵・えび・豚肉・大豆・ごまを含む）',
                calories: '650', protein: '18.0', fat: '12.0', carb: '105.0', salt: '3.8', price: '600'
            }
        },
        {
            keywords: ['焼売', 'しゅうまい', 'シュウマイ'],
            data: {
                ingredients: '皮（小麦粉）、豚肉、玉ねぎ、澱粉、醤油、砂糖、食塩、植物油脂／調味料（アミノ酸等）、（一部に小麦・豚肉・大豆を含む）',
                calories: '240', protein: '12.0', fat: '15.0', carb: '18.0', salt: '1.5', price: '300',
                category: '惣菜'
            }
        },
        {
            keywords: ['餃子', 'ギョーザ', 'ぎょうざ'],
            data: {
                ingredients: '皮（小麦粉）、野菜（キャベツ、ニラ、ネギ、生姜、にんにく）、豚肉、植物油脂、醤油、ラード、食塩、胡椒／調味料（アミノ酸等）、（一部に小麦・豚肉・大豆・ごまを含む）',
                calories: '280', protein: '10.0', fat: '18.0', carb: '24.0', salt: '1.2', price: '300',
                category: '惣菜'
            }
        },
        // ==== 各国料理 ====
        {
            keywords: ['ビビンバ', 'ビビンパ'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、牛肉、ナムル（もやし、人参、ほうれん草等）、コチュジャンだれ、玉子焼き／調味料（アミノ酸等）、（一部に小麦・卵・牛肉・大豆・ごまを含む）',
                calories: '720', protein: '20.0', fat: '22.0', carb: '105.0', salt: '3.5', price: '650'
            }
        },
        {
            keywords: ['プルコギ'],
            data: {
                ingredients: '牛肉、玉ねぎ、ピーマン、春雨、醤油、砂糖、ごま油、にんにく、梨果汁、唐辛子／調味料（アミノ酸等）、（一部に小麦・牛肉・大豆・ごま・りんごを含む）',
                calories: '480', protein: '22.0', fat: '35.0', carb: '18.0', salt: '2.8', price: '500',
                category: '惣菜'
            }
        },
        {
            keywords: ['タコライス'],
            data: {
                ingredients: '麦入り御飯（米（国産）、大麦）、タコスミート（挽肉、玉ねぎ、トマト、スパイス）、レタス、チーズ、サルサソース／調味料（アミノ酸等）、（一部に乳成分・牛肉・豚肉・大豆を含む）',
                calories: '680', protein: '22.0', fat: '20.0', carb: '98.0', salt: '3.2', price: '650'
            }
        },
        {
            keywords: ['タコス'],
            data: {
                ingredients: 'トルティーヤ、タコスミート（挽肉、玉ねぎ、トマト、スパイス）、レタス、チーズ、サルサソース／調味料（アミノ酸等）、（一部に乳成分・牛肉・豚肉・大豆を含む）',
                calories: '450', protein: '18.0', fat: '22.0', carb: '45.0', salt: '2.5', price: '500',
                category: '惣菜'
            }
        },
        {
            keywords: ['パエリア'],
            data: {
                ingredients: '味付け米（米（国産）、サフラン、魚介だし）、えび、いか、あさり、鶏肉、パプリカ、ピーマン／調味料（アミノ酸等）、香料、（一部にえび・いか・鶏肉・大豆を含む）',
                calories: '550', protein: '24.0', fat: '12.0', carb: '88.0', salt: '3.0', price: '750'
            }
        },
        {
            keywords: ['フォー'],
            data: {
                ingredients: '米粉めん（ベトナム製造）、鶏だし、鶏肉、もやし、パクチー、レモンペースト、食塩、ナンプラー／調味料（アミノ酸等）、酸味料、（一部に鶏肉・大豆を含む）',
                calories: '380', protein: '15.0', fat: '4.5', carb: '68.0', salt: '4.5', price: '550',
                category: '調理めん'
            }
        },
        // ==== パスタ・洋食 ====
        {
            keywords: ['ミートソース', 'ボロネーゼ'],
            data: {
                ingredients: 'スパゲティ（国内製造）、ミートソース（牛肉、豚肉、玉ねぎ、トマトペースト、ワイン、植物油脂、スパイス等）／調味料（アミノ酸等）、カラメル色素、（一部に小麦・牛肉・豚肉・大豆を含む）',
                calories: '580', protein: '18.5', fat: '22.0', carb: '75.0', salt: '3.2',
                category: '調理めん'
            }
        },
        {
            keywords: ['カルボナーラ'],
            data: {
                ingredients: 'スパゲティ（国内製造）、カルボナーラソース（生クリーム、卵、チーズ、ベーコン、プロセスチーズ、植物油脂、スパイス等）／調味料（アミノ酸等）、乳化剤、増粘剤（加工デンプン）、リン酸塩（Na）、発色剤（亜硝酸Na）、（一部に小麦・卵・乳成分・豚肉・大豆を含む）',
                calories: '650', protein: '20.0', fat: '35.0', carb: '68.0', salt: '3.5',
                category: '調理めん'
            }
        },
        {
            keywords: ['ナポリタン'],
            data: {
                ingredients: 'スパゲティ（国内製造）、トマトケチャップ、ウィンナー、玉ねぎ、ピーマン、植物油脂、砂糖、食塩、胡椒／調味料（アミノ酸等）、リン酸塩（Na）、発色剤（亜硝酸Na）、（一部に小麦・卵・乳成分・豚肉・大豆を含む）',
                calories: '520', protein: '14.5', fat: '18.0', carb: '72.0', salt: '3.8',
                category: '調理めん'
            }
        },
        {
            keywords: ['たらこパスタ', '明太子パスタ'],
            data: {
                ingredients: 'スパゲティ（国内製造）、たらこソース（たらこ、植物油脂、バター、醤油、エキス等）、海苔／調味料（アミノ酸等）、着色料（紅麹、ベニバナ）、（一部に小麦・乳成分・大豆を含む）',
                calories: '480', protein: '15.5', fat: '18.2', carb: '65.5', salt: '4.2',
                category: '調理めん'
            }
        },
        {
            keywords: ['ペペロンチーノ'],
            data: {
                ingredients: 'スパゲティ（国内製造）、植物油脂、ベーコン、唐辛子、にんにく、アンチョビエキス、食塩、胡椒／調味料（アミノ酸等）、（一部に小麦・大豆・豚肉を含む）',
                calories: '550', protein: '14.0', fat: '25.0', carb: '70.0', salt: '3.0',
                category: '調理めん'
            }
        },
        {
            keywords: ['グラタン', 'マカグラ'],
            data: {
                ingredients: 'マカロニ（国内製造）、牛乳、鶏肉、えび、ホワイトソース、チーズ、玉ねぎ、パン粉／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に小麦・卵・乳成分・えび・鶏肉・大豆を含む）',
                calories: '450', protein: '18.0', fat: '28.0', carb: '32.0', salt: '2.5',
                category: '惣菜', storeMethod: '10℃以下で保存してください'
            }
        },
        {
            keywords: ['ドリア'],
            data: {
                ingredients: '味付け御飯（米（国産）、バター、玉ねぎ、チキンエキス）、ホワイトソース、チーズ、海老／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に小麦・卵・乳成分・えび・大豆を含む）',
                calories: '580', protein: '16.5', fat: '25.0', carb: '72.0', salt: '3.2',
                category: '弁当'
            }
        },
        {
            keywords: ['シチュー', 'ビーフシチュー'],
            data: {
                ingredients: '牛肉、玉ねぎ、人参、じゃがいも、デミグラスソース、赤ワイン、砂糖、食塩、植物油脂、スパイス／調味料（アミノ酸等）、カラメル色素、（一部に小麦・牛肉・大豆を含む）',
                calories: '380', protein: '15.0', fat: '22.0', carb: '28.0', salt: '2.4',
                category: '惣菜'
            }
        }
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
            usePlaMark: document.getElementById('use-pla-mark'),
            useJancode: document.getElementById('use-jancode'),
            jancodeValue: document.getElementById('jancode-value'),
            // かんたん印刷用
            quickPreset: document.getElementById('quick-preset-select'),
            quickStoreProfile: document.getElementById('quick-store-profile-select')
        },
        preview: {
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
            packagingMark: document.getElementById('preview-packaging-mark'),
            barcodeContainer: document.getElementById('preview-barcode-container'),
            barcodeSvg: document.getElementById('preview-barcode')
        },
        buttons: {
            printBtns: [
                document.getElementById('print-btn-header'),
                document.getElementById('print-btn-footer')
            ],
            printCountH: document.getElementById('print-count-header'),
            printCountF: document.getElementById('print-count-footer'),
            savePreset: document.getElementById('save-preset-btn'),
            copyPreset: document.getElementById('copy-preset-btn'),
            deletePreset: document.getElementById('delete-preset-btn'),
            autoFill: document.getElementById('auto-fill-btn'),
            searchWeb: document.getElementById('search-web-btn'),
            copyStoreProfile: document.getElementById('copy-store-profile-btn'),
            deleteStoreProfile: document.getElementById('delete-store-profile-btn'),
            // かんたん印刷用
            quickPrintBtn: document.getElementById('quick-print-btn'),
            quickPrintCount: document.getElementById('quick-print-count'),
            quickCountMinus: document.getElementById('quick-count-minus'),
            quickCountPlus: document.getElementById('quick-count-plus')
        }
    };
    // ==== タブ切り替え処理は setupEventListeners で行います ====
    const defaultTemplates = {
        't200_1': { name: '豚汁', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌（国内製造）、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '200', calories: '150', protein: '8.5', fat: '9.2', carb: '7.8', salt: '1.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't200_2': { name: 'おにぎり（鮭）', category: 'おにぎり', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、鮭フレーク、海苔（国産）／調味料（アミノ酸等）、着色料（紅麹）、（一部にさけ・大豆を含む）', price: '200', calories: '180', protein: '4.2', fat: '1.1', carb: '38.5', salt: '1.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't200_3': { name: 'おにぎり（こんぶ）', category: 'おにぎり', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、昆布佃煮、海苔（国産）／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・大豆を含む）', price: '200', calories: '175', protein: '3.8', fat: '0.8', carb: '39.0', salt: '1.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't200_4': { name: 'おにぎり（うめ）', category: 'おにぎり', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、梅干し、海苔（国産）／酸味料、調味料（アミノ酸等）、着色料（赤106）、（一部に大豆を含む）', price: '200', calories: '170', protein: '3.5', fat: '0.5', carb: '38.0', salt: '2.0', useJancode: false, jancodeValue: '', usePlaMark: true },

        't250_1': { name: '豚汁（小）', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌（国内製造）、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '250', calories: '120', protein: '6.8', fat: '7.5', carb: '6.2', salt: '1.4', useJancode: false, jancodeValue: '', usePlaMark: true },
        't250_2': { name: '焼きそば（小）', category: '調理めん', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'ゆで中華めん（国内製造）、キャベツ、豚肉、もやし、人参、濃厚ソース、植物油脂、青のり／調味料（アミノ酸等）、カラメル色素、かんすい、酸味料、（一部に小麦・豚肉・大豆・りんごを含む）', price: '250', calories: '280', protein: '8.5', fat: '12.0', carb: '35.0', salt: '2.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't250_3': { name: '玉こんにゃく', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'こんにゃく（国内製造）、醤油、砂糖、みりん、風味調味料／調味料（アミノ酸等）、水酸化カルシウム、（一部に小麦・大豆を含む）', price: '250', calories: '45', protein: '1.2', fat: '0.2', carb: '10.5', salt: '1.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't250_4': { name: '岩下の新生姜タルタル', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'マヨネーズ（国内製造）、岩下の新生姜、ゆで卵、玉ねぎ、砂糖、食塩、香辛料／調味料（アミノ酸等）、酸味料、（一部に卵・大豆・りんごを含む）', price: '250', calories: '150', protein: '2.5', fat: '14.0', carb: '1.8', salt: '0.8', useJancode: false, jancodeValue: '', usePlaMark: true },

        't340_1': { name: '豚汁（中）', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌（国内製造）、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '340', calories: '180', protein: '10.2', fat: '11.0', carb: '9.3', salt: '2.1', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_2': { name: 'ちくわの磯辺揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'ちくわ（国内製造）、小麦粉、植物油脂、青のり、食塩／加工デンプン、調味料（アミノ酸等）、（一部に小麦・卵・大豆を含む）', price: '340', calories: '220', protein: '8.0', fat: '12.5', carb: '18.0', salt: '1.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_3': { name: 'ちくわの磯辺揚げ＆紅生姜揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'ちくわ（国内製造）、紅生姜、小麦粉、植物油脂、青のり、食塩／加工デンプン、調味料（アミノ酸等）、酸味料、着色料（赤106）、（一部に小麦・卵・大豆を含む）', price: '340', calories: '215', protein: '7.8', fat: '12.0', carb: '18.5', salt: '1.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_4': { name: '野菜サラダ（小）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'キャベツ（国産）、レタス、人参、きゅうり、トマト、コーン／酸化防止剤（V.C）、（一部に大豆を含む）', price: '340', calories: '45', protein: '1.5', fat: '0.3', carb: '9.5', salt: '0.1', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_5': { name: 'マカロニサラダ', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'マカロニ（国内製造）、マヨネーズ、きゅうり、人参、玉ねぎ、ハム、食塩、香辛料／調味料（アミノ酸等）、増粘剤（加工デンプン）、（一部に卵・大豆・豚肉・りんごを含む）', price: '340', calories: '180', protein: '3.5', fat: '13.0', carb: '12.0', salt: '0.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_6': { name: 'シシャモフライ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'シシャモ（国産）、パン粉、小麦粉、卵、植物油脂、食塩／加工デンプン、調味料（アミノ酸等）、（一部に小麦・卵・大豆を含む）', price: '340', calories: '190', protein: '12.0', fat: '10.5', carb: '11.5', salt: '0.9', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_7': { name: '海老かき揚げ1個', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '玉ねぎ（国産）、人参、えび、小麦粉、卵、植物油脂、食塩／膨張剤、着色料（ビタミンB2）、（一部に小麦・卵・えび・大豆を含む）', price: '340', calories: '250', protein: '4.5', fat: '18.0', carb: '18.5', salt: '0.4', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_8': { name: '冷やしうどん（小）', category: '調理めん', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'ゆでうどん（国内製造）、めんつゆ、ネギ、天かす／調味料（アミノ酸等）、酸味料、（一部に小麦・大豆を含む）', price: '340', calories: '210', protein: '5.5', fat: '1.2', carb: '44.0', salt: '2.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't340_9': { name: 'おにぎり1個セット', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、鮭フレーク、だし巻き卵、唐揚げ、海苔（国産）／調味料（アミノ酸等）、着色料（紅麹）、（一部に小麦・卵・鶏肉・さけ・大豆を含む）', price: '340', calories: '320', protein: '12.5', fat: '8.5', carb: '48.0', salt: '1.8', useJancode: false, jancodeValue: '', usePlaMark: true },

        't500_1': { name: '岩下の新生姜”本気”唐揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '鶏肉（ブラジル産）、岩下の新生姜、小麦粉、片栗粉、醤油、酒、植物油脂、食塩／調味料（アミノ酸等）、酸味料、（一部に小麦・鶏肉・大豆を含む）', price: '500', calories: '350', protein: '22.0', fat: '24.0', carb: '11.5', salt: '1.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_2': { name: '野菜サラダ（中）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'キャベツ（国産）、レタス、人参、きゅうり、トマト、コーン／酸化防止剤（V.C）、（一部に大豆を含む）', price: '500', calories: '85', protein: '2.8', fat: '0.6', carb: '17.5', salt: '0.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_3': { name: '豚汁（大）', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '味噌（国内製造）、豚肉、大根、人参、ごぼう、こんにゃく、ねぎ／調味料（アミノ酸等）、（一部に大豆・豚肉を含む）', price: '500', calories: '250', protein: '14.5', fat: '15.2', carb: '12.8', salt: '2.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_4': { name: '冷やしかき揚げうどん', category: '調理めん', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'ゆでうどん（国内製造）、野菜かき揚げ、めんつゆ、ネギ／調味料（アミノ酸等）、膨張剤、（一部に小麦・卵・大豆を含む）', price: '500', calories: '480', protein: '12.5', fat: '18.5', carb: '65.0', salt: '4.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_5': { name: 'かつ丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、豚ロースカツ、卵、玉ねぎ、醤油、みりん、砂糖、風味調味料／調味料（アミノ酸等）、加工デンプン、着色料（カロチノイド）、（一部に小麦・卵・豚肉・大豆を含む）', price: '500', calories: '850', protein: '28.0', fat: '32.0', carb: '105.0', salt: '4.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_6': { name: 'かき揚げ天丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、野菜かき揚げ、天丼のたれ／調味料（アミノ酸等）、カラメル色素、膨張剤、（一部に小麦・卵・えび・大豆を含む）', price: '500', calories: '720', protein: '12.5', fat: '25.0', carb: '110.0', salt: '3.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_7': { name: '海老天丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、海老天ぷら、野菜天ぷら、天丼のたれ／調味料（アミノ酸等）、カラメル色素、膨張剤、（一部に小麦・卵・えび・大豆を含む）', price: '500', calories: '680', protein: '18.5', fat: '20.0', carb: '105.0', salt: '3.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_8': { name: 'マーボー丼', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、豆腐、豚挽肉、ネギ、豆板醤、醤油、片栗粉／調味料（アミノ酸等）、豆腐用凝固剤、（一部に小麦・豚肉・大豆・ごまを含む）', price: '500', calories: '650', protein: '22.0', fat: '24.0', carb: '85.0', salt: '3.6', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_9': { name: 'おにぎり2個セット', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '塩飯（米（国産）、塩）、鮭フレーク、梅干し、唐揚げ、だし巻き卵、海苔（国産）／調味料（アミノ酸等）、酸味料、（一部に小麦・卵・鶏肉・さけ・大豆を含む）', price: '500', calories: '480', protein: '18.5', fat: '14.2', carb: '68.0', salt: '2.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_10': { name: 'パスタ（トマトクリーム）', category: '調理めん', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: 'スパゲティ（国内製造）、トマトソース、クリーム、ベーコン、プロセスチーズ／調味料（アミノ酸等）、乳化剤、発色剤（亜硝酸Na）、（一部に小麦・乳成分・豚肉・大豆を含む）', price: '500', calories: '580', protein: '22.5', fat: '25.0', carb: '65.0', salt: '3.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't500_11': { name: 'おつまみパック6', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '唐揚げ（国内製造）、枝豆、ウインナー、ポテトフライ、玉子焼き、ちくわ磯辺揚げ／調味料（アミノ酸等）、リン酸塩（Na）、発色剤（亜硝酸Na）、（一部に小麦・卵・乳成分・鶏肉・豚肉・大豆を含む）', price: '500', calories: '450', protein: '24.0', fat: '28.0', carb: '25.0', salt: '3.5', useJancode: false, jancodeValue: '', usePlaMark: true },

        't660_1': { name: '岩下の新生姜”本気”唐揚げ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、岩下の新生姜本気唐揚げ、その他おかず／調味料（アミノ酸等）、酸味料、（一部に小麦・鶏肉・大豆を含む）', price: '660', calories: '780', protein: '28.5', fat: '30.1', carb: '95.6', salt: '3.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_2': { name: 'サバフライ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、サバフライ、その他おかず／調味料（アミノ酸等）、加工デンプン、（一部に小麦・卵・さば・大豆を含む）', price: '660', calories: '720', protein: '24.1', fat: '25.4', carb: '92.3', salt: '3.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_3': { name: 'チキンカツ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、チキンカツ、その他おかず／調味料（アミノ酸等）、加工デンプン、（一部に小麦・卵・鶏肉・大豆を含む）', price: '660', calories: '810', protein: '26.5', fat: '28.5', carb: '98.0', salt: '3.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_4': { name: 'とんかつ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、豚肉（ロース）、パン粉、とんかつソース、その他おかず／調味料（アミノ酸等）、カラメル色素、増粘多糖類、（一部に小麦・卵・豚肉・大豆・りんごを含む）', price: '660', calories: '854', protein: '22.1', fat: '35.4', carb: '102.3', salt: '3.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_5': { name: 'ローストポーク弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、ローストポーク、特製だれ、その他おかず／調味料（アミノ酸等）、カラメル色素、（一部に小麦・豚肉・大豆・りんごを含む）', price: '660', calories: '750', protein: '28.0', fat: '22.0', carb: '95.0', salt: '3.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_6': { name: 'よだれどり弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、蒸し鶏、辛味だれ（醤油、ラー油、ごま油など）、その他おかず／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆・ごまを含む）', price: '660', calories: '680', protein: '30.5', fat: '18.2', carb: '90.5', salt: '3.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_7': { name: 'とり胸低温調理弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、鶏胸肉、塩だれ、その他おかず／調味料（アミノ酸等）、（一部に小麦・鶏肉・大豆を含む）', price: '660', calories: '620', protein: '32.5', fat: '12.1', carb: '88.6', salt: '3.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_8': { name: '焼肉弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、牛肉、玉ねぎ、焼肉のたれ、その他おかず／調味料（アミノ酸等）、カラメル色素、酸味料、（一部に小麦・牛肉・ごま・大豆・りんごを含む）', price: '660', calories: '820', protein: '24.5', fat: '28.1', carb: '105.6', salt: '3.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_9': { name: 'ガパオライス', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、鶏挽肉、パプリカ、玉ねぎ、バジル、ナンプラー、目玉焼き／調味料（アミノ酸等）、（一部に小麦・卵・鶏肉・大豆を含む）', price: '660', calories: '710', protein: '22.8', fat: '24.2', carb: '98.1', salt: '4.1', useJancode: false, jancodeValue: '', usePlaMark: true },
        't660_10': { name: 'サラダ（大）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'キャベツ（国産）、レタス、人参、きゅうり、トマト、コーン／酸化防止剤（V.C）、（一部に大豆を含む）', price: '660', calories: '120', protein: '4.5', fat: '0.8', carb: '24.5', salt: '0.3', useJancode: false, jancodeValue: '', usePlaMark: true },

        't750_1': { name: '岩下の新生姜”本気”唐揚げ（タルタル）弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、岩下の新生姜本気唐揚げ、岩下の新生姜タルタル、その他おかず／調味料（アミノ酸等）、酸味料、（一部に小麦・卵・鶏肉・大豆・りんごを含む）', price: '750', calories: '880', protein: '30.5', fat: '42.1', carb: '98.6', salt: '3.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_2': { name: '幕ノ内弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、焼き鮭、海老フライ、煮物、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・えび・さけ・鶏肉・豚肉・大豆を含む）', price: '750', calories: '650', protein: '22.8', fat: '18.2', carb: '92.1', salt: '3.6', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_3': { name: '焼きサバ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、塩鯖焼き、その他おかず／調味料（アミノ酸等）、酸化防止剤（V.C）、酸味料、（一部に小麦・さば・大豆を含む）', price: '750', calories: '680', protein: '25.5', fat: '22.4', carb: '90.3', salt: '3.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_4': { name: '筋トレ弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '玄米（国産米）、鶏胸肉低温調理、ブロッコリー、ゆで卵／調味料（アミノ酸等）、（一部に卵・鶏肉を含む）', price: '750', calories: '580', protein: '45.0', fat: '12.0', carb: '68.0', salt: '2.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_5': { name: 'サラダ（おすすめ）', category: '惣菜', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: 'レタス（国産）、ローストポーク、ゆで卵、トマト、ブロッコリー／酸化防止剤（V.C）、（一部に卵・豚肉・大豆を含む）', price: '750', calories: '320', protein: '18.5', fat: '14.2', carb: '12.1', salt: '1.2', useJancode: false, jancodeValue: '', usePlaMark: true },
        't750_6': { name: '若鶏の半身揚げ', category: '惣菜', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '鶏肉（ブラジル産）、香辛料、食塩、植物油脂／調味料（アミノ酸等）、（一部に鶏肉を含む）', price: '750', calories: '550', protein: '42.0', fat: '38.0', carb: '2.0', salt: '2.8', useJancode: false, jancodeValue: '', usePlaMark: true },

        't1000_1': { name: '日替わり弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '麦入り御飯（米（国産）、大麦）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆・ごま・りんごを含む）', price: '1000', calories: '750', protein: '25.0', fat: '22.0', carb: '105.0', salt: '3.8', useJancode: false, jancodeValue: '', usePlaMark: true },
        't1000_2': { name: '玄米日替わり弁当', category: '弁当', consumeDays: '1', storeMethod: '直射日光及び高温多湿を避けて保存してください', ingredients: '玄米（国産米）、主菜（肉類または魚介類）、その他おかず／調味料（アミノ酸等）、着色料（赤106、カロチノイド）、（一部に小麦・卵・乳成分・牛肉・豚肉・鶏肉・さば・大豆・ごま・りんごを含む）', price: '1000', calories: '720', protein: '25.5', fat: '22.0', carb: '100.0', salt: '3.6', useJancode: false, jancodeValue: '', usePlaMark: true },
        't1000_3': { name: '鍋セット', category: '惣菜半製品', consumeDays: '1', storeMethod: '10℃以下で保存してください', ingredients: '白菜（国産）、豚肉、ネギ、豆腐、きのこ類、鍋スープ／調味料（アミノ酸等）、豆腐用凝固剤、（一部に小麦・豚肉・大豆を含む）', price: '1000', calories: '450', protein: '28.0', fat: '32.0', carb: '15.0', salt: '5.5', useJancode: false, jancodeValue: '', usePlaMark: true },
        't1000_4': { name: '冷凍岩下の新生姜”本気”唐揚げ', category: '冷凍食品', consumeDays: '30', storeMethod: '-18℃以下で保存してください', ingredients: '鶏肉（ブラジル産）、岩下の新生姜、小麦粉、片栗粉、醤油、酒、植物油脂、食塩／調味料（アミノ酸等）、酸味料、（一部に小麦・鶏肉・大豆を含む）', price: '1000', calories: '350', protein: '22.0', fat: '24.0', carb: '11.5', salt: '1.8', useJancode: false, jancodeValue: '', usePlaMark: true }
    };

    let userTemplates = {};
    let userManuallyChangedCategory = false; // ユーザーが明示的にカテゴリーを変更したかのフラグ

    const loadTemplates = () => {
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
            } else {
                // 既存のテンプレートでもカロリー等の新しい項目が空なら初期値で埋める
                const nutritonFields = ['calories', 'protein', 'fat', 'carb', 'salt'];
                nutritonFields.forEach(field => {
                    if (userTemplates[k][field] === undefined || userTemplates[k][field] === '') {
                        userTemplates[k][field] = defaultTemplates[k][field];
                        shouldSave = true;
                    }
                });
            }
        });
        
        // もう不要なサバの塩焼き弁当、唐揚げ弁当、幕の内等の古いキーを削除
        if(userTemplates['tmpl_saba']) { delete userTemplates['tmpl_saba']; shouldSave = true; }
        if(userTemplates['tmpl_karaage']) { delete userTemplates['tmpl_karaage']; shouldSave = true; }
        if(userTemplates['tmpl_maku']) { delete userTemplates['tmpl_maku']; shouldSave = true; }
        
        
        // 【マイグレーション】既存の保存データ内の表記を一括更新
        Object.keys(userTemplates).forEach(id => {
            const t = userTemplates[id];
            if (!t.ingredients) return;
            
            let updated = false;
            // 1. 「御飯（国産米）」を「麦入り御飯（米（国産）、大麦）」に置換
            if (t.ingredients.includes('御飯（国産米）')) {
                t.ingredients = t.ingredients.replace(/御飯（国産米）/g, '麦入り御飯（米（国産）、大麦）');
                updated = true;
            }
            
            // 2. 鶏肉関連の産地を「ブラジル産」に更新
            const chickenKeywords = ['鶏肉', '鶏もも肉', 'とり肉', '若鶏', 'チキン', '鶏むね'];
            const match = t.ingredients.match(/^[^、／]+/); // 先頭の原材料
            if (match) {
                let firstItem = match[0];
                if (chickenKeywords.some(kw => firstItem.includes(kw))) {
                    // まだ「ブラジル産」が含まれていない場合のみ処理
                    if (!firstItem.includes('ブラジル産')) {
                        // 国産と書いてある場合は置換、産地がない場合は付加
                        if (firstItem.includes('国産')) {
                            t.ingredients = t.ingredients.replace('国産', 'ブラジル産');
                            updated = true;
                        } else if (!firstItem.includes('（') && !firstItem.includes('(')) {
                            // 括弧すらない場合は末尾に付加
                            t.ingredients = t.ingredients.replace(firstItem, firstItem.trim() + '（ブラジル産）');
                            updated = true;
                        }
                    }
                }
            }
            
            if (updated) shouldSave = true;
        });
        
        if (shouldSave) saveTemplates();
    };

    const saveTemplates = () => {
        localStorage.setItem('bentoAllTemplates', JSON.stringify(userTemplates));
    };

    const renderPresetOptions = () => {
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
        
        // かんたん印刷用セレクトをクリアしてから埋める
        if (elements.inputs.quickPreset) {
            elements.inputs.quickPreset.innerHTML = '<option value="">-- メニューを選択 --</option>';
        }
        
        sortedKeys.forEach(id => {
            const data = userTemplates[id];
            const option = document.createElement('option');
            option.value = id;
            const priceStr = data.price ? `[¥${data.price}] ` : '';
            option.textContent = `${priceStr}${data.name || '(無名)'}`;
            select.appendChild(option);
            
            if (elements.inputs.quickPreset) {
                const quickOption = option.cloneNode(true);
                elements.inputs.quickPreset.appendChild(quickOption);
            }
        });
        
        select.value = userTemplates[currentVal] ? currentVal : '';
        if (elements.inputs.quickPreset) {
            elements.inputs.quickPreset.value = select.value;
        }
        
        const isDefault = select.value === '';
        if(elements.buttons.deletePreset) {
            elements.buttons.deletePreset.style.opacity = isDefault ? '0.5' : '1';
            elements.buttons.deletePreset.style.pointerEvents = isDefault ? 'none' : 'auto';
        }
        if(elements.buttons.savePreset) {
            elements.buttons.savePreset.style.opacity = isDefault ? '0.5' : '1';
            elements.buttons.savePreset.style.pointerEvents = isDefault ? 'none' : 'auto';
        }
    };

    // ==== 事業者情報の永続化 ====
    const getActiveProfileId = () => {
        return elements.inputs.storeProfile ? elements.inputs.storeProfile.value : 'A';
    };

    const getStoreProfileNames = () => {
        const saved = localStorage.getItem('bentoStoreProfileNames');
        return saved ? JSON.parse(saved) : {
            A: 'パターンA (自分のお店など・主利用)',
            B: 'パターンB (道の駅・直売所など)',
            C: 'パターンC (スーパー・委託販売など)'
        };
    };

    const saveStoreProfileNames = (names) => {
        localStorage.setItem('bentoStoreProfileNames', JSON.stringify(names));
    };

    const updateProfileDropdown = () => {
        const names = getStoreProfileNames();
        const currentVal = getActiveProfileId();
        const selects = [elements.inputs.storeProfile, elements.inputs.quickStoreProfile];
        
        selects.forEach(select => {
            if (!select) return;
            select.innerHTML = '';
            Object.keys(names).forEach(key => {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = names[key];
                select.appendChild(opt);
            });
            
            if(names[currentVal]) {
                select.value = currentVal;
            } else {
                select.value = Object.keys(names)[0];
            }
        });
        
        if (!names[currentVal]) {
            localStorage.setItem('bentoLastProfile', Object.keys(names)[0]);
        }
        
        // Hide delete button if only one remains
        if(elements.buttons.deleteStoreProfile) {
            const isOnlyOne = Object.keys(names).length <= 1;
            elements.buttons.deleteStoreProfile.style.opacity = isOnlyOne ? '0.5' : '1';
            elements.buttons.deleteStoreProfile.style.pointerEvents = isOnlyOne ? 'none' : 'auto';
        }
    };

    const loadStoreProfileNameInput = () => {
        if (!elements.inputs.storeProfileName) return;
        const profileId = getActiveProfileId();
        const names = getStoreProfileNames();
        elements.inputs.storeProfileName.value = names[profileId] || `パターン${profileId}`;
    };

    const saveStoreInfo = () => {
        const info = {
            title: elements.inputs.manufacturerTitle.value,
            name: elements.inputs.manufacturer.value,
            address: elements.inputs.address.value,
            phone: elements.inputs.phone.value,
            useSecond: elements.inputs.useSecondStore.checked,
            title2: elements.inputs.manufacturerTitle2.value,
            name2: elements.inputs.manufacturer2.value,
            address2: elements.inputs.address2.value,
            phone2: elements.inputs.phone2.value
        };
        const profileId = getActiveProfileId();
        localStorage.setItem(`bentoStoreInfo_${profileId}`, JSON.stringify(info));
        
        // Save the last selected profile state globally too
        localStorage.setItem('bentoLastProfile', profileId);
    };

    const loadStoreInfo = (profileId = null) => {
        if (!profileId) {
            profileId = localStorage.getItem('bentoLastProfile') || 'A';
        }
        
        // 両方のプルダウンの値を同期
        if (elements.inputs.storeProfile) elements.inputs.storeProfile.value = profileId;
        if (elements.inputs.quickStoreProfile) elements.inputs.quickStoreProfile.value = profileId;

        let saved = localStorage.getItem(`bentoStoreInfo_${profileId}`);
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
    };

    // ==== アプリケーション初期化とイベント ====
    const init = () => {
        loadTemplates(); // Load unified templates
        updateProfileDropdown();
        loadStoreInfo();
        renderPresetOptions();
        setupEventListeners();
        updatePreview();
    };

    const setupEventListeners = () => {
        // ==== タブ切り替え処理 ====
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // タブボタンのActive切り替え
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // コンテンツのActive切り替え
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === btn.dataset.target) {
                        content.classList.add('active');
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });

        // 印刷ボタンリストに かんたん印刷ボタン を追加
        if (elements.buttons.quickPrintBtn && !elements.buttons.printBtns.includes(elements.buttons.quickPrintBtn)) {
            elements.buttons.printBtns.push(elements.buttons.quickPrintBtn);
        }
        
        // かんたん印刷側のイベントリスナー
        if (elements.inputs.quickPreset) {
            elements.inputs.quickPreset.addEventListener('change', (e) => {
                elements.inputs.preset.value = e.target.value;
                elements.inputs.preset.dispatchEvent(new Event('change'));
            });
        }
        
        if (elements.inputs.quickPrintCount) {
            elements.inputs.quickPrintCount.addEventListener('input', (e) => {
                elements.buttons.printCountH.value = e.target.value;
                if(elements.buttons.printCountF) elements.buttons.printCountF.value = e.target.value;
            });
        }
        
        if (elements.buttons.quickCountMinus) {
            elements.buttons.quickCountMinus.addEventListener('click', () => {
                let targetInput = elements.buttons.printCountF || elements.buttons.printCountH;
                if (!targetInput) return;
                let val = parseInt(targetInput.value) || 1;
                if(val > 1) {
                    targetInput.value = val - 1;
                    targetInput.dispatchEvent(new Event('input'));
                }
            });
        }
        
        if (elements.buttons.quickCountPlus) {
            elements.buttons.quickCountPlus.addEventListener('click', () => {
                let targetInput = elements.buttons.printCountF || elements.buttons.printCountH;
                if (!targetInput) return;
                let val = parseInt(targetInput.value) || 1;
                if(val < 999) {
                    targetInput.value = val + 1;
                    targetInput.dispatchEvent(new Event('input'));
                }
            });
        }

        // フィールド変更
        const storeFields = [
            'manufacturerTitle', 'manufacturer', 'address', 'phone', 
            'useSecondStore', 'manufacturerTitle2', 'manufacturer2', 
            'address2', 'phone2', 'storeProfile', 'storeProfileName'
        ];
        
        Object.values(elements.inputs).forEach(input => {
            if (input && input.id !== 'preset-select' && input.id !== 'quick-preset-select' && !storeFields.includes(input.id.replace(/-/g, ''))) {
                input.addEventListener('input', updatePreview);
            }
        });
        
        // 事業者情報の変更監視（保存を同時に行う）
        ['manufacturerTitle', 'manufacturer', 'address', 'phone', 'useSecondStore', 'manufacturerTitle2', 'manufacturer2', 'address2', 'phone2'].forEach(key => {
            if(elements.inputs[key]) {
                elements.inputs[key].addEventListener('input', () => {
                    // UI トグル
                    if(key === 'useSecondStore') {
                        document.getElementById('second-store-wrapper').style.display = elements.inputs.useSecondStore.checked ? 'block' : 'none';
                    }
                    updatePreview();
                    saveStoreInfo();
                });
            }
        });

        // 🏢 パターン切り替え処理
        if (elements.inputs.storeProfile) {
            elements.inputs.storeProfile.addEventListener('change', (e) => {
                const val = e.target.value;
                if (elements.inputs.quickStoreProfile) elements.inputs.quickStoreProfile.value = val;
                loadStoreInfo(val);
                saveStoreInfo();
            });
        }
        
        if (elements.inputs.quickStoreProfile) {
            elements.inputs.quickStoreProfile.addEventListener('change', (e) => {
                const val = e.target.value;
                if (elements.inputs.storeProfile) elements.inputs.storeProfile.value = val;
                loadStoreInfo(val);
                saveStoreInfo();
            });
        }
        
        if (elements.inputs.storeProfileName) {
            elements.inputs.storeProfileName.addEventListener('input', (e) => {
                const profileId = getActiveProfileId();
                const names = getStoreProfileNames();
                names[profileId] = e.target.value || `パターン${profileId}`;
                saveStoreProfileNames(names);
                updateProfileDropdown();
            });
        }
        
        // 店舗・販売先の追加
        if (elements.buttons.copyStoreProfile) {
            elements.buttons.copyStoreProfile.addEventListener('click', () => {
                const names = getStoreProfileNames();
                const currentId = getActiveProfileId();
                const newId = 'S_' + Date.now();
                const currentName = names[currentId] || '名称未設定';
                const newName = currentName + ' のコピー';
                
                names[newId] = newName;
                saveStoreProfileNames(names);
                
                // データ内容もコピー
                const currentData = localStorage.getItem(`bentoStoreInfo_${currentId}`);
                if (currentData) {
                    localStorage.setItem(`bentoStoreInfo_${newId}`, currentData);
                }
                
                elements.inputs.storeProfile.value = newId;
                updateProfileDropdown();
                loadStoreInfo(newId);
                alert(`「${newName}」を追加しました！`);
            });
        }
        
        // 店舗・販売先の削除
        if (elements.buttons.deleteStoreProfile) {
            elements.buttons.deleteStoreProfile.addEventListener('click', () => {
                const names = getStoreProfileNames();
                const keys = Object.keys(names);
                if (keys.length <= 1) {
                    return; // disabled via CSS but safeguard here
                }
                const profileId = getActiveProfileId();
                const profileName = names[profileId];
                if (confirm(`本当に店舗設定「${profileName}」を削除しますか？`)) {
                    delete names[profileId];
                    saveStoreProfileNames(names);
                    localStorage.removeItem(`bentoStoreInfo_${profileId}`);
                    
                    const nextId = Object.keys(names)[0];
                    elements.inputs.storeProfile.value = nextId;
                    updateProfileDropdown();
                    loadStoreInfo(nextId);
                }
            });
        }

        elements.inputs.consumeDays.addEventListener('input', updatePreview);
        
        // 品目分類の自動推測（スマート入力）
        elements.inputs.category.addEventListener('input', () => {
            userManuallyChangedCategory = true;
            updatePreview();
        });

        const inferCategory = (name) => {
            if (!name) return null;
            const n = name.toLowerCase();
            if (n.includes('弁当')) return '弁当';
            if (n.includes('パン') || n.includes('サンド') || n.includes('バーガー') || n.includes('ドッグ')) return '調理パン';
            if (n.includes('うどん') || n.includes('そば') || n.includes('ソバ') || n.includes('パスタ') || n.includes('スパゲティ') || n.includes('ラーメン')) return '調理めん';
            if (n.includes('寿司') || n.includes('すし') || n.includes('巻き') || n.includes('いなり')) return '寿司';
            if (n.includes('おにぎり') || n.includes('むすび')) return 'おにぎり';
            if (n.includes('半製品') || n.includes('味付') || n.includes('生ハンバーグ')) return '惣菜半製品';
            if (n.includes('菓子') || n.includes('だんご') || n.includes('プリン') || n.includes('ゼリー') || n.includes('もち')) return '生菓子';
            
            const souzaiKeywords = ['惣菜', 'サラダ', '揚', '焼', '煮', '炒', 'コロッケ', '天ぷら', 'カツ', 'マリネ', '和え', 'きんぴら', '肉じゃが', '南蛮', 'おかず'];
            if (souzaiKeywords.some(kw => n.includes(kw))) return '惣菜';
            
            return null;
        };

        elements.inputs.name.addEventListener('input', () => {
            const inferred = inferCategory(elements.inputs.name.value);
            if (inferred && !userManuallyChangedCategory) {
                 elements.inputs.category.value = inferred;
                 
                 // 惣菜系なら自動的に「ご飯なし」にチェックを入れる
                 if (inferred === '惣菜' || inferred === '惣菜半製品' || inferred === '調理めん' || inferred === '調理パン' || inferred === '生菓子') {
                     const noRiceRadio = document.querySelector('input[name="rice-type"][value="なし"]');
                     if (noRiceRadio && !noRiceRadio.checked) {
                         noRiceRadio.checked = true;
                         // 既存の ingredients にご飯が入っていれば消すため updateRiceInIngredients を呼ぶ
                         // updateRiceInIngredients の定義前なのでここでは text の直接書き換えなどを検討しますが、
                         // すでに括弧が含まれている（産地や副原料が書かれている）場合は何もしない
                         if (firstItem.includes('（') || firstItem.includes('(')) return text;

                         // 鶏肉系キーワードが最初に来たらデフォルトでブラジル産
                         const chickenKeywords = ['鶏肉', '鶏', '若鶏', 'チキン', '鶏むね', '鶏もも', '唐揚げ'];
                         if (chickenKeywords.some(kw => firstItem.includes(kw))) {
                             origin = '（ブラジル産）';
                             return firstItem + origin + text.substring(match[0].length);
                         }
                     }
                 }
            }
            updatePreview(); // updatePreview handles updating category too
        });

        // リサイクルマーク切り替え
        document.querySelectorAll('input[name="packaging-mark"]').forEach(radio => {
            radio.addEventListener('change', updatePreview);
        });

        // バーコード切り替え
        elements.inputs.useJancode.addEventListener('change', (e) => {
            document.getElementById('jancode-wrapper').style.display = e.target.checked ? 'block' : 'none';
            updatePreview();
        });

        // ご飯の種類切り替え
        const riceTypes = ['御飯（国産米）', '玄米（国産米）', '麦入り御飯（米（国産）、大麦）', '五穀米（米（国産）、五穀）'];
        const riceRadios = document.querySelectorAll('input[name="rice-type"]');
        let currentRice = '麦入り御飯（米（国産）、大麦）';

        window.syncRiceRadioFromText = (text) => {
            let found = 'なし';
            for(let r of riceTypes) {
                if(text.includes(r)) {
                    found = r;
                    break;
                }
            }
            riceRadios.forEach(radio => {
                radio.checked = (radio.value === found);
            });
            currentRice = found;
        };

        const updateRiceInIngredients = (newRice, oldRice) => {
            let text = elements.inputs.ingredients.value;
            // 原材料名から古いご飯の表記を削除または置換
            if (oldRice && oldRice !== 'なし') {
                if (newRice === 'なし') {
                    text = text.replace(oldRice + '、', '').replace(oldRice, '');
                } else {
                    if (text.includes(oldRice)) {
                        text = text.replace(oldRice, newRice);
                    } else {
                        text = newRice + (text ? '、' : '') + text;
                    }
                }
            } else if (newRice !== 'なし') {
                text = newRice + (text ? '、' : '') + text;
            }
            
            // 名称（お弁当の名前）も連動して書き換える（例：「白米」→「玄米」）
            let nameVal = elements.inputs.name.value;
            if(nameVal && newRice !== 'なし' && oldRice && oldRice !== 'なし') {
                const oldShort = oldRice.split('（')[0].replace('御飯','ご飯').replace('麦入り御飯','麦入りご飯');
                const newShort = newRice.split('（')[0].replace('御飯','ご飯').replace('麦入り御飯','麦入りご飯');
                if(nameVal.includes(oldShort)) {
                    elements.inputs.name.value = nameVal.replace(oldShort, newShort);
                }
            }
            // ただし「ご飯」という文字が含まれていなくても、「弁当」の名前に応じてスマートに付与するのは複雑ため、
            // ユーザーが手動で設定した「玄米弁当」などの文字だけ切り替える仕組みにしておく

            elements.inputs.ingredients.value = text;
            updatePreview();
        };

        riceRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if(e.target.checked) {
                    updateRiceInIngredients(e.target.value, currentRice);
                    currentRice = e.target.value;
                }
            });
        });

        // プリセット変更
        elements.inputs.preset.addEventListener('change', (e) => {
            const selectedId = e.target.value;
            if (!selectedId) {
                clearForm();
            } else if (userTemplates[selectedId]) {
                applyPreset(userTemplates[selectedId]);
            }
            renderPresetOptions();
        });

        // 枚数入力の同期
        if(elements.buttons.printCountH && elements.buttons.printCountF) {
            elements.buttons.printCountH.addEventListener('input', (e) => elements.buttons.printCountF.value = e.target.value);
            elements.buttons.printCountF.addEventListener('input', (e) => elements.buttons.printCountH.value = e.target.value);
        }

        // 印刷処理 (複数枚対応)
        const executePrint = () => {
            const count = parseInt(elements.buttons.printCountH.value) || 1;
            const originalLabel = document.getElementById('print-target');
            const spool = document.getElementById('print-spool');
            
            if (!originalLabel || !spool) return;

            // スプールを一度空にする
            spool.innerHTML = '';
            
            // 指定枚数だけラベルを複製してスプールに追加する
            for (let i = 0; i < count; i++) {
                const clone = originalLabel.cloneNode(true);
                clone.removeAttribute('id'); // ID重複を防ぐ
                clone.classList.add('spool-label');
                spool.appendChild(clone);
            }
            
            // 複製完了後に印刷ダイアログを呼び出す
            window.print();
        };

        elements.buttons.printBtns.forEach(btn => {
            if(btn) btn.addEventListener('click', executePrint);
        });
        
        // ==== 🎙️ 音声入力機能 (Web Speech API) ====
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const micBtns = document.querySelectorAll('.mic-btn');
            
            micBtns.forEach(btn => {
                let recognition = new SpeechRecognition();
                recognition.lang = 'ja-JP';
                recognition.interimResults = false;
                recognition.continuous = false;
                
                let isListening = false;

                const startListening = () => {
                    try {
                        recognition.start();
                        isListening = true;
                        btn.classList.add('listening');
                        if (!btn.dataset.originalText) {
                            btn.dataset.originalText = btn.innerHTML;
                        }
                        btn.innerHTML = '🔴 録音中...';
                    } catch(e) {
                        console.error('Speech recognition error', e);
                    }
                };

                const stopListening = () => {
                    if (!isListening) return;
                    try {
                        recognition.stop();
                    } catch(e) {}
                    isListening = false;
                    btn.classList.remove('listening');
                    if(btn.dataset.originalText) {
                        btn.innerHTML = btn.dataset.originalText;
                    }
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    const targetInput = document.getElementById(btn.dataset.target);
                    if (targetInput) {
                        if (targetInput.tagName.toLowerCase() === 'textarea') {
                            const currentVal = targetInput.value.trim();
                            if (currentVal && !currentVal.endsWith('、') && !currentVal.endsWith('。')) {
                                targetInput.value = currentVal + '、' + transcript;
                            } else {
                                targetInput.value = currentVal + transcript;
                            }
                        } else {
                            targetInput.value = transcript;   
                        }
                        targetInput.dispatchEvent(new Event('input'));
                    }
                };

                recognition.onend = () => {
                    stopListening();
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    stopListening();
                    if(event.error === 'not-allowed') {
                        alert('マイクが許可されていません。ブラウザのアドレスバー左側（鍵マーク）からマイクを許可してください。');
                    }
                };

                btn.addEventListener('click', () => {
                    if (isListening) {
                        stopListening();
                    } else {
                        document.querySelectorAll('.mic-btn.listening').forEach(b => b.click());
                        startListening();
                    }
                });
            });
        } else {
            document.querySelectorAll('.mic-btn').forEach(btn => btn.style.display = 'none');
        }

        // 💡 自動入力機能
        if(elements.buttons.autoFill) {
            elements.buttons.autoFill.addEventListener('click', () => {
                const name = elements.inputs.name.value.trim();
                if (!name) {
                    alert('まずは「名称」を入力してから自動入力ボタンを押してください。\n例: チキン南蛮弁当');
                    return;
                }

                let bestMatch = null;
                let maxScore = 0;

                // 1. まずはユーザー設定のカスタムテンプレートを評価
                const customPresets = userTemplates; // 修正点: getCustomPresets() ではなく userTemplates を直接参照
                for (let key in customPresets) {
                    const custom = customPresets[key];
                    if (!custom || !custom.name) continue; // 安全装置: 名前がない古いデータなどはスキップ

                    if (name === custom.name) {
                        bestMatch = custom;
                        maxScore = 1000; // 完全一致は最強スコア
                        break;
                    } else if (name.includes(custom.name) || custom.name.includes(name)) {
                        const score = Math.min(name.length, custom.name.length) * 10;
                        if (score > maxScore) {
                            maxScore = score;
                            bestMatch = custom;
                        }
                    }
                }

                // 2. カスタムで完全一致が見つかっていなければ、内蔵辞書をスコア評価
                if (maxScore < 1000) {
                    for (let item of bentoDictionary) {
                        for (let kw of item.keywords) {
                            if (name.includes(kw)) {
                                // より長いキーワードに合致したほうが「より具体的（精度が高い）」と判定
                                const score = kw.length * 10;
                                if (score > maxScore) {
                                    maxScore = score;
                                    bestMatch = item.data;
                                }
                            }
                        }
                    }
                }

                let match = bestMatch;

                if (match) {
                    elements.inputs.category.value = match.category || '弁当';
                    elements.inputs.ingredients.value = match.ingredients;
                    elements.inputs.consumeDays.value = match.consumeDays || '1';
                    elements.inputs.calories.value = match.calories;
                    elements.inputs.protein.value = match.protein;
                    elements.inputs.fat.value = match.fat;
                    elements.inputs.carb.value = match.carb;
                    elements.inputs.salt.value = match.salt;
                    if(match.price) elements.inputs.price.value = match.price;
                    if(match.useJancode !== undefined) {
                        elements.inputs.useJancode.checked = match.useJancode;
                        document.getElementById('jancode-wrapper').style.display = match.useJancode ? 'block' : 'none';
                        elements.inputs.jancodeValue.value = match.jancodeValue || '';
                    }
                    if(match.usePlaMark !== undefined) {
                        elements.inputs.usePlaMark.checked = match.usePlaMark;
                    }
                    if(match.storeMethod) {
                        elements.inputs.storeMethod.value = match.storeMethod;
                    } else {
                        elements.inputs.storeMethod.value = '直射日光及び高温多湿を避けて保存してください';
                    }
                    
                    if(window.syncRiceRadioFromText) {
                        window.syncRiceRadioFromText(match.ingredients);
                    }
                    
                    updatePreview();
                    alert(`「${name}」に近い一般的な目安データを自動入力しました！\n実際の具材に合わせて少し修正して保存してください。`);
                } else {
                    if (confirm(`「${name}」の目安データが見つかりませんでした。\nネットで検索しますか？`)) {
                        elements.buttons.searchWeb.click();
                    }
                }
            });
        }

        // 🔍 ネット検索機能
        if(elements.buttons.searchWeb) {
            elements.buttons.searchWeb.addEventListener('click', () => {
                const name = elements.inputs.name.value.trim();
                const query = name ? `${name} 栄養成分表示 100g` : 'お弁当 栄養成分表示 一覧';
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            });
        }

        const getCurrentTemplateData = () => {
            return {
                name: elements.inputs.name.value.trim(),
                category: elements.inputs.category.value,
                ingredients: elements.inputs.ingredients.value,
                consumeDays: elements.inputs.consumeDays.value,
                storeMethod: elements.inputs.storeMethod.value,
                calories: elements.inputs.calories.value,
                protein: elements.inputs.protein.value,
                fat: elements.inputs.fat.value,
                carb: elements.inputs.carb.value,
                salt: elements.inputs.salt.value,
                price: elements.inputs.price.value,
                useJancode: elements.inputs.useJancode.checked,
                jancodeValue: elements.inputs.jancodeValue.value,
                packagingMark: document.querySelector('input[name="packaging-mark"]:checked')?.value || 'プラ'
            };
        };

        // 💾 上書き保存
        if(elements.buttons.savePreset) {
            elements.buttons.savePreset.addEventListener('click', () => {
                const id = elements.inputs.preset.value;
                if (!id) {
                    alert('上書きする対象が選択されていません。新しく保存する場合は「新しく追加 (コピー)」ボタンを押してください。');
                    return;
                }
                const data = getCurrentTemplateData();
                if (!data.name) {
                    alert('お弁当の「名称」を入力してください。');
                    return;
                }
                userTemplates[id] = data;
                saveTemplates();
                renderPresetOptions();
                alert(`テンプレート「${data.name}」を上書き保存しました！`);
            });
        }
        
        // 📋 新しく追加 (コピー)
        if(elements.buttons.copyPreset) {
            elements.buttons.copyPreset.addEventListener('click', () => {
                const data = getCurrentTemplateData();
                if (!data.name) {
                    alert('お弁当の「名称」を入力してください。');
                    return;
                }
                
                // 完全同名のテンプレートが既にないかチェック（ダブり防止）
                for (let key in userTemplates) {
                    if (userTemplates[key].name === data.name) {
                        alert(`「${data.name}」という名前のテンプレートはすでに存在します！\n\n・内容を上書きしたい場合は、左隣の「💾 上書き保存」ボタンを押してください。\n・別バージョンとして新しく保存したい場合は、名前を少し変更（「${data.name}2」など）してからこのボタンを押してください。`);
                        return;
                    }
                }

                const id = 'tmpl_' + Date.now();
                userTemplates[id] = data;
                saveTemplates();
                elements.inputs.preset.value = id;
                renderPresetOptions();
                alert(`「${data.name}」を新しいテンプレートとして追加しました！`);
            });
        }

        // 🗑️ 削除
        if(elements.buttons.deletePreset) {
            elements.buttons.deletePreset.addEventListener('click', () => {
                const id = elements.inputs.preset.value;
                if (!id) return;
                const name = userTemplates[id]?.name || 'このテンプレート';
                if (confirm(`本当にテンプレート「${name}」を削除しますか？`)) {
                    delete userTemplates[id];
                    saveTemplates();
                    elements.inputs.preset.value = '';
                    elements.inputs.preset.dispatchEvent(new Event('change'));
                }
            });
        }
    };

    const formatIngredientsWithOrigin = (text) => {
        if (!text || text === '-' || text.trim() === '') return text;

        // 括弧のネストを考慮して、最初の「、」または「／」の位置を探す
        let splitIndex = -1;
        let depth = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '（' || char === '(') depth++;
            if (char === '）' || char === ')') depth--;

            if (depth === 0) {
                if (char === '、' || char === '／') {
                    splitIndex = i;
                    break;
                }
            }
        }

        const firstItemRaw = splitIndex === -1 ? text : text.substring(0, splitIndex);
        const firstItem = firstItemRaw.trim();
        
        if (!firstItem) return text;

        // すでに括弧が含まれている場合は、その項目自体には自動補完しない
        if (firstItem.includes('（') || firstItem.includes('(')) return text;

        // 生鮮材料キーワード (国産)
        const rawKeywords = ['肉', '魚', '米', '野菜', 'じゃがいも', '玉ねぎ', '人参', 'キャベツ', 'レタス', 'ブロッコリー', 'トマト', 'きゅうり', '卵', '海老', 'えび', 'イカ', 'いか', 'アサリ', '貝', '果'];
        // 加工品キーワード (国内製造)
        const processedKeywords = ['めん', '麺', 'パン', 'ソース', 'ルウ', 'マヨネーズ', 'ケチャップ', '醤油', 'しょうゆ', '味噌', 'みそ', '豆腐', '納豆', 'ハム', 'ベーコン', 'ソーセージ', 'ウインナー', 'ハンバーグ', 'カツ', 'フライ', '揚げ', 'コロッケ', '焼売', '餃子', '佃煮', 'パスタ', 'スパゲティ', 'マカロニ', 'うどん', 'そば', 'ちくわ', 'かまぼこ', 'こんにゃく', 'チーズ', '天かす', 'トルティーヤ', '皮'];

        let origin = '';
        const chickenKeywords = ['鶏肉', '鶏', '若鶏', 'チキン', '鶏むね', '鶏もも', 'とり肉'];
        
        if (chickenKeywords.some(kw => firstItem.includes(kw))) {
            origin = '（ブラジル産）';
        } else if (rawKeywords.some(kw => firstItem.includes(kw))) {
            origin = '（国産）';
        } else if (processedKeywords.some(kw => firstItem.includes(kw))) {
            origin = '（国内製造）';
        } else {
            origin = '（国産）';
        }

        return firstItem + origin + text.substring(firstItemRaw.length);
    };

    const updatePreview = () => {
        const nameVal = elements.inputs.name.value.trim() || '名称未設定';
        
        // 21文字を超える場合は切り捨て
        let displayName = nameVal;
        if (nameVal.length > 21) {
            displayName = nameVal.substring(0, 20) + '...';
        }
        elements.preview.name.textContent = displayName;
        
        // 名称の文字数に応じてフォントサイズを自動調整（一段に収めるため）
        if (displayName.length > 15) {
            elements.preview.name.style.fontSize = '8pt';
        } else if (displayName.length > 11) {
            elements.preview.name.style.fontSize = '9pt';
        } else {
            elements.preview.name.style.fontSize = '10.5pt';
        }

        elements.preview.category.textContent = elements.inputs.category.value || '惣菜';
        
        // 原材料名の表示時に産地補完を適用
        const rawIngredients = elements.inputs.ingredients.value || '-';
        elements.preview.ingredients.textContent = formatIngredientsWithOrigin(rawIngredients);
        
        const daysAdd = parseInt(elements.inputs.consumeDays.value) || 0;
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysAdd);
        const formattedDate = `${targetDate.getFullYear().toString().slice(-2)}.${String(targetDate.getMonth() + 1).padStart(2, '0')}.${String(targetDate.getDate()).padStart(2, '0')}`;
        
        elements.preview.consume.textContent = formattedDate;
        
        const hintEl = document.getElementById('calculated-date-hint');
        if (hintEl) {
            hintEl.textContent = `印字される日付: ${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
        }

        elements.preview.store.textContent = elements.inputs.storeMethod.value || '-';
        elements.preview.calories.textContent = elements.inputs.calories.value || '-';
        elements.preview.protein.textContent = elements.inputs.protein.value ? parseFloat(elements.inputs.protein.value).toFixed(1) : '-';
        elements.preview.fat.textContent = elements.inputs.fat.value ? parseFloat(elements.inputs.fat.value).toFixed(1) : '-';
        elements.preview.carb.textContent = elements.inputs.carb.value ? parseFloat(elements.inputs.carb.value).toFixed(1) : '-';
        elements.preview.salt.textContent = elements.inputs.salt.value ? parseFloat(elements.inputs.salt.value).toFixed(1) : '-';

        const price = parseInt(elements.inputs.price.value) || 0;
        elements.preview.priceTax.textContent = price > 0 ? price.toLocaleString() : '-';

        elements.preview.manufacturerTitle.textContent = elements.inputs.manufacturerTitle.value || '製造者';
        elements.preview.manufacturer.textContent = elements.inputs.manufacturer.value || '-';
        elements.preview.address.textContent = elements.inputs.address.value || '-';
        
        // 電話番号は製造者の場合かつ入力がある場合のみ表示
        const isManufacturer = elements.inputs.manufacturerTitle.value === '製造者';
        const phoneVal = elements.inputs.phone.value.trim();
        if (isManufacturer && phoneVal) {
            if(elements.preview.phoneContainer) elements.preview.phoneContainer.style.display = 'block';
            elements.preview.phone.textContent = phoneVal;
        } else {
            if(elements.preview.phoneContainer) elements.preview.phoneContainer.style.display = 'none';
        }

        // 第2の事業者情報
        const useSecond = elements.inputs.useSecondStore.checked;
        if (useSecond) {
            elements.preview.storeInfo2.style.display = 'block';
            elements.preview.manufacturerTitle2.textContent = elements.inputs.manufacturerTitle2.value || '製造者';
            elements.preview.manufacturer2.textContent = elements.inputs.manufacturer2.value || '-';
            elements.preview.address2.textContent = elements.inputs.address2.value || '-';
            
            const isManufacturer2 = elements.inputs.manufacturerTitle2.value === '製造者' || elements.inputs.manufacturerTitle2.value === '製造所';
            const phoneVal2 = elements.inputs.phone2.value.trim();
            if (isManufacturer2 && phoneVal2) {
                if(elements.preview.phoneContainer2) elements.preview.phoneContainer2.style.display = 'block';
                elements.preview.phone2.textContent = phoneVal2;
            } else {
                if(elements.preview.phoneContainer2) elements.preview.phoneContainer2.style.display = 'none';
            }
        } else {
            elements.preview.storeInfo2.style.display = 'none';
        }

        // リサイクルマーク表示
        const packMarkChecked = document.querySelector('input[name="packaging-mark"]:checked');
        const packMarkVal = packMarkChecked ? packMarkChecked.value : 'プラ';
        if (elements.preview.packagingMark) {
            if (packMarkVal === 'なし') {
                elements.preview.packagingMark.style.display = 'none';
            } else {
                elements.preview.packagingMark.style.display = 'inline-flex';
                
                // 本物に近いリサイクルマークのSVG描画
                const svgPla = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M25,14 h50 a11,11 0 0 1 11,11 v20" stroke="#000" stroke-width="4.5" fill="none" /><polygon points="86,40 100,56 72,56" fill="#000" /><path d="M75,86 h-50 a11,11 0 0 1 -11,-11 v-20" stroke="#000" stroke-width="4.5" fill="none" /><polygon points="14,60 0,44 28,44" fill="#000" /><text x="50" y="65" font-family="'MS PGothic', 'Noto Sans JP', sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="#000">プラ</text></svg>`;
                const svgKami = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15,20 h70 a10,10 0 0 1 10,10 v40 a10,10 0 0 1 -10,10 h-70 a10,10 0 0 1 -10,-10 v-40 a10,10 0 0 1 10,-10Z" stroke="#000" stroke-width="5" fill="none" /><text x="50" y="66" font-family="'MS PGothic', 'Noto Sans JP', sans-serif" font-size="42" font-weight="900" text-anchor="middle" fill="#000">紙</text></svg>`;

                if (packMarkVal === '紙') {
                    elements.preview.packagingMark.innerHTML = svgKami;
                } else {
                    elements.preview.packagingMark.innerHTML = svgPla;
                }
                elements.preview.packagingMark.setAttribute('data-type', packMarkVal);
            }
        }

        // バーコード生成
        if (elements.inputs.useJancode.checked) {
            elements.preview.barcodeContainer.style.display = 'block';
            try {
                const val = elements.inputs.jancodeValue.value.trim() || '4900000000000';
                // 13桁の場合はEAN13として処理、それ以外はCODE128でフォールバック
                const format = (val.length === 13 && /^\d+$/.test(val)) ? "EAN13" : "CODE128";
                JsBarcode(elements.preview.barcodeSvg, val, {
                    format: format,
                    width: 1.3,
                    height: 20, /* さらにコンパクトにする */
                    displayValue: true,
                    fontSize: 10,
                    margin: 0
                });
            } catch (err) {
                console.error("Barcode generation error", err);
            }
        } else {
            elements.preview.barcodeContainer.style.display = 'none';
        }
    };

    const applyPreset = (data) => {
        elements.inputs.name.value = data.name || '';
        elements.inputs.category.value = data.category || '弁当';
        userManuallyChangedCategory = false; // テンプレート切り替え時は推測リセット
        elements.inputs.ingredients.value = data.ingredients || '';
        if(window.syncRiceRadioFromText) window.syncRiceRadioFromText(elements.inputs.ingredients.value);
        elements.inputs.consumeDays.value = data.consumeDays || '1';
        elements.inputs.calories.value = data.calories || '';
        elements.inputs.protein.value = data.protein || '';
        elements.inputs.fat.value = data.fat || '';
        elements.inputs.carb.value = data.carb || '';
        elements.inputs.salt.value = data.salt || '';
        elements.inputs.price.value = data.price || '';
        
        let targetPackagingMark = data.packagingMark;
        if (targetPackagingMark === undefined) {
             targetPackagingMark = data.usePlaMark !== false ? 'プラ' : 'なし';
        }
        const pR = document.querySelector(`input[name="packaging-mark"][value="${targetPackagingMark}"]`);
        if(pR) pR.checked = true;

        elements.inputs.useJancode.checked = data.useJancode || false;
        document.getElementById('jancode-wrapper').style.display = elements.inputs.useJancode.checked ? 'block' : 'none';
        elements.inputs.jancodeValue.value = data.jancodeValue || '';
        updatePreview();
    };

    const clearForm = () => {
        elements.inputs.name.value = '';
        elements.inputs.category.value = '弁当';
        userManuallyChangedCategory = false; // クリア時は推測リセット
        elements.inputs.ingredients.value = '';
        if(window.syncRiceRadioFromText) window.syncRiceRadioFromText('');
        elements.inputs.consumeDays.value = 1;
        elements.inputs.storeMethod.value = '直射日光及び高温多湿を避けて保存してください';
        elements.inputs.calories.value = '';
        elements.inputs.protein.value = '';
        elements.inputs.fat.value = '';
        elements.inputs.carb.value = '';
        elements.inputs.salt.value = '';
        elements.inputs.price.value = '';
        elements.inputs.useJancode.checked = false;
        elements.inputs.jancodeValue.value = '';
        const defaultPack = document.querySelector(`input[name="packaging-mark"][value="プラ"]`);
        if (defaultPack) defaultPack.checked = true;
        document.getElementById('jancode-wrapper').style.display = 'none';
        updatePreview();
    };

    init();
});
