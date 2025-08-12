// src/zhConverter.js
const zhMap = {
    // 简体到繁体映射表（完整版需补充完整）
    机: '機', 页: '頁', 简: '簡', 体: '體',载: '載',发: '發',
    // 此处应包含完整的简繁对照表[3,5](@ref)
};

// 文本转换方法
export function convertText(text, toTraditional) {
    return text.split('').map(char =>
        toTraditional ? zhMap[char] || char :
            Object.keys(zhMap).find(key => zhMap[key] === char) || char
    ).join('');
}

// DOM转换方法
export function convertDOM(toTraditional) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement.tagName !== 'SCRIPT' && node.textContent.trim()) {
            node.textContent = convertText(node.textContent, toTraditional);
        }
    }
}