# 张机智 · 个人介绍网页

使用原生 HTML、CSS 和 JavaScript 构建的模块化简历网站。页面结构和交互由 `script.js` 负责，简历内容集中维护在 `resume-data.js`，后续更新通常不需要修改 HTML。

## 本地预览

在项目目录运行：

```bash
node -e 'const http=require("http"),fs=require("fs"),path=require("path");const root=process.cwd();http.createServer((req,res)=>{const file=path.join(root,req.url==="/"?"index.html":decodeURIComponent(req.url));fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end("Not found");}res.end(data);});}).listen(4173,"127.0.0.1",()=>console.log("http://127.0.0.1:4173"));'
```

然后打开 <http://127.0.0.1:4173>。

## 内容维护

1. 打开 [resume-data.js](resume-data.js)。
2. 只修改 `window.resumeData` 对象中的文字、日期、链接和数组。
3. 保存后刷新浏览器，页面会自动重新渲染。
4. 新增字段前，先确认 [resume-data.template.js](resume-data.template.js) 中的字段形状，避免破坏渲染结构。

## 数据结构

| 模块 | 用途 | 关键字段 |
| --- | --- | --- |
| `profile` | 首屏个人信息和图片 | `name`、`intro`、`image`、`school`、`role` |
| `about` | 关于我和基础资料 | `heading`、`description`、`facts` |
| `intent` | 工作意向 | `heading`、`description`、`items` |
| `timeline.education` | 教育经历 | `date`、`institution`、`degree`、`paragraphs` |
| `timeline.experience` | 工作经历 | `date`、`institution`、`degree`、`bullets` |
| `campus` | 校园活动或项目 | `kicker`、`title`、`bullets`、`stat` |
| `skills` | 技能、语言、证书、爱好 | `title`、`lines` |

## 常用修改模板

### 新增教育经历

将对象追加到 `timeline.education.items`：

```js
{
	date: "2028.09 — 2030.06",
	place: "城市 · 国家",
	institution: "学校名称",
	degree: "专业 · 学位",
	paragraphs: [
		"主修课程或成绩。",
		"荣誉、项目或补充说明。"
	]
}
```

### 新增工作经历

将对象追加到 `timeline.experience.items`：

```js
{
	date: "2026.01 — 2027.08",
	place: "城市 · 国家",
	institution: "公司名称",
	degree: "职位名称",
	bullets: [
		"负责的工作和可量化成果。",
		"第二项工作和可量化成果。"
	]
}
```

### 新增技能卡片

将对象追加到 `skills` 数组：

```js
{
	title: "工具",
	lines: [
		"工具名称 <em>熟练程度</em>",
		"另一项工具 <em>基础</em>"
	]
}
```

### 图片字段

`profile.image` 支持远程图片 URL，也支持项目内路径，例如 `assets/profile.jpg`。对应的 `imageAlt` 用于无障碍说明。

## 文件职责

- `index.html`：页面入口和资源加载。
- `resume-data.js`：所有可变简历内容。
- `script.js`：根据数据渲染页面和处理交互。
- `styles.css`：布局、响应式样式、主题和横向滚动效果。
- `resume-data.template.js`：新增项目或迁移内容时参考的字段模板，不会被页面加载。
