// src/zhConverter.js
const zhMap = {
    // 简体到繁体映射表（完整版需补充完整）
    机: '機', 页: '頁', 简: '簡', 体: '體',载: '載',发: '發',阳: '陽',区: '區',
    东: '東',环: '環',号: '號',层: '層',邮: '信',专: '專',业: '業',
    盘: '盤',軟: '軟',件: '體',证: '證',备: '備',隐: '隱',务: '務',协: '協',议: '議',权: '權',声: '聲',网: '網',
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