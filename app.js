const ASSESSMENTS = [
  {
    id: "dog-fetch",
    shortTitle: "狗心臟病 FETCH",
    navTitle: "狗心臟病生活品質",
    navRef: "FETCH",
    title: "狗心臟病健康相關生活品質 (FETCH) 評估",
    subtitle: "心臟病對過去 7 天生活品質影響程度",
    intro:
      "請回想在過去 7 天內，下列情況對狗狗造成的影響程度。0 分代表完全沒有，5 分代表影響極大；若不適用或確信與心臟病無關，請選 0 分。",
    direction: "lower",
    totalLabel: "影響總分",
    qualityLabel: "生活品質指標",
    scale: {
      min: 0,
      max: 5,
      labels: {
        0: "完全沒有",
        1: "極少影響",
        2: "輕度影響",
        3: "中度影響",
        4: "重度影響",
        5: "影響極大",
      },
    },
    categories: [
      {
        name: "呼吸與心肺",
        english: "Respiratory",
        items: [
          "導致呼吸困難？",
          "導致咳嗽？",
          "導致呼吸時發出喘鳴音或雜音？",
          "出現暈厥或突然倒下的情況？",
        ],
      },
      {
        name: "活動與體力",
        english: "Mobility",
        items: [
          "導致整體感到疲倦、無力或缺乏活力？",
          "日常娛樂困難 (或因限制運動無法進行喜歡活動)？",
          "四處走動或散步感到困難？",
          "爬樓梯感到困難？",
        ],
      },
      {
        name: "睡眠與舒適",
        english: "Comfort",
        items: ["難以找到舒適的姿勢休息？", "難以安穩地睡一整晚？"],
      },
      {
        name: "消化與排泄",
        english: "Digestion",
        items: [
          "導致進食量比平常少？",
          "改變願意吃的食物種類（挑食）？",
          "導致嘔吐？",
          "增加在家中排尿意外（漏尿/亂尿）的次數？",
        ],
      },
      {
        name: "行為與社交",
        english: "Behavior",
        items: [
          "限制與家人相處的時間（如無法上樓或上沙發等）？",
          "變得易怒或不願意被觸碰？",
          "表現出精神沉鬱或對周遭事物失去興趣？",
        ],
      },
    ],
    overall: {
      title: "總體生活品質評估",
      prompt:
        "綜合考量以上所有狀況，請選擇您認為目前狗狗的整體生活品質狀態。",
      min: 1,
      max: 10,
      low: "非常差",
      high: "非常好",
    },
    notesPrompt: "若有其他影響生活品質的特定情況，可寫在這裡。",
    source:
      "資料來源：Freeman LM, Rush JE, Farabaugh AE, Must A. Development and evaluation of a questionnaire for assessing health-related quality of life in dogs with cardiac disease. J Am Vet Med Assoc. 2005. PMID: 15934254 | FETCH Questionnaire",
  },
  {
    id: "dog-hrql",
    shortTitle: "狗 HRQL",
    navTitle: "狗整體健康生活品質",
    navRef: "VetMetrica HRQL",
    title: "狗健康相關生活品質 (HRQL) 評估",
    subtitle: "四維度行為特徵量表 (VetMetrica 框架)",
    intro:
      "請根據您對狗狗目前行為與狀態的觀察，選擇最合適的分數。一般項目 0 分代表完全不符合，6 分代表完全符合；反向題以 0 分代表負面狀態明顯，6 分代表負面狀態不明顯。",
    direction: "higher",
    totalLabel: "HRQL 總分",
    qualityLabel: "生活品質指標",
    scale: {
      min: 0,
      max: 6,
      labels: {
        0: "完全不符合",
        1: "極少符合",
        2: "稍微符合",
        3: "中等符合",
        4: "多半符合",
        5: "高度符合",
        6: "完全符合",
      },
    },
    categories: [
      {
        name: "活力與熱情",
        english: "Energetic / Enthusiastic",
        items: [
          "充滿活力 (Energetic)",
          "表現熱情 (Enthusiastic)",
          "活潑好動 (Lively)",
          "精神飽滿 (Vigorous)",
          { text: "顯得疲憊/無精打采", reverse: true },
        ],
      },
      {
        name: "快樂與滿足",
        english: "Happy / Content",
        items: [
          "感到快樂 (Happy)",
          "顯得滿足 (Content)",
          "表現出愉悅的心情 (Cheerful)",
          "享受與人或其他動物互動",
          "對日常喜愛的事物感興趣",
          { text: "顯得沮喪/憂鬱", reverse: true },
        ],
      },
      {
        name: "活動與舒適",
        english: "Active / Comfortable",
        items: [
          "活躍/願意活動 (Active)",
          "身體感覺舒適 (Comfortable)",
          "行動自如/敏捷 (Agile)",
          "願意散步或出門運動",
          { text: "表現出疼痛或僵硬", reverse: true },
          "休息時顯得安穩",
        ],
      },
      {
        name: "平靜與放鬆",
        english: "Calm / Relaxed",
        items: [
          "保持平靜 (Calm)",
          "狀態放鬆 (Relaxed)",
          "情緒穩定 (Stable)",
          "容易安撫或平復情緒",
          { text: "容易受驚、焦慮或不安", reverse: true },
        ],
      },
    ],
    notesPrompt: "可記錄近期特殊狀況，例如疼痛、食慾、睡眠或藥物調整。",
    source:
      "資料來源與框架參考：Davies V, Reid J, Wiseman-Orr ML, Scott EM. Optimising outputs from a validated online instrument to measure health-related quality of life (HRQL) in dogs. PLOS ONE. 2019. PMID: 31532799 | 本表單依四維度 22 題框架改編為臨床追蹤工具。",
  },
  {
    id: "cat-qol",
    shortTitle: "貓咪高齡安寧 QOL",
    navTitle: "貓高齡/安寧照護",
    navRef: "AAFP 2021/2023",
    title: "貓咪高齡與安寧照護 (QOL) 評估",
    subtitle: "依據 2023 AAFP 安寧緩和與 2021 高齡照護指南設計",
    intro:
      "請根據您對貓咪過去一週內的觀察選擇分數。一般項目 0 分代表完全不符合，6 分代表完全符合；負向題以 0 分代表負面狀態明顯，6 分代表負面狀態不明顯。",
    direction: "higher",
    totalLabel: "QOL 總分",
    qualityLabel: "生活品質指標",
    scale: {
      min: 0,
      max: 6,
      labels: {
        0: "完全不符合",
        1: "極少符合",
        2: "稍微符合",
        3: "中等符合",
        4: "多半符合",
        5: "高度符合",
        6: "完全符合",
      },
    },
    categories: [
      {
        name: "疼痛與活動力",
        english: "Pain & Mobility",
        items: [
          "能夠輕鬆跳上或跳下原本喜歡的高處。",
          "休息時姿勢放鬆 (無緊繃的「母雞蹲」姿態)。",
          { text: "表現出步態僵硬、跛行或不願意移動。", reverse: true },
          { text: "觸碰身體特定部位時會生氣、低吼或閃躲。", reverse: true },
        ],
      },
      {
        name: "食慾與水分",
        english: "Nutrition & Hydration",
        items: [
          "主動進食，維持對喜愛食物的期待與興趣。",
          { text: "聞到食物卻撇頭、舔唇等噁心跡象。", reverse: true },
          "飲水量正常，無極度口渴或拒絕喝水跡象。",
          "體態穩定，無明顯體重急遽下降或肌肉流失。",
        ],
      },
      {
        name: "衛生與砂盆",
        english: "Hygiene & Litter Box",
        items: [
          "能夠自行清理毛髮，毛皮乾淨不打結。",
          "確實使用貓砂盆，無隨地便溺狀況。",
          { text: "進出砂盆或排泄時顯得困難、猶豫或嚎叫。", reverse: true },
          { text: "身上帶有未清理的排泄物異味或尿味。", reverse: true },
        ],
      },
      {
        name: "社交與情緒",
        english: "Social & Emotional",
        items: [
          "享受與家人的日常互動、陪伴或撫摸。",
          { text: "表現出焦慮、易怒或對家人/同伴具攻擊性。", reverse: true },
          { text: "長時間躲藏在床底或角落，不願意見人。", reverse: true },
          "對周圍事物或喜歡的玩具仍會表現好奇心。",
        ],
      },
      {
        name: "認知與行為",
        english: "Cognition & Sleep",
        items: [
          { text: "在熟悉環境中顯得迷失方向或卡在角落。", reverse: true },
          { text: "睡眠週期改變，或半夜無故大聲嚎叫。", reverse: true },
          "睡眠品質良好，能安穩休息。",
        ],
      },
    ],
    overall: {
      title: "綜合健康評估 (好日子 vs. 壞日子)",
      prompt:
        "綜合考量以上指標，您認為近期貓咪的好日子是否多於壞日子？請給予整體評分。",
      min: 1,
      max: 10,
      low: "非常差",
      high: "非常好",
    },
    notesPrompt: "可記錄近期特殊狀況，例如疼痛、食慾、排泄、睡眠或行為改變。",
    source:
      "資料來源與框架參考：Quimby et al. 2023 AAFP/IAAHPC Feline Hospice and Palliative Care Guidelines. JFMS. 2023. PMID: 37768060；Ray et al. 2021 AAFP Feline Senior Care Guidelines. JFMS. 2021. PMID: 34167339。",
  },
  {
    id: "cancer-qol",
    shortTitle: "癌症動物 HRQoL",
    navTitle: "癌症犬貓生活品質",
    navRef: "Lynch 2010 HRQoL",
    title: "癌症動物健康相關生活品質 (HRQoL) 評估",
    subtitle: "犬貓癌症照護生活品質追蹤",
    intro:
      "請根據目前對寵物的觀察，在下列問題中選擇最符合的分數。1 分代表完全不同意，5 分代表完全同意；總分越高，代表填答顯示的生活品質越好。",
    direction: "higher",
    totalLabel: "HRQoL 總分",
    qualityLabel: "生活品質指標",
    scale: {
      min: 1,
      max: 5,
      labels: {
        1: "完全不同意",
        2: "不太同意",
        3: "中立",
        4: "有點同意",
        5: "完全同意",
      },
    },
    categories: [
      {
        name: "1. 幸福感",
        english: "Happiness",
        items: [
          "我的寵物看起來快樂。",
          "我的寵物會與我互動或要求陪伴。",
          "我的寵物享受日常生活中的活動(例如散步、玩耍)。",
        ],
      },
      {
        name: "2. 精神狀態 *",
        english: "Mental Status",
        items: [
          "我的寵物保持清醒、警覺。",
          "我的寵物表現出興趣(例如對食物、玩具、家人)。",
          "我的寵物對外界刺激(例如聲音、環境)有反應。",
        ],
      },
      {
        name: "3. 疼痛狀況",
        english: "Pain",
        items: [
          "我的寵物沒有表現出疼痛的跡象(如顫抖、鳴叫等)。",
          "我的寵物能正常活動而不顯得痛苦。",
          "我的寵物在休息時看起來舒適。",
        ],
      },
      {
        name: "4. 食慾",
        english: "Appetite",
        items: [
          "我的寵物正常進食，沒有挑食。",
          "我的寵物的食慾與之前一致。",
          "我的寵物在進食時表現出興趣。",
        ],
      },
      {
        name: "5. 衛生狀況",
        english: "Hygiene",
        items: [
          "我的寵物的毛髮和皮膚乾淨且健康。",
          "我的寵物沒有異味(例如尿味)。",
          "我的寵物能自行整理毛髮或清潔身體。",
        ],
      },
      {
        name: "6. 水分攝取",
        english: "Hydration",
        items: [
          "我的寵物飲水量正常。",
          "我的寵物沒有表現出脫水的跡象(如眼窩凹陷)。",
          "我的寵物能輕鬆飲水。",
        ],
      },
      {
        name: "7. 活動力",
        english: "Mobility",
        items: [
          "我的寵物能夠正常行走或跑動。",
          "我的寵物可以輕鬆地躺下或站起。",
          "我的寵物可以跳上沙發或爬樓梯。",
        ],
      },
      {
        name: "8. 整體健康",
        english: "General Health",
        items: [
          "我的寵物的健康狀況維持穩定。",
          "我的寵物沒有新出現的健康問題。",
          "我的寵物看起來精力充沛。",
        ],
      },
    ],
    overall: {
      title: "整體健康評分 (綜合健康評估)",
      prompt: "請選擇您認為目前寵物的整體健康狀態。",
      min: 1,
      max: 10,
      low: "非常差",
      high: "非常好",
    },
    notesPrompt: "若有其他症狀或情況需要說明，可寫在這裡。",
    source:
      "資料來源：Lynch S, Savary-Bataille K, Leeuw B, Argyle DJ. Development of a questionnaire assessing health-related quality-of-life in dogs and cats with cancer. Veterinary and Comparative Oncology. First published 10 September 2010. https://doi.org/10.1111/j.1476-5829.2010.00244.x",
  },
  {
    id: "dog-ccdr",
    shortTitle: "犬認知 CCDR",
    navTitle: "犬認知功能篩檢",
    navRef: "CCDR",
    title: "犬認知功能障礙評分表 (CCDR)",
    subtitle: "13 題，適合 CDS 初步篩檢與近 6 個月變化追蹤",
    intro:
      "請依照狗狗目前狀況與近 6 個月變化選擇最接近的描述。此量表用於整理疑似認知功能障礙相關表現，不能單獨診斷 CDS。",
    direction: "lower",
    totalLabel: "CCDR 總分",
    qualityLabel: "認知穩定指標",
    scale: {
      min: 1,
      max: 5,
      labels: {
        1: "從不 / 明顯減少",
        2: "偶爾 / 稍微減少",
        3: "有時 / 沒有改變",
        4: "經常 / 稍微增加",
        5: "非常頻繁 / 明顯增加",
      },
    },
    scaleGuides: [
      {
        title: "第 1-6 題：目前行為頻率",
        labels: {
          1: "從不",
          2: "每月一次",
          3: "每週一次",
          4: "每天一次",
          5: "每天超過一次",
        },
      },
      {
        title: "第 7 題：找食物能力",
        labels: {
          1: "沒有困難，每次都找得到",
          2: "偶爾困難",
          3: "有時困難",
          4: "多數時候困難",
          5: "幾乎每次都找不到",
        },
      },
      {
        title: "第 8-12 題：與 6 個月前相比",
        labels: {
          1: "明顯減少",
          2: "稍微減少",
          3: "沒有改變",
          4: "稍微增加",
          5: "明顯增加",
        },
      },
      {
        title: "第 13 題：活動量變化",
        labels: {
          1: "明顯增加",
          2: "稍微增加",
          3: "沒有改變",
          4: "稍微減少",
          5: "明顯減少",
        },
      },
    ],
    categories: [
      {
        name: "目前行為頻率",
        english: "Current behavior frequency",
        scale: {
          min: 1,
          max: 5,
          labels: {
            1: "從不",
            2: "每月一次",
            3: "每週一次",
            4: "每天一次",
            5: "每天超過一次",
          },
        },
        items: [
          "是否會無目的地來回走動、繞圈，或漫無方向地徘徊？",
          "是否會盯著牆壁或地板發呆？",
          "是否會卡在物品後方，卻不知道如何繞出來？",
          "是否會認不出熟悉的人或寵物？",
          "是否會撞到牆壁或門？",
          "被撫摸時，是否會走開，或刻意避免被摸？",
        ],
      },
      {
        name: "找食物能力",
        english: "Food-finding ability",
        scale: {
          min: 1,
          max: 5,
          labels: {
            1: "沒有困難，每次都找得到",
            2: "偶爾困難",
            3: "有時困難",
            4: "多數時候困難",
            5: "幾乎每次都找不到",
          },
        },
        items: ["是否變得不容易找到掉在地上的食物？"],
      },
      {
        name: "與 6 個月前相比",
        english: "Compared with 6 months ago",
        scale: {
          min: 1,
          max: 5,
          labels: {
            1: "明顯減少",
            2: "稍微減少",
            3: "沒有改變",
            4: "稍微增加",
            5: "明顯增加",
          },
        },
        items: [
          "與 6 個月前相比，是否更常無目的地來回走動、繞圈或徘徊？",
          "與 6 個月前相比，是否更常盯著牆壁或地板發呆？",
          "與 6 個月前相比，是否更常在原本會保持乾淨的地方尿尿或排便？",
          { text: "與 6 個月前相比，是否更難找到掉在地上的食物？", weight: 2 },
          { text: "與 6 個月前相比，是否更常認不出熟悉的人或寵物？", weight: 3 },
        ],
      },
      {
        name: "活動量變化",
        english: "Activity change",
        scale: {
          min: 1,
          max: 5,
          labels: {
            1: "明顯增加",
            2: "稍微增加",
            3: "沒有改變",
            4: "稍微減少",
            5: "明顯減少",
          },
        },
        items: ["與 6 個月前相比，活動量是否下降？"],
      },
    ],
    interpretationRanges: [
      {
        max: 39,
        rangeLabel: "<40",
        label: "通常正常範圍",
        text: "通常正常範圍；若家長仍觀察到明顯變化，建議持續追蹤並排除其他疾病。",
      },
      {
        min: 40,
        max: 49,
        rangeLabel: "40-49",
        label: "風險區，建議追蹤",
        text: "落在風險區，建議追蹤變化，並與獸醫師討論是否需要進一步評估。",
      },
      {
        min: 50,
        rangeLabel: ">=50",
        label: "高度懷疑 CCD / CDS",
        text: "高度懷疑 CCD / CDS，建議整理結果並安排獸醫師進一步評估與鑑別診斷。",
      },
    ],
    notesPrompt:
      "可記錄疼痛、視力/聽力退化、泌尿道、內分泌、神經疾病、藥物或環境改變等可能影響認知表現的因素。",
    source:
      "資料來源：Salvin HE, McGreevy PD, Sachdev PS, Valenzuela MJ. The canine cognitive dysfunction rating scale (CCDR): A data-driven and ecologically relevant assessment tool. The Veterinary Journal. 2011;188(3):331-336. https://doi.org/10.1016/j.tvjl.2010.05.014；本頁依使用者提供之家長勾選版 CCDR/CADES PDF 與原始 CCDR 架構整理為互動化追蹤工具。",
  },
  {
    id: "dog-cades",
    shortTitle: "犬認知 CADES",
    navTitle: "犬認知退化分期",
    navRef: "CADES",
    title: "犬認知退化分期評分表 (CADES)",
    subtitle: "17 題，4 大面向，適合 CDS 嚴重度分期與長期追蹤",
    intro:
      "請依照過去 6 個月內觀察到的頻率選擇分數。此量表較適合分期與追蹤，仍需搭配獸醫師評估與其他老年疾病鑑別。",
    direction: "lower",
    totalLabel: "CADES 總分",
    qualityLabel: "認知穩定指標",
    scale: {
      min: 0,
      max: 5,
      values: [0, 2, 3, 4, 5],
      labels: {
        0: "從未觀察到",
        2: "過去 6 個月內至少 1 次",
        3: "每月至少 1 次",
        4: "每月 2-4 次",
        5: "每週數次",
      },
    },
    categories: [
      {
        name: "空間定向",
        english: "Spatial orientation",
        items: [
          "在熟悉環境中迷失方向，例如家中或熟悉戶外環境。",
          "無法辨認熟悉的人或動物。",
          "對熟悉物品出現異常反應，例如椅子、垃圾桶等。",
          "白天無目的遊走，或顯得坐立不安。",
          "原本已學會的任務能力下降。",
        ],
      },
      {
        name: "社交互動",
        english: "Social interaction",
        items: [
          "與人或其他狗的互動改變，例如玩耍、被撫摸、迎接家人等。",
          "個體行為改變，例如探索、玩耍或日常表現下降。",
          "對指令的反應或學習新任務的能力下降。",
          "易怒或焦慮增加。",
          "出現攻擊行為。",
        ],
      },
      {
        name: "睡眠 - 覺醒",
        english: "Sleep-wake cycle",
        items: [
          { text: "夜間異常活動，例如徘徊、發聲、坐立不安。", weight: 2 },
          { text: "睡眠型態明顯改變，例如失眠與過度嗜睡之間轉換。", weight: 2 },
        ],
      },
      {
        name: "排泄習慣",
        english: "House soiling",
        items: [
          "在家中隨機位置排泄。",
          "在籠內或睡覺區排泄。",
          "表達想排泄的訊號改變。",
          "剛外出散步回來後，仍在室內排泄。",
          "在不尋常的位置排泄，例如原本不會選擇的草地、水泥地等。",
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 0,
        max: 7,
        rangeLabel: "0-7",
        label: "正常老化",
        text: "分數落在正常老化範圍；建議保留本次結果作為後續追蹤基準。",
      },
      {
        min: 8,
        max: 23,
        rangeLabel: "8-23",
        label: "輕度",
        text: "分數符合輕度認知退化區間，建議追蹤頻率與生活作息變化。",
      },
      {
        min: 24,
        max: 44,
        rangeLabel: "24-44",
        label: "中度",
        text: "分數符合中度認知退化區間，建議與獸醫師討論鑑別診斷與照護策略。",
      },
      {
        min: 45,
        max: 95,
        rangeLabel: "45-95",
        label: "重度",
        text: "分數符合重度認知退化區間，建議安排完整評估並討論生活品質與照護需求。",
      },
    ],
    notesPrompt:
      "可記錄夜間不安、迷失方向、亂尿亂便、互動改變，以及疼痛、視聽力、血壓、內分泌、腎肝、泌尿、神經或藥物因素。",
    source:
      "資料來源：Madari A, Farbakova J, Katina S, Smolek T, Novak P, Weissova T, Novak M, Zilka N. Assessment of severity and progression of canine cognitive dysfunction syndrome using the CAnine DEmentia Scale (CADES). Applied Animal Behaviour Science. 2015;171:138-145. https://doi.org/10.1016/j.applanim.2015.08.034；本頁依使用者提供之家長勾選版 CCDR/CADES PDF 與原始 CADES 架構整理為互動化追蹤工具。",
  },
];

const STORAGE_KEY = "gaze-pet-qol-state-v1";
const PRODUCTION_ORIGIN = "https://pet-qol-assessment.vercel.app";
const app = document.querySelector("#app");
const assessmentById = new Map(ASSESSMENTS.map((assessment) => [assessment.id, assessment]));
let panelStatus = "";
let panelStatusKind = "success";
let lastQrTrigger = null;
let lastSubmissionTrigger = null;
let uploadInProgress = false;

const state = loadState();
state.activeId = getInitialAssessmentId();

window.addEventListener("popstate", () => {
  state.activeId = getInitialAssessmentId();
  render();
});

app.addEventListener("click", async (event) => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    event.preventDefault();
    setActiveAssessment(routeLink.dataset.route);
    return;
  }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (!action) return;

  if (action === "print") {
    window.print();
  }

  if (action === "reset") {
    const active = getActiveAssessment();
    if (window.confirm(`確定要清除「${active.shortTitle}」目前填寫內容嗎？`)) {
      clearActiveAssessment();
    }
  }

  if (action === "copy-summary") {
    await copyText(buildSummaryText());
  }

  if (action === "copy-link") {
    await copyText(window.location.href);
  }

  if (action === "open-qr-modal") {
    lastQrTrigger = event.target.closest("[data-action]");
    openQrModal(lastQrTrigger.dataset.qrUrl, lastQrTrigger.dataset.qrTitle);
  }

  if (action === "upload-firebase") {
    lastSubmissionTrigger = event.target.closest("[data-action]");
    await uploadActiveRecord();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-modal-action='close-qr']")) {
    closeQrModal();
  }

  if (event.target.closest("[data-modal-action='close-submission']")) {
    closeSubmissionModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (document.querySelector(".submission-modal")) {
    closeSubmissionModal();
    return;
  }
  closeQrModal();
});

