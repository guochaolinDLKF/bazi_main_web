import { ref } from 'vue'
import type { ConfigData } from '../types'
import { logger } from '../utils/logger'

/**
 * 配置文件管理 composable
 * 负责加载 public/config/config.json 中的运行时配置
 * 配置包含 OSS 地址、后端 URL、构建模式等关键信息
 *
 * @returns configData - 响应式配置数据（初始为 null，加载完成后有值）
 * @returns fetchConfig - 异步加载配置的方法
 */
export function useConfig() {
  /** 响应式配置数据，组件挂载后异步填充 */
  const configData = ref<ConfigData | null>(null)

  /**
   * 从 public/config/config.json 加载配置
   * 失败时打印错误但不阻断后续流程
   */
  const fetchConfig = async () => {
    logger.info('[Config] 开始加载配置文件 /config/config.json')
    try {
      const response = await fetch('/config/config.json')
      if (!response.ok) throw new Error('配置加载失败')
      configData.value = await response.json()
      // 配置加载完成后，按 mode 设置全局日志输出级别（Debug=全部 / Release=仅 warn/error）
      logger.setMode(configData.value?.mode)
      logger.info(`[Config] 配置加载成功，当前模式: ${configData.value?.mode}`, configData.value)
    } catch (error) {
      logger.error('配置文件读取错误:', error)
    }
  }

  return { configData, fetchConfig }
}
