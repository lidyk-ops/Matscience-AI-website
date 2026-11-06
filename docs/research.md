# 网站设计调研笔记

日期：2026-11-06

## 1. 两个网站对比

| | MatScienceAI（现有网站） | LiquidStack（参考） |
|---|---|---|
| 业务 | 冷却液（PG25、DC6，PG0 在研），预测软件授权，联合研发 | 液冷硬件（CDU） |
| 技术栈 | React + Tailwind（Vite，预渲染） | WordPress + HubSpot |
| 风格 | 深蓝黑底，青蓝渐变，粒子波浪 | 黑白为主，单一黄色点缀，产品实拍 |
| 字体 | Outfit + DM Sans | Inter |
| 导航 | Technology / Validated By / Products / Partners / Blog | Solutions / Industries / Services / Learning Hub / Resources / About |

截图见 `screenshots/`。

## 2. 从 LiquidStack 借鉴的点

1. 产品放在首页显眼位置（产品卡片或对比表）
2. 有引导入口，比如 “Find your CDU / Compare architectures / Learn the fundamentals”
3. 首页展示案例研究和新闻
4. 用真实产品和现场照片，少用抽象图形
5. 一个固定的品牌色，辨识度高
6. 首页底部只放简短的 CTA，完整表单放在单独页面

## 3. 现有网站的问题

- 首页写的是浸没式冷却，产品页写的是直触芯片（cold plate）冷却液，说法不一致
- 导航里的 `/technology` 返回 404
- “Engineered for Every Cooling Challenge” 一节在截图里没有内容（需要在浏览器里确认）
- 首页没有关键数字，产品信息不够突出
- 长表单占了首页约三分之一

## 4. 原型（`index.html`）做了什么

- Hero 区：动态的直触芯片冷却回路图（CDU → 机架 manifold → cold plate → 回流）
- 验证合作方名单，加三个真实数字（部署最长 3 年、模型学习了 1M+ 条物性测量数据、30+ 年制造经验）
- PG25 / DC6 / PG0 对比表
- 预测软件：输入、输出，以及模型的适用边界
- 联合研发四步流程
- 首页展示最新的博客文章
- 简短的联系入口

设计参考了 Anthropic 官方 frontend-design skill（github.com/anthropics/skills）：从行业本身取视觉，只在一个地方大胆，避免 AI 模板感。

## 5. 工具选择

- 现有网站已经是 React + Tailwind，建议继续在原代码上迭代，不用换平台
- 如果以后由非工程师维护：Framer（动画容易做）或 Webflow（CMS 和 SEO 更成熟）

## 6. 参考来源

- https://www.bighuman.com/blog/b2b-website-design
- https://www.k6agency.com/b2b-website-design/
- https://azurodigital.com/b2b-web-design-tips/
- https://www.centricdxb.com/insights/b2b-web-design-best-practices
- https://www.windmillstrategy.com/top-9-b2b-web-design-trends/
- https://brixtemplates.com/blog/webflow-vs-framer
- https://github.com/anthropics/skills/tree/main/skills/frontend-design
