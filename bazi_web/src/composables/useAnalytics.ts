import type { Ref } from 'vue'
import type { ConfigData } from '../types'
import { AppService } from '../utils/AppService'
import { logger } from '../utils/logger'

/**
 * 数据统计 composable
 * 向后端上报页面访问和平台下载行为
 *
 * @param configData - 响应式配置数据（由 useConfig 提供）
 * @returns saveVisitInfo - 上报页面访问
 * @returns saveDownInfo - 上报下载行为
 */
export function useAnalytics(configData: Ref<ConfigData | null>) {
  /**
   * 上报页面访问
   * POST {optionUrl}/game/visit_page
   */
  const saveVisitInfo = async () => {
    if (!configData.value) {
      logger.warn('[Analytics] 配置未就绪，跳过页面访问上报')
      return
    }
    const url = configData.value.optionUrl + '/game/visit_page'
    logger.debug(`[Analytics] 上报页面访问: ${url}`)
    const result = await AppService.postRequest(url)
    if (result === null) {
      logger.warn('[Analytics] 页面访问上报失败')
    } else {
      logger.info('[Analytics] 页面访问上报成功')
    }
  }

  /**
   * 上报下载行为
   * POST {optionUrl}/game/down_info?downPlatform={platform}
   * 参数格式与服务端 @RequestParam 对齐
   * @param platform 下载平台名称（如 "Android"、"Windows"）
   */
  const saveDownInfo = async (platform: string) => {
    if (!configData.value) {
      logger.warn(`[Analytics] 配置未就绪，跳过下载上报 (${platform})`)
      return
    }
    const url = configData.value.optionUrl + '/game/down_info?downPlatform=' + encodeURIComponent(platform)
    logger.debug(`[Analytics] 上报下载行为 (${platform}): ${url}`)
    const result = await AppService.postRequest(url)
    if (result === null) {
      logger.warn(`[Analytics] 下载上报失败 (${platform})`)
    } else {
      logger.info(`[Analytics] 下载上报成功 (${platform})`)
    }
  }

  return { saveVisitInfo, saveDownInfo }
}