app.addEventListener("change", (event) => {
  const target = event.target;
  if (target.matches("[data-answer]")) {
    const assessmentId = target.dataset.assessment;
    const itemId = target.dataset.item;
    ensureAssessmentState(assessmentId);
    state.answers[assessmentId][itemId] = Number(target.value);
    saveState();
    renderScorePanel();
    renderProgress();
  }

  if (target.matches("[data-overall]")) {
    const assessmentId = target.dataset.assessment;
    state.overall[assessmentId] = Number(target.value);
    saveState();
    renderScorePanel();
  }

  if (target.matches("[data-meta-check]")) {
    const assessmentId = target.dataset.assessment;
    ensureMetaState(assessmentId);
    state.meta[assessmentId][target.dataset.metaCheck] = target.checked;
    saveState();
    if (target.dataset.metaCheck === "externalUser") {
      syncPatientDigitsRequirement(assessmentId);
    }
  }
});

app.addEventListener("input", (event) => {
  const target = event.target;
  const assessmentId = target.dataset.assessment;
  if (!assessmentId) return;

  if (target.matches("[data-notes]")) {
    state.notes[assessmentId] = target.value;
    saveState();
  }

  if (target.matches("[data-meta]")) {
    ensureMetaState(assessmentId);
    if (target.dataset.meta === "patientDigits") {
      target.value = normalizePatientDigits(target.value);
    }
    state.meta[assessmentId][target.dataset.meta] = target.value;
    saveState();
  }
});

render();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      activeId: ASSESSMENTS[0].id,
      answers: saved.answers || {},
      notes: saved.notes || {},
      meta: saved.meta || {},
      overall: saved.overall || {},
    };
  } catch {
    return {
      activeId: ASSESSMENTS[0].id,
      answers: {},
      notes: {},
      meta: {},
      overall: {},
    };
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      answers: state.answers,
      notes: state.notes,
      meta: state.meta,
      overall: state.overall,
    })
  );
}

function getInitialAssessmentId() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (assessmentById.has(path)) return path;
  return state.activeId && assessmentById.has(state.activeId)
    ? state.activeId
    : ASSESSMENTS[0].id;
}

function getActiveAssessment() {
  return assessmentById.get(state.activeId) || ASSESSMENTS[0];
}

function setActiveAssessment(id) {
  if (!assessmentById.has(id)) return;
  state.activeId = id;
  const nextPath = `/${id}`;
  if (window.location.pathname !== nextPath) {
    history.pushState({}, "", nextPath);
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function ensureAssessmentState(assessmentId) {
  if (!state.answers[assessmentId]) state.answers[assessmentId] = {};
}

function ensureMetaState(assessmentId) {
  if (!state.meta[assessmentId]) state.meta[assessmentId] = {};
}

function clearActiveAssessment() {
  const id = state.activeId;
  delete state.answers[id];
  delete state.notes[id];
  delete state.meta[id];
  delete state.overall[id];
  saveState();
  render();
}

function render() {
  const active = getActiveAssessment();
  document.title = `${active.shortTitle} | 犬貓生活品質評估`;
  ensureAssessmentState(active.id);
  ensureMetaState(active.id);

  app.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <img class="brand-art" src="/assets/pet-qol-illustration.png" alt="" />
        <div>
          <h1 class="site-title">犬貓生活品質評估</h1>
          <p class="site-subtitle">請依照獸醫師建議選擇適合的量表填寫，結果可作為居家觀察、追蹤變化與回診討論的參考。</p>
        </div>
      </div>
    </header>
    <div class="tabs-wrap">
      <nav class="tabs" aria-label="量表選擇">
        ${ASSESSMENTS.map(
          (assessment) => `
            <a class="tab-link" href="/${assessment.id}" data-route="${assessment.id}" title="${escapeAttribute(
            `${assessment.navTitle} (${assessment.navRef})`
          )}" ${
            assessment.id === active.id ? 'aria-current="page"' : ""
          }>
              <span class="tab-title">${escapeHtml(assessment.navTitle)}</span>
              <span class="tab-ref">${escapeHtml(assessment.navRef)}</span>
            </a>
          `
        ).join("")}
      </nav>
    </div>
    <div class="layout">
      <main class="assessment-main">
        ${renderAssessment(active)}
      </main>
      <aside class="score-panel" id="score-panel" aria-live="polite"></aside>
    </div>
  `;

  renderScorePanel();
  renderProgress();
}

function renderAssessment(assessment) {
  const meta = state.meta[assessment.id] || {};
  const today = new Date().toISOString().slice(0, 10);
  const patientDigitsRequired = !meta.externalUser;
  const scaleGuideHtml = renderScaleGuide(assessment);
  return `
    <section class="assessment-head" aria-labelledby="assessment-title">
      <h2 id="assessment-title" class="assessment-title">${escapeHtml(assessment.title)}</h2>
      <p class="assessment-subtitle">${escapeHtml(assessment.subtitle)}</p>
      <p class="intro">${escapeHtml(assessment.intro)}</p>
      <p class="notice">此工具用於居家觀察、追蹤與就診討論，不取代獸醫師診斷或治療建議。資料會先保存在目前裝置的瀏覽器；只有按下「上傳紀錄」時，才會送到凝視犬貓專科醫院的紀錄系統。</p>
      ${renderQrShareBlock(assessment)}
      ${scaleGuideHtml ? `<div class="scale-guide" aria-label="分數說明">${scaleGuideHtml}</div>` : ""}
      <div class="meta-grid">
        <label class="field-label">
          <span>寵物姓名或代號 <span class="required-mark">必填</span></span>
          <input class="text-field" type="text" data-meta="petName" data-assessment="${assessment.id}" value="${escapeAttribute(
            meta.petName || ""
          )}" placeholder="請填寫寵物姓名或代號" required aria-required="true" />
        </label>
        <label class="field-label">
          <span>
            四院共用病歷號碼後五碼
            <span class="required-mark ${patientDigitsRequired ? "" : "conditional-mark"}" data-patient-required-label="${assessment.id}">
              ${patientDigitsRequired ? "必填" : "非四院可免填"}
            </span>
          </span>
          <span class="patient-input-wrap">
            <span class="patient-prefix" aria-hidden="true">PT0</span>
            <input
              class="text-field patient-digits"
              type="text"
              inputmode="numeric"
              autocomplete="off"
              maxlength="5"
              pattern="[0-9]{5}"
              data-meta="patientDigits"
              data-assessment="${assessment.id}"
              value="${escapeAttribute(meta.patientDigits || "")}"
              placeholder="12345"
              aria-label="四院共用病歷號碼後五碼"
              title="請輸入 5 碼數字"
              ${patientDigitsRequired ? 'required aria-required="true"' : 'aria-required="false"'}
            />
          </span>
        </label>
        <label class="field-label">
          填寫日期
          <input class="text-field" type="date" data-meta="date" data-assessment="${assessment.id}" value="${escapeAttribute(
            meta.date || today
          )}" />
        </label>
        <label class="checkbox-field">
          <input
            type="checkbox"
            data-meta-check="externalUser"
            data-assessment="${assessment.id}"
            ${meta.externalUser ? "checked" : ""}
          />
          <span>
            <strong>非四院共用病歷病例，僅使用公開工具。</strong>
            <small>四院包含吉米哈利動物醫院、凝視犬貓專科醫院、狗意思犬專科醫院、凱特森貓專科醫院。</small>
          </span>
        </label>
      </div>
      <div class="progress-block" id="progress-block"></div>
      <div class="result-ranges-block" id="result-ranges-block"></div>
    </section>
    ${renderQuestionSections(assessment)}
    ${assessment.overall ? renderOverallBlock(assessment) : ""}
    ${renderNotesBlock(assessment)}
    ${renderSourceBlock(assessment)}
  `;
}

function renderQrShareBlock(assessment) {
  const shareUrl = getAssessmentUrl(assessment.id);
  const localNote = isLocalPreview()
    ? `<p class="qr-note">目前是本機預覽網址；正式上線後，QR Code 會自動改成公開網址。</p>`
    : "";

  return `
    <div class="qr-share" aria-label="此量表 QR Code">
      <button
        class="qr-image-button"
        type="button"
        data-action="open-qr-modal"
        data-qr-url="${escapeAttribute(shareUrl)}"
        data-qr-title="${escapeAttribute(assessment.shortTitle)}"
        aria-label="放大 ${escapeAttribute(assessment.shortTitle)} QR Code"
      >
        <img
          class="qr-image"
          src="${escapeAttribute(getQrCodeUrl(shareUrl))}"
          alt=""
        />
        <span class="qr-image-hint">放大</span>
      </button>
      <div class="qr-copy">
        <h3>手機掃描填寫此量表</h3>
        <p>診間可開啟這個分頁，讓家長掃描後直接進入「${escapeHtml(assessment.shortTitle)}」。</p>
        <a class="qr-url" href="${escapeAttribute(shareUrl)}" target="_blank" rel="noopener">${escapeHtml(shareUrl)}</a>
        ${localNote}
      </div>
    </div>
  `;
}

function openQrModal(shareUrl, title) {
  closeQrModal({ restoreFocus: false });
  const modal = document.createElement("div");
  modal.className = "qr-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "qr-modal-title");
  modal.innerHTML = `
    <button class="qr-modal-backdrop" type="button" data-modal-action="close-qr" aria-label="關閉 QR Code"></button>
    <div class="qr-modal-card">
      <button class="qr-modal-close" type="button" data-modal-action="close-qr" aria-label="關閉">x</button>
      <h2 id="qr-modal-title">${escapeHtml(title || "此量表")} QR Code</h2>
      <img
        class="qr-modal-image"
        src="${escapeAttribute(getQrCodeUrl(shareUrl, 520))}"
        alt="掃描開啟 ${escapeAttribute(title || "此量表")}"
      />
      <a class="qr-modal-url" href="${escapeAttribute(shareUrl)}" target="_blank" rel="noopener">${escapeHtml(shareUrl)}</a>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add("modal-open");
  modal.querySelector(".qr-modal-close")?.focus();
}

function closeQrModal(options = {}) {
  const { restoreFocus = true } = options;
  const modal = document.querySelector(".qr-modal");
  if (!modal) return;
  modal.remove();
  document.body.classList.remove("modal-open");
  if (restoreFocus && lastQrTrigger) lastQrTrigger.focus();
}

function openSubmissionModal({ assessment, stats, meta, recordId, googleResult, kind = "success" }) {
  closeSubmissionModal({ restoreFocus: false, force: true });
  const pdfFileName = googleResult?.pdfFileName || "";
  const hasStoredPdf = Boolean(pdfFileName);
  const isWarning = kind === "warning";
  const title = isWarning ? "紀錄已收到，PDF 匯出待確認" : "已收到這份問卷";
  const description = isWarning
    ? "問卷紀錄已送出，但院內紀錄或 PDF 歸檔暫時沒有完成。院內可依紀錄 ID 追蹤。"
    : hasStoredPdf
      ? "問卷已送出，院內也已留存 PDF 紀錄。感謝填寫，結果可作為後續追蹤與回診討論參考。"
      : "問卷已送出，感謝填寫。此結果可作為後續追蹤與回診討論參考。";

  const modal = document.createElement("div");
  modal.className = "submission-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "submission-modal-title");
  modal.innerHTML = `
    <button class="submission-modal-backdrop" type="button" data-modal-action="close-submission" aria-label="關閉送出確認"></button>
    <div class="submission-modal-card ${isWarning ? "warning" : ""}">
      <button class="qr-modal-close" type="button" data-modal-action="close-submission" aria-label="關閉">x</button>
      <div class="submission-icon" aria-hidden="true">${isWarning ? "!" : "✓"}</div>
      <h2 id="submission-modal-title">${escapeHtml(title)}</h2>
      <p class="submission-message">${escapeHtml(description)}</p>
      <dl class="submission-summary">
        <div>
          <dt>寵物</dt>
          <dd>${escapeHtml(meta.petName || "未填寫")}</dd>
        </div>
        <div>
          <dt>量表</dt>
          <dd>${escapeHtml(assessment.shortTitle)}</dd>
        </div>
        <div>
          <dt>填寫日期</dt>
          <dd>${escapeHtml(meta.date || "未填寫")}</dd>
        </div>
        <div>
          <dt>${escapeHtml(assessment.totalLabel)}</dt>
          <dd>${stats.total} / ${stats.max}</dd>
        </div>
        <div>
          <dt>${escapeHtml(assessment.qualityLabel)}</dt>
          <dd>${stats.qualityPercent}%</dd>
        </div>
        <div>
          <dt>完成度</dt>
          <dd>${stats.completed} / ${stats.itemCount}</dd>
        </div>
      </dl>
      <p class="submission-record-id">紀錄 ID：${escapeHtml(recordId || "已送出")}</p>
      <div class="submission-actions">
        <button class="action-button" type="button" data-modal-action="close-submission">完成</button>
      </div>
      ${hasStoredPdf ? `<p class="submission-pdf-name">PDF 已留存於院內紀錄。</p>` : ""}
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add("modal-open");
  modal.querySelector(".submission-actions [data-modal-action='close-submission']")?.focus();
}

function openSubmissionProgressModal({ assessment, meta }) {
  closeSubmissionModal({ restoreFocus: false, force: true });
  const modal = document.createElement("div");
  modal.className = "submission-modal";
  modal.dataset.submissionState = "loading";
  modal.setAttribute("role", "alertdialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "submission-modal-title");
  modal.setAttribute("aria-describedby", "submission-modal-message");
  modal.innerHTML = `
    <div class="submission-modal-backdrop" aria-hidden="true"></div>
    <div class="submission-modal-card loading" aria-live="assertive" tabindex="-1">
      <div class="submission-spinner" aria-hidden="true"></div>
      <h2 id="submission-modal-title">正在上傳紀錄</h2>
      <p class="submission-message" id="submission-modal-message">
        系統正在儲存問卷並建立院內紀錄，通常需要幾秒鐘。請不要重複點選或關閉頁面。
      </p>
      <dl class="submission-summary compact">
        <div>
          <dt>寵物</dt>
          <dd>${escapeHtml(meta.petName || "未填寫")}</dd>
        </div>
        <div>
          <dt>量表</dt>
          <dd>${escapeHtml(assessment.shortTitle)}</dd>
        </div>
        <div>
          <dt>填寫日期</dt>
          <dd>${escapeHtml(meta.date || "未填寫")}</dd>
        </div>
      </dl>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add("modal-open");
  modal.querySelector(".submission-modal-card")?.focus();
}

