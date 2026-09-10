# 🔥 抖音火花助手

一个 Tampermonkey / ScriptCat 用户脚本，用于自动续抖音火花。它可以自动管理聊天对象、发送定制化消息，并自动化一些重复性任务。

## ✨ 功能特性

- 自动抓取聊天列表到暂存区
- 支持将对象添加为续火花目标
- 为每个对象设置个性化模板
- 支持变量 `$date`、`$targetName`、`$sinceDate()`
- 宏管理系统
- 定时发送功能
- Monaco Editor 代码编辑器支持
- 已添加目标一键全选（v1.0.5）
- 群聊消息自动发送（v1.0.5）

## 📦 安装方法

### 一键安装（推荐）

点击下方链接，浏览器会弹出 Tampermonkey / ScriptCat 的安装确认框，点击「安装」即可：

- **CDN 安装**（国内访问快）：<https://cdn.jsdelivr.net/gh/iosyyds/DouYinFireTool@main/抖音火花助手.user.js>
- **GitHub 直链安装**（备用）：<https://raw.githubusercontent.com/iosyyds/DouYinFireTool/main/抖音火花助手.user.js>
- **GitHub Pages 安装页**：<https://iosyyds.github.io/DouYinFireTool/>

### 手动安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展（或 [ScriptCat](https://scriptcat.org/)）
2. 点击上方安装链接，或手动将 `抖音火花助手.user.js` 内容复制进脚本编辑器
3. 访问抖音创作者中心的聊天页面即可使用

## 🌐 多 CDN 支持

为了提高 Monaco Editor 的加载可靠性并解决浏览器跟踪预防阻止访问存储的问题，本脚本支持多个 CDN 源：

1. **jsDelivr**: `https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs/`
2. **cdnjs**: `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/`
3. **unpkg**: `https://unpkg.com/monaco-editor@latest/min/vs/`

脚本会按顺序尝试从这些 CDN 加载 Monaco Editor，如果第一个 CDN 不可用，则自动尝试下一个，从而提高加载成功率。使用 Tampermonkey 的 `GM_xmlhttpRequest` API 来绕过浏览器的跟踪预防限制。

## 🚀 使用说明

1. 脚本会在抖音聊天页面自动运行
2. 点击页面上的「续火目标管理」面板来管理续火花对象
3. 可以将聊天对象添加到续火花目标列表
4. 为每个目标设置个性化的消息模板
5. 使用宏系统增强模板功能
6. 设置定时发送功能来自动发送消息

## ⚠️ 注意事项

- 本脚本仅在抖音创作者后台的聊天页面有效
- 发送消息间隔不宜过短，建议保持 3 秒以上间隔
- 请确保在发送消息前已正确登录抖音创作者后台

## 🌐 兼容性

- 支持 Chrome、Firefox、Edge 等主流浏览器
- 需要安装 Tampermonkey 或类似用户脚本管理器

## 📝 更新日志

### v1.0.5 (2026-01-17)

- **新增粗略匹配**：解决无法自动为群聊发消息的问题，若分类中不含有该目标则遍历其它分类，直至找到目标或遍历完所有分类
- 新增已添加目标一键全选功能

### v1.0.4 (2026-01-06)

- 修正了作者 GitHub 项目地址

### v1.0.3 (2026-01-06)

- 修正了作者 GitHub 项目地址

### v1.0.2 (2026-01-03)

- **修复已知问题**：修复 eval 函数内 `let res` 与 `res+=xxx` 导致结果前出现 undefined 的问题；修复默认模板 `return xxx` 导致宏功能无法执行的问题
- **新增功能**：新增自动发送选项，进入聊天页面时自动检查当天是否发送过消息，未发送则自动发送

### v1.0.1 (2026-01-02)

- **宏管理界面美化**：现代化渐变背景、增强视觉层次、改进悬停效果、亮/暗主题适配、视觉指示器区分启用/禁用宏

### v1.0.0

- 初始版本发布：自动抓取聊天列表、续火花目标管理、模板系统（`$date`/`$targetName`/`$sinceDate()`）、批量发送、定时发送、Monaco 编辑器、主题切换、可定制面板

## 📄 许可证

[MIT](LICENSE)

本项目仅供学习交流使用，请勿用于商业用途。使用本脚本所产生的任何后果由使用者自行承担。
