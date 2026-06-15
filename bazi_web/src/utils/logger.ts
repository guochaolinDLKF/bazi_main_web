/**
 * 全局日志工具
 *
 * 根据 config.json 中的 mode 参数控制日志输出级别：
 * - Debug   ：输出全部日志（debug / info / log / warn / error）
 * - Release ：仅输出 warn 和 error，屏蔽 debug / info / log
 *
 * 使用方式：
 * 1. 配置加载完成后调用 logger.setMode(configData.mode) 设置模式
 * 2. 业务代码统一使用 logger.debug/info/log/warn/error 替代 console.*
 *
 * 注意：配置为异步加载，加载完成前默认按 Debug 处理（输出全部日志），
 * 以避免启动阶段（如配置读取失败）的关键日志被吞掉。
 */

/** 各日志级别对应的数值，数值越大级别越高 */
const LEVELS = {
  debug: 0,
  info: 1,
  log: 1,
  warn: 2,
  error: 3,
} as const

/** 当前输出阈值：级别 >= 阈值的日志才会输出。默认 0（Debug，输出全部） */
let threshold: number = LEVELS.debug

/**
 * 根据 config.json 的 mode 设置日志输出模式
 * @param mode 构建模式，'Release' 时仅输出 warn/error，其余（含 'Debug'）输出全部
 */
function setMode(mode: string | null | undefined): void {
  threshold = mode === 'Release' ? LEVELS.warn : LEVELS.debug
}

/** 判断指定级别的日志当前是否应输出 */
function shouldLog(level: number): boolean {
  return level >= threshold
}

/** 统一日志对象，业务代码用它替代 console.* */
export const logger = {
  setMode,
  debug: (...args: unknown[]): void => {
    if (shouldLog(LEVELS.debug)) console.debug(...args)
  },
  info: (...args: unknown[]): void => {
    if (shouldLog(LEVELS.info)) console.info(...args)
  },
  log: (...args: unknown[]): void => {
    if (shouldLog(LEVELS.log)) console.log(...args)
  },
  warn: (...args: unknown[]): void => {
    if (shouldLog(LEVELS.warn)) console.warn(...args)
  },
  error: (...args: unknown[]): void => {
    if (shouldLog(LEVELS.error)) console.error(...args)
  },
}