function openSubmissionFailureModal(message) {
  closeSubmissionModal({ restoreFocus: false, force: true });
  const modal = document.createElement("div");
  modal.className = "submission-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "submission-modal-title");
  modal.innerHTML = `
    <button class="submission-modal-backdrop" type="button" data-modal-action="close-submission" aria-label="關閉上傳失敗提示"></button>
    <div class="submission-modal-card warning">
      <button class="qr-modal-close" type="button" data-modal-action="close-submission" aria-label="關閉">x</button>
      <div class="submission-icon" aria-hidden="true">!</div>
      <h2 id="submission-modal-title">上傳失敗</h2>
      <p class="submission-message">${escapeHtml(message)}</p>
      <div class="submission-actions">
        <button class="action-button" type="button" data-modal-action="close-submission">我知道了</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.classList.add("modal-open");
  modal.querySelector(".submission-actions [data-modal-action='close-submission']")?.focus();
}

function closeSubmissionModal(options = {}) {
  const { restoreFocus = true, force = false } = options;
  const modal = document.querySelector(".submission-modal");
  if (!modal) return;
  if (modal.dataset.submissionState === "loading" && !force) return;
  modal.remove();
  document.body.classList.remove("modal-open");
  if (restoreFocus && lastSubmissionTrigger) lastSubmissionTrigger.focus();
}

function renderScaleGuide(assessment) {
  const guides = getGeneralScaleGuides(assessment);
  if (!guides.length) return "";

  return guides
    .map((guide) => {
      return renderScaleGuideGroup(assessment, guide);
    })
    .join("");
}

function renderQuestionSections(assessment) {
  let itemNumber = 1;
  const questionGuides = getQuestionScaleGuides(assessment);
  return assessment.categories
    .map((category, categoryIndex) => {
      const questions = category.items
        .map((rawItem) => {
          const item = normalizeItem(rawItem);
          const itemId = `${categoryIndex}-${itemNumber}`;
          const guideHtml = renderQuestionGuideBefore(assessment, questionGuides, itemNumber);
          const html = `${guideHtml}${renderQuestionCard(
            assessment,
            category,
            item,
            itemNumber,
            itemId
          )}`;
          itemNumber += 1;
          return html;
        })
        .join("");

      return `
        <section class="category-section" aria-labelledby="category-${categoryIndex}">
          <h3 class="category-title" id="category-${categoryIndex}">
            <span>${escapeHtml(category.name)}</span>
            <span class="category-en">${escapeHtml(category.english)}</span>
          </h3>
          <div class="question-list">
            ${questions}
          </div>
        </section>
      `;
    })
    .join("");
}

function renderScaleGuideGroup(assessment, guide, extraClass = "") {
  const scale = guide.scale || {
    ...assessment.scale,
    labels: guide.labels || assessment.scale.labels,
  };
  return `
    <div class="scale-guide-group ${extraClass}">
      ${guide.title ? `<h3>${escapeHtml(guide.title)}</h3>` : ""}
      <div class="scale-guide-items">
        ${getScaleValues(scale)
          .map(
            (value) => `
              <div class="scale-item">
                ${value} 分：${escapeHtml(scale.labels[value])}
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function getGeneralScaleGuides(assessment) {
  const guides = assessment.scaleGuides || [
    { title: "", labels: assessment.scale.labels, scale: assessment.scale },
  ];
  return guides.filter((guide) => !getGuideStartQuestion(guide));
}

function getQuestionScaleGuides(assessment) {
  return (assessment.scaleGuides || [])
    .map((guide) => ({
      ...guide,
      startQuestion: getGuideStartQuestion(guide),
    }))
    .filter((guide) => guide.startQuestion);
}

function getGuideStartQuestion(guide) {
  const match = String(guide.title || "").match(/^第\s*(\d+)/);
  return match ? Number(match[1]) : null;
}

function renderQuestionGuideBefore(assessment, guides, itemNumber) {
  return guides
    .filter((guide) => guide.startQuestion === itemNumber)
    .map((guide) => renderScaleGuideGroup(assessment, guide, "question-scale-guide"))
    .join("");
}

function renderQuestionCard(assessment, category, item, number, itemId) {
  const answer = state.answers[assessment.id]?.[itemId];
  const scale = item.scale || category.scale || assessment.scale;
  const showInlineLabels = hasInlineScoreLabels(scale);
  return `
    <article class="question-card ${item.reverse ? "reverse" : ""}">
      <div class="question-copy">
        <span class="question-number">${number}.</span>
        <div>
          <p class="question-text">${escapeHtml(item.text)}</p>
          ${
            item.reverse
              ? `<p class="reverse-note">負向題：${scale.min} 代表負面狀態明顯，${scale.max} 代表負面狀態不明顯。</p>`
              : ""
          }
          ${
            item.weight && item.weight !== 1
              ? `<p class="reverse-note">本題計分會乘以 ${item.weight}。</p>`
              : ""
          }
        </div>
      </div>
      <fieldset class="score-options ${showInlineLabels ? "score-options-with-labels" : ""}">
        <legend class="sr-only">第 ${number} 題分數</legend>
        ${getScaleValues(scale)
          .map((value) =>
            renderScoreOption({
              assessment,
              scale,
              showInlineLabel: showInlineLabels,
              itemId,
              value,
              checked: answer === value,
              reverse: item.reverse,
              name: `${assessment.id}-${itemId}`,
              dataAttr: "data-answer",
              ariaLabel: `第 ${number} 題 ${value} 分：${scoreLabelFor(scale, item, value)}`,
            })
          )
          .join("")}
      </fieldset>
    </article>
  `;
}

function renderOverallBlock(assessment) {
  const overall = assessment.overall;
  const value = state.overall[assessment.id];
  return `
    <section class="overall-block" aria-labelledby="overall-heading">
      <h3 class="section-heading" id="overall-heading">${escapeHtml(overall.title)}</h3>
      <p class="section-copy">${escapeHtml(overall.prompt)}</p>
      <div class="overall-scale">
        <span class="overall-endpoint">${escapeHtml(overall.low)}</span>
        <fieldset class="score-options">
          <legend class="sr-only">${escapeHtml(overall.title)}</legend>
          ${range(overall.min, overall.max)
            .map((score) =>
              renderScoreOption({
                assessment,
                itemId: "overall",
                value: score,
                checked: value === score,
                reverse: false,
                name: `${assessment.id}-overall`,
                dataAttr: "data-overall",
                ariaLabel: `${overall.title} ${score} 分`,
              })
            )
            .join("")}
        </fieldset>
        <span class="overall-endpoint">${escapeHtml(overall.high)}</span>
      </div>
    </section>
  `;
}

function renderNotesBlock(assessment) {
  return `
    <section class="notes-block" aria-labelledby="notes-heading">
      <h3 class="section-heading" id="notes-heading">備註 / 近期特殊狀況</h3>
      <p class="section-copy">${escapeHtml(assessment.notesPrompt)}</p>
      <textarea class="notes-area" data-notes data-assessment="${assessment.id}" placeholder="選填">${escapeHtml(
    state.notes[assessment.id] || ""
  )}</textarea>
    </section>
  `;
}

function renderSourceBlock(assessment) {
  const sources = assessment.source.split("；");
  return `
    <section class="source-block" aria-label="資料來源">
      ${sources.map((source) => `<p>${escapeHtml(source)}</p>`).join("")}
      <p>製作者：楊崇君。網頁整理與互動化：Codex。</p>
    </section>
  `;
}

function renderScoreOption({
  assessment,
  scale,
  showInlineLabel = false,
  itemId,
  value,
  checked,
  reverse,
  name,
  dataAttr,
  ariaLabel,
}) {
  const id = `${name}-${value}`;
  const inlineLabel = showInlineLabel ? getInlineScoreLabel(scale, value) : "";
  return `
    <span>
      <input
        class="score-input"
        id="${escapeAttribute(id)}"
        type="radio"
        name="${escapeAttribute(name)}"
        value="${value}"
        ${dataAttr}
        data-assessment="${assessment.id}"
        data-item="${escapeAttribute(itemId)}"
        aria-label="${escapeAttribute(ariaLabel)}"
        ${checked ? "checked" : ""}
      />
      <label class="score-label ${inlineLabel ? "has-score-caption" : ""} ${reverse ? "reverse-label" : ""}" for="${escapeAttribute(id)}">
        <span class="score-number">${value}</span>
        ${inlineLabel ? `<span class="score-caption">${escapeHtml(inlineLabel)}</span>` : ""}
      </label>
    </span>
  `;
}

function hasInlineScoreLabels(scale) {
  return Boolean(scale?.labels);
}

function getInlineScoreLabel(scale, value) {
  return String(scale?.labels?.[value] || "").trim();
}

function renderProgress() {
  const progressBlock = document.querySelector("#progress-block");
  if (!progressBlock) return;
  const stats = getStats(getActiveAssessment());
  progressBlock.innerHTML = `
    <div class="progress-row">
      <span>完成度</span>
      <span>${stats.completed} / ${stats.itemCount} 題</span>
    </div>
    <div class="progress-track" aria-hidden="true">
      <div class="progress-fill" style="width: ${stats.completionPercent}%"></div>
    </div>
  `;
  renderResultRanges();
}

function renderScorePanel() {
  const panel = document.querySelector("#score-panel");
  if (!panel) return;
  const assessment = getActiveAssessment();
  const stats = getStats(assessment);
  const maxText =
    assessment.scale.min === 0 ? `${stats.total} / ${stats.max}` : `${stats.total} / ${stats.max}`;
  panel.innerHTML = `
    <h2>即時計分</h2>
    <div class="score-stat">
      <span class="score-label-text">${escapeHtml(assessment.totalLabel)}</span>
      <span class="score-value">${maxText}</span>
    </div>
    <div class="score-stat">
      <span class="score-label-text">${escapeHtml(assessment.qualityLabel)}</span>
      <span class="score-value quality-value">${stats.qualityPercent}%</span>
    </div>
    <div class="score-stat">
      <span class="score-label-text">完成度</span>
      <span class="score-value">${stats.completed}/${stats.itemCount}</span>
    </div>
    ${assessment.overall ? renderOverallSummary(assessment) : ""}
    <p class="interpretation">${escapeHtml(stats.interpretation)}</p>
    <div class="category-summary">
      <h3>分類小計</h3>
      ${stats.categories
        .map(
          (category) => `
          <div class="category-line">
            <span>${escapeHtml(category.name)}</span>
            <strong>${category.completed === category.count ? category.total : "-"} / ${category.max}</strong>
          </div>
        `
        )
        .join("")}
    </div>
    <div class="action-row">
      <button class="action-button" type="button" data-action="upload-firebase" ${uploadInProgress ? 'disabled aria-busy="true"' : ""}>
        ${uploadInProgress ? "上傳中..." : "上傳紀錄"}
      </button>
      <button class="action-button" type="button" data-action="print">列印 / 儲存 PDF</button>
      <button class="action-button secondary" type="button" data-action="copy-summary">複製摘要</button>
      <button class="action-button secondary" type="button" data-action="copy-link">複製連結</button>
      <button class="action-button warning" type="button" data-action="reset">重新填寫</button>
    </div>
    <div class="copy-status ${panelStatusKind === "error" ? "error" : ""}" id="copy-status" role="status">${escapeHtml(panelStatus)}</div>
  `;
}

function renderOverallSummary(assessment) {
  const value = state.overall[assessment.id];
  return `
    <div class="score-stat">
      <span class="score-label-text">整體評分</span>
      <span class="score-value">${value ? `${value} / ${assessment.overall.max}` : "-"}</span>
    </div>
  `;
}

function renderResultRanges() {
  const block = document.querySelector("#result-ranges-block");
  if (!block) return;

  const assessment = getActiveAssessment();
  const ranges = assessment.interpretationRanges || [];
  if (!ranges.length) {
    block.innerHTML = "";
    return;
  }

  const stats = getStats(assessment);
  const isComplete = stats.completed === stats.itemCount;
  const activeRange = isComplete ? stats.interpretationRange : "";
  block.innerHTML = `
    <section class="result-ranges" aria-label="結果判讀">
      <div class="result-ranges-head">
        <h3>結果判讀</h3>
        <p>${
          isComplete
            ? `目前結果：${escapeHtml(stats.interpretationRange)} ${escapeHtml(
                stats.interpretationBand
              )}`
            : "完成所有題目後，會自動標示目前分數落在哪一個區間。"
        }</p>
      </div>
      <div class="result-range-grid">
        ${ranges
          .map((rangeItem) => {
            const rangeLabel = getInterpretationRangeLabel(rangeItem);
            const isActive = isComplete && activeRange === rangeLabel;
            return `
              <div class="result-range-card ${isActive ? "active" : ""}">
                <strong>${escapeHtml(rangeLabel)}</strong>
                <span>${escapeHtml(rangeItem.label || rangeItem.text)}</span>
              </div>
            `;
          })
          .join("")}
      </div>
      ${
        isComplete
          ? `<p class="result-interpretation">${escapeHtml(stats.interpretation)}</p>`
          : ""
      }
    </section>
  `;
}

function getStats(assessment) {
  const answers = state.answers[assessment.id] || {};
  let itemNumber = 1;
  let total = 0;
  let min = 0;
  let max = 0;
  let completed = 0;
  const categories = assessment.categories.map((category, categoryIndex) => {
    let categoryTotal = 0;
    let categoryMin = 0;
    let categoryMax = 0;
    let categoryCompleted = 0;
    const count = category.items.length;
    category.items.forEach((rawItem) => {
      const item = normalizeItem(rawItem);
      const scale = item.scale || category.scale || assessment.scale;
      const weight = item.weight || 1;
      const itemMin = getScaleMin(scale) * weight;
      const itemMax = getScaleMax(scale) * weight;
      const value = answers[`${categoryIndex}-${itemNumber}`];
      min += itemMin;
      max += itemMax;
      categoryMin += itemMin;
      categoryMax += itemMax;
      if (typeof value === "number") {
        const weightedScore = value * weight;
        completed += 1;
        categoryCompleted += 1;
        total += weightedScore;
        categoryTotal += weightedScore;
      }
      itemNumber += 1;
    });
    return {
      name: category.name,
      total: categoryTotal,
      completed: categoryCompleted,
      count,
      min: categoryMin,
      max: categoryMax,
    };
  });

  const itemCount = assessment.categories.reduce(
    (sum, category) => sum + category.items.length,
    0
  );
  const completionPercent = Math.round((completed / itemCount) * 100);
  const normalized =
    max === min ? 0 : clampPercent(Math.round(((total - min) / (max - min)) * 100));
  const qualityPercent =
    assessment.direction === "lower" ? clampPercent(100 - normalized) : normalized;
  const matchedInterpretationRange =
    completed === itemCount ? getMatchedInterpretationRange(assessment, total) : null;

  return {
    total,
    min,
    max,
    completed,
    itemCount,
    completionPercent,
    qualityPercent,
    categories,
    interpretationRange: matchedInterpretationRange
      ? getInterpretationRangeLabel(matchedInterpretationRange)
      : "",
    interpretationBand: matchedInterpretationRange?.label || "",
    interpretation: getInterpretation(
      assessment,
      completed,
      itemCount,
      qualityPercent,
      total,
      matchedInterpretationRange
    ),
  };
}

function getInterpretation(assessment, completed, itemCount, qualityPercent, total, matchedRange) {
  if (completed < itemCount) {
    return `尚有 ${itemCount - completed} 題未填，完成後會顯示較完整的解讀。`;
  }

  if (matchedRange) return matchedRange.text;

  if (qualityPercent >= 80) {
    return "目前填答顯示生活品質指標相對穩定，可持續追蹤變化。";
  }

  if (qualityPercent >= 60) {
    return "目前填答顯示有部分面向需要留意，建議與既有病況、用藥與近期變化一起觀察。";
  }

  if (assessment.direction === "lower") {
    return "目前填答顯示疾病影響偏高，建議整理結果並與獸醫師討論是否需要調整照護或治療。";
  }

  return "目前填答顯示生活品質指標偏低，建議整理結果並與獸醫師討論疼痛、食慾、活動或安寧照護需求。";
}

function getMatchedInterpretationRange(assessment, total) {
  return assessment.interpretationRanges?.find((rangeItem) => {
    const aboveMin = rangeItem.min === undefined || total >= rangeItem.min;
    const belowMax = rangeItem.max === undefined || total <= rangeItem.max;
    return aboveMin && belowMax;
  });
}

function getInterpretationRangeLabel(rangeItem) {
  if (rangeItem.rangeLabel) return rangeItem.rangeLabel;
  if (rangeItem.min === undefined) return `<=${rangeItem.max}`;
  if (rangeItem.max === undefined) return `>=${rangeItem.min}`;
  return `${rangeItem.min}-${rangeItem.max}`;
}

function normalizeItem(item) {
  if (typeof item === "string") return { text: item, reverse: false };
  return {
    text: item.text,
    reverse: Boolean(item.reverse),
    weight: item.weight || 1,
    scale: item.scale,
  };
}

function scoreLabelFor(scale, item, value) {
  if (item.reverse) {
    if (value === scale.min) return "負面狀態明顯";
    if (value === scale.max) return "負面狀態不明顯";
  }
  return scale.labels[value] || `${value} 分`;
}

function getAssessmentUrl(assessmentId) {
  return new URL(`/${assessmentId}/`, getPublicOrigin()).href;
}

function getPublicOrigin() {
  if (isLocalPreview()) return window.location.origin;
  const host = window.location.hostname;
  if (
    host === "pet-qol-assessment.vercel.app" ||
    host.endsWith("-ckvululms-3042s-projects.vercel.app")
  ) {
    return PRODUCTION_ORIGIN;
  }
  return window.location.origin;
}

function getQrCodeUrl(url, size = 180) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=12&data=${encodeURIComponent(
    url
  )}`;
}

function isLocalPreview() {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function getScaleValues(scale) {
  return scale.values || range(scale.min, scale.max);
}

function getScaleMin(scale) {
  return Math.min(...getScaleValues(scale));
}

function getScaleMax(scale) {
  return Math.max(...getScaleValues(scale));
}

function clampPercent(value) {
  return Math.min(100, Math.max(0, value));
}

function range(min, max) {
  return Array.from({ length: max - min + 1 }, (_, index) => min + index);
}

function normalizePatientDigits(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 5);
}

function formatPatientRecordNumber(digits) {
  const normalized = normalizePatientDigits(digits);
  return normalized.length === 5 ? `PT0${normalized}` : "";
}

function getMetaDisplay(assessmentId) {
  const meta = state.meta[assessmentId] || {};
  const patientDigits = normalizePatientDigits(meta.patientDigits || "");
  return {
    ...meta,
    petName: String(meta.petName || "").trim(),
    date: normalizeAssessmentDate(meta.date),
    patientDigits,
    patientRecordNumber: formatPatientRecordNumber(patientDigits),
    externalUser: Boolean(meta.externalUser),
  };
}

function normalizeAssessmentDate(value) {
  const normalized = String(value || "").trim();
  return normalized || getTodayInputDate();
}

function getTodayInputDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function focusMetaField(assessmentId, metaName) {
  const field = document.querySelector(
    `[data-assessment="${CSS.escape(assessmentId)}"][data-meta="${CSS.escape(metaName)}"]`
  );
  if (!field) return;
  field.focus();
  field.reportValidity?.();
}

function syncPatientDigitsRequirement(assessmentId) {
  const meta = getMetaDisplay(assessmentId);
  const field = document.querySelector(
    `[data-assessment="${CSS.escape(assessmentId)}"][data-meta="patientDigits"]`
  );
  const label = document.querySelector(
    `[data-patient-required-label="${CSS.escape(assessmentId)}"]`
  );

  if (field) {
    field.required = !meta.externalUser;
    field.setAttribute("aria-required", meta.externalUser ? "false" : "true");
  }

  if (label) {
    label.textContent = meta.externalUser ? "非四院可免填" : "必填";
    label.classList.toggle("conditional-mark", meta.externalUser);
  }
}

function buildSummaryText() {
  const assessment = getActiveAssessment();
  const stats = getStats(assessment);
  const meta = getMetaDisplay(assessment.id);
  const lines = [
    "犬貓生活品質評估",
    assessment.title,
    meta.petName ? `寵物姓名或代號：${meta.petName}` : "",
    meta.patientRecordNumber ? `病歷號碼：${meta.patientRecordNumber}` : "",
    meta.externalUser ? "非四院共用病歷病例：是" : "",
    meta.date ? `填寫日期：${meta.date}` : "",
    `${assessment.totalLabel}：${stats.total} / ${stats.max}`,
    `${assessment.qualityLabel}：${stats.qualityPercent}%`,
    `完成度：${stats.completed} / ${stats.itemCount}`,
  ].filter(Boolean);

  if (assessment.overall && state.overall[assessment.id]) {
    lines.push(`整體評分：${state.overall[assessment.id]} / ${assessment.overall.max}`);
  }

  lines.push("分類小計：");
  stats.categories.forEach((category) => {
    lines.push(`- ${category.name}：${category.total} / ${category.max}`);
  });

  if (state.notes[assessment.id]) {
    lines.push("備註：");
    lines.push(state.notes[assessment.id]);
  }

  lines.push("提醒：此結果僅供追蹤與獸醫討論，不取代診斷。");
  return lines.join("\n");
}

async function uploadActiveRecord() {
  if (uploadInProgress) return;

  const assessment = getActiveAssessment();
  const stats = getStats(assessment);
  const meta = getMetaDisplay(assessment.id);

  if (!meta.petName) {
    setPanelStatus("請先填寫寵物姓名或代號。", "error");
    focusMetaField(assessment.id, "petName");
    return;
  }

  if (!meta.externalUser && !meta.patientRecordNumber) {
    setPanelStatus(
      "請輸入四院共用病歷號碼後五碼；若不是四院病例，請勾選非四院使用。",
      "error"
    );
    focusMetaField(assessment.id, "patientDigits");
    return;
  }

  if (stats.completed < stats.itemCount) {
    setPanelStatus(
      `尚有 ${stats.itemCount - stats.completed} 題未完成，請完成後再上傳。`,
      "error"
    );
    return;
  }

  if (assessment.overall && !state.overall[assessment.id]) {
    setPanelStatus("請先填寫整體評分，再上傳紀錄。", "error");
    return;
  }

  if (!window.qolFirebase?.submitQolRecord) {
    setPanelStatus("Firebase 尚未載入完成，請稍候再試。", "error");
    return;
  }

  uploadInProgress = true;
  setPanelStatus("正在上傳紀錄，請稍候...", "success");
  openSubmissionProgressModal({ assessment, meta });

  try {
    const record = buildFirebaseRecord(assessment, stats);
    const result = await window.qolFirebase.submitQolRecord(record);
    const googleResult = await exportRecordToGoogle(record, result.id);
    if (googleResult.failed) {
      setPanelStatus(
        `已收到問卷，紀錄 ID：${result.id}。但院內 PDF / 表單歸檔暫時未完成：${googleResult.message}`,
        "error"
      );
      openSubmissionModal({
        assessment,
        stats,
        meta,
        recordId: result.id,
        googleResult,
        kind: "warning",
      });
      return;
    }
    if (googleResult.skipped) {
      setPanelStatus(`已收到這份問卷，紀錄 ID：${result.id}。${googleResult.message}`, "success");
      openSubmissionModal({ assessment, stats, meta, recordId: result.id, googleResult });
      return;
    }
    setPanelStatus(`已收到這份問卷，院內紀錄已建立。紀錄 ID：${result.id}`, "success");
    openSubmissionModal({ assessment, stats, meta, recordId: result.id, googleResult });
  } catch (error) {
    console.error(error);
    closeSubmissionModal({ restoreFocus: false, force: true });
    setPanelStatus(
      "上傳或匯出失敗。請確認 Firestore 規則與 Google 匯出環境變數設定。",
      "error"
    );
    openSubmissionFailureModal(
      "上傳或匯出失敗，請稍後再試；若問題持續發生，請通知院內人員協助確認。"
    );
  } finally {
    uploadInProgress = false;
    renderScorePanel();
  }
}

async function exportRecordToGoogle(record, firebaseRecordId) {
  if (isLocalPreview()) {
    return {
      skipped: true,
      message: "院內紀錄 / PDF 匯出會在正式網站設定後啟用。",
    };
  }

  try {
    const response = await fetch("/api/export-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ record, firebaseRecordId }),
    });

    if (response.status === 404) {
      return {
        skipped: true,
        message: "目前尚未啟用院內紀錄 / PDF 匯出功能。",
      };
    }

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        failed: true,
        message: result.error || "後端回傳錯誤。",
      };
    }

    return result;
  } catch {
    return {
      failed: true,
      message: "無法連線到 Google 匯出 API。",
    };
  }
}

function buildFirebaseRecord(assessment, stats) {
  const meta = getMetaDisplay(assessment.id);
  const answers = state.answers[assessment.id] || {};
  const normalizedAnswers = [];
  let itemNumber = 1;

  assessment.categories.forEach((category, categoryIndex) => {
    category.items.forEach((rawItem) => {
      const item = normalizeItem(rawItem);
      const scale = item.scale || category.scale || assessment.scale;
      const weight = item.weight || 1;
      const itemId = `${categoryIndex}-${itemNumber}`;
      const score = answers[itemId];
      normalizedAnswers.push({
        itemId,
        itemNumber,
        category: category.name,
        categoryEnglish: category.english,
        question: item.text,
        reverse: Boolean(item.reverse),
        weight,
        score,
        weightedScore: typeof score === "number" ? score * weight : null,
        scoreLabel: typeof score === "number" ? scoreLabelFor(scale, item, score) : "",
      });
      itemNumber += 1;
    });
  });

  return {
    schemaVersion: 1,
    assessmentId: assessment.id,
    assessmentTitle: assessment.title,
    assessmentShortTitle: assessment.shortTitle,
    petNameOrCode: meta.petName || "",
    patientDigits: meta.patientDigits || "",
    patientRecordNumber: meta.externalUser ? "" : meta.patientRecordNumber,
    isExternalUser: meta.externalUser,
    assessmentDate: meta.date || "",
    totalScore: stats.total,
    minScore: stats.min,
    maxScore: stats.max,
    qualityPercent: stats.qualityPercent,
    completionPercent: stats.completionPercent,
    completedItems: stats.completed,
    totalItems: stats.itemCount,
    overallScore: state.overall[assessment.id] || null,
    overallMax: assessment.overall?.max || null,
    interpretationRange: stats.interpretationRange || "",
    interpretationBand: stats.interpretationBand || "",
    interpretation: stats.interpretation,
    interpretationRanges: (assessment.interpretationRanges || []).map((rangeItem) => ({
      range: getInterpretationRangeLabel(rangeItem),
      label: rangeItem.label || "",
      text: rangeItem.text || "",
    })),
    categoryScores: stats.categories,
    answers: normalizedAnswers,
    notes: state.notes[assessment.id] || "",
    userAgent: navigator.userAgent,
  };
}

function setPanelStatus(message, kind = "success") {
  panelStatus = message;
  panelStatusKind = kind;
  renderScorePanel();
}

async function copyText(text) {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText(text);
    panelStatus = "已複製。";
    panelStatusKind = "success";
    if (status) {
      status.classList.remove("error");
      status.textContent = panelStatus;
    }
  } catch {
    panelStatus = "無法自動複製，請改用瀏覽器的分享或列印功能。";
    panelStatusKind = "error";
    if (status) {
      status.classList.add("error");
      status.textContent = panelStatus;
    }
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
