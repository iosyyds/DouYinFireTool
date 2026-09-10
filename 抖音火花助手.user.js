// ==UserScript==
// @name         抖音火花助手
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  自动抓取聊天列表到暂存，支持将对象添加为续火花目标、每对象模板、$date/$targetName/$sinceDate()、简单条件语句。参考 fire.js 的选择器与发送逻辑。
// @author       WorldMargin
// @match        https://creator.douyin.com/creator-micro/data/following/chat
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @homepage    				https://github.com/iosyyds/DouYinFireTool
// @source     				https://raw.githubusercontent.com/iosyyds/DouYinFireTool/main/抖音火花助手.user.js
// ==/UserScript==

(function() {
    'use strict';

    const DEFAULT_TEMPLATE='res= \`自动续火花-$date\n$targetName\`';

    // 创建命名空间
    window.DyFireScript = window.DyFireScript || {};
    // 预处理变量函数，用于替换编辑器中的变量
    function preprocessVariables(code, targetName) {
        let processedCode = code;
        
        // 替换$targetName为实际目标名称
        processedCode = processedCode.replace(/\$targetName/g, `${targetName}`);
        
        // 替换$date为当前日期
        processedCode = processedCode.replace(/\$date/g, `${new Date().toLocaleDateString()}`);
        
        // 处理$sinceDate函数，将其转换为实际的天数
        processedCode = processedCode.replace(/\$sinceDate\(\s*["']([^"']+)["']\s*\)/g, (_, dateStr) => {
            const days = daysSince(dateStr);
            return days;
        });
        
        return processedCode;
    }
    
    // 计算天数差
    function daysSince(dateStr) {
        try {
            const d = new Date(dateStr);
            if (isNaN(d)) return 0;
            const now = new Date();
            const diff = now - d;
            return Math.floor(diff / (1000 * 60 * 60 * 24));
        } catch (e) {
            return 0;
        }
    }


    // 存储键
    const KEY_PERSIST = 'dy_fire_persistent_targets_v1';
    const KEY_MACROS = 'dy_fire_macros_v1';

    const SELECTORS = {
        userName: '.item-header-name-vL_79m',
        chatInput: '.chat-input-dccKiL',
        sendBtn: '.chat-btn',
        chatTabs: '.sub-tab-mspQQ0',
        friendTab: '.sub-tab-mspQQ0 span:nth-child(1)',  // 朋友私信
        strangerTab: '.sub-tab-mspQQ0 span:nth-child(2)', // 陌生人私信
        groupTab: '.sub-tab-mspQQ0 span:nth-child(3)',    // 群消息
    };

    // 内存数据
    let staged = []; // 暂存数组 of {name}
    let stagedWithTypes = new Map(); // Map of {name -> chatType} to track where each contact was found
    let persistent = {}; // { name: { template: string, macros: [], lastSendDate: string } }
    let activeEdit = null; // 当前编辑对象名
    let selectedSet = new Set(); // 选中用于批量发送的名字
    let macros = {}; // { name: { code: string, enabled: boolean, description: string } }
