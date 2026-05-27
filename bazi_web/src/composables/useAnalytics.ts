import type { Ref } from 'vue'
import type { ConfigData } from '../types'
import { AppService } from '../utils/AppService'

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
    if (!configData.value) return
    const url = configData.value.optionUrl + '/game/visit_page'
    const result = await AppService.postRequest(url)
    if (result === null) {
      console.warn('[Analytics] 页面访问上报失败')
    }
  }

  /**
   * 上报下载行为
   * POST {optionUrl}/game/down_info?downPlatform={platform}
   * 参数格式与服务端 @RequestParam 对齐
   * @param platform 下载平台名称（如 "Android"、"Windows"）
   */
  const saveDownInfo = async (platform: string) => {
    if (!configData.value) return
    const url = configData.value.optionUrl + '/game/down_info?downPlatform=' + encodeURIComponent(platform)
    const result = await AppService.postRequest(url)
    if (result === null) {
      console.warn(`[Analytics] 下载上报失败 (${platform})`)
    }
  }

  return { saveVisitInfo, saveDownInfo }
}
