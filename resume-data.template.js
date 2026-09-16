window.resumeData = {
  profile: {
    name: "姓名",
    initials: "XY",
    location: "所在城市",
    availability: "当前状态",
    title: "hi，我是",
    intro: "用一到两句话介绍自己、当前身份和个人特点。",
    image: "图片地址或本地路径",
    imageAlt: "图片说明",
    imageCaption: "图片短标题",
    school: "学校或机构",
    role: "身份"
  },
  about: {
    heading: ["第一行标题，", "第二行标题。"],
    description: "关于自己的补充介绍。",
    facts: [
      { label: "姓名", value: "姓名" },
      { label: "学校", value: "学校或机构" },
      { label: "邮箱", value: "name@example.com", copyable: true }
    ]
  },
  intent: {
    heading: ["热爱的，", "工作的"],
    description: "描述职业兴趣、目标方向和希望发展的领域。",
    items: [
      { label: "职业方向", value: "方向一 · 方向二" },
      { label: "期望地点", value: "城市或地区" },
      { label: "阶段目标", value: "近期目标" }
    ]
  },
  timeline: {
    education: {
      label: "教育背景",
      items: [
        {
          date: "2024.09 — 2028.06",
          note: "预计",
          place: "城市 · 国家",
          institution: "学校名称",
          degree: "专业 · 学位",
          paragraphs: ["经历说明一。", "经历说明二。"],
          current: true
        }
      ]
    },
    experience: {
      label: "工作经历",
      items: [
        {
          date: "2022.07 — 2024.08",
          place: "城市 · 国家",
          institution: "公司或机构名称",
          degree: "职位名称",
          bullets: ["工作成果一。", "工作成果二。"]
        }
      ]
    }
  },
  campus: {
    label: "校内活动",
    date: "2023.12",
    place: "城市 · 国家",
    kicker: "活动名称",
    title: "担任角色",
    bullets: ["活动职责或成果一。", "活动职责或成果二。"],
    stat: { value: "成果数字", label: "成果说明" }
  },
  skills: [
    { title: "语言", lines: ["普通话 <em>母语</em>", "英语 <em>流利</em>"] },
    { title: "技能", lines: ["技能名称 <em>熟练程度</em>"] },
    { title: "证书", lines: ["证书名称"] },
    { title: "爱好", lines: ["兴趣一 · 兴趣二"] }
  ],
  email: "name@example.com",
  year: "2026"
};
