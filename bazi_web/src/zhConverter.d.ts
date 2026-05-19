/**
 * zhConverter.js 的 TypeScript 类型声明
 * 为 JS 模块提供类型信息，解决 TS7016 错误
 */

/** 将文本在简繁之间转换 */
export function convertText(text: string, toTraditional: boolean): string

/** 遍历整个 DOM 树，将所有文本节点进行简繁转换 */
export function convertDOM(toTraditional: boolean): void
