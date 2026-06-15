import { reactive, type Ref } from 'vue'
import type { ConfigData, Platform, BuildListResponse } from '../types'
import { AppService } from '../utils/AppService'
import { getDeviceInfo } from '../utils/device'
import { logger } from '../utils/logger'

/**
 * 平台下载管理 composable
 * 管理各平台下载按钮数据、悬停状态、下载链接获取和跳转逻辑
 *
 * 核心功能：
 * 1. 启动时从远端 OSS 获取 Android/Windows 最新版本下载地址
 * 2. Android 设备智能识别品牌，优先跳转应用商店，兜底直接下载 APK
 * 3. iOS/HarmonyOS/MacOS 暂不提供下载（显示"正在研发中"）
 *
 * @param configData   - 运行时配置（OSS地址、构建模式等）
 * @param saveDownInfo - 下载统计上报函数（由 useAnalytics 提供）
 */
export function usePlatforms(
  configData: Ref<ConfigData | null>,
  saveDownInfo: (platform: string) => Promise<void>
) {
  /** 平台按钮列表，link 为兜底地址，启动后会被远端真实地址覆盖 */
  const platforms = reactive<Platform[]>([
    { name: 'Android', id: 'android', icon: '/icons/android.png', link: 'https://default-android.com' },
    { name: 'Windows', id: 'windows', icon: '/icons/windows.png', link: 'https://default-windows.com' },
    { name: 'HarmonyOS', id: 'harmony', icon: '/icons/harmonyos.png', link: 'https://default-harmonyos.com' },
    { name: 'iOS', id: 'ios', icon: '/icons/ios.png', link: 'https://default-ios.com' },
    { name: 'MacOS', id: 'mac', icon: '/icons/macos.png', link: 'https://default-macos.com' },
  ])

  /** 悬停状态映射，用于显示"正在研发中"提示（仅 iOS/HarmonyOS/MacOS） */
  const hoverStates = reactive<Record<string, boolean>>({
    harmony: false,
    ios: false,
    mac: false,
  })

  /**
   * 设置平台按钮悬停状态
   * @param platformId 平台 ID（harmony/ios/mac）
   * @param isHover    是否正在悬停
   */
  const setHoverState = (platformId: string, isHover: boolean) => {
    hoverStates[platformId] = isHover
  }

  /**
   * 更新指定平台的下载链接
   * @param platformName 平台名称
   * @param newLink      新的下载地址
   */
  const updatePlatformLink = (platformName: string, newLink: string) => {
    const platform = platforms.find(p => p.name === platformName)
    if (platform) {
      platform.link = newLink
      logger.info(`[Platforms] 已更新 ${platformName} 下载地址: ${newLink}`)
    } else {
      logger.warn(`[Platforms] 未找到平台 ${platformName}，下载地址更新被忽略`)
    }
  }

  /**
   * 从 OSS 获取最新版本构建信息并更新平台链接
   * @param os 操作系统名称（Android / Windows）
   */
  const requestBuildCfg = async (os: string) => {
    if (!configData.value) {
      logger.warn(`[Platforms] 配置未就绪，跳过 ${os} 构建信息获取`)
      return
    }
    try {
      const cfg = configData.value
      const baseUrl = `${cfg.address}/package/${os}/official/${cfg.mode}/buildList.json`
      logger.debug(`[Platforms] 获取 ${os} 构建列表: ${baseUrl}`)
      const response = await AppService.getRequest(baseUrl) as BuildListResponse | null
      if (!response) {
        logger.warn(`[Platforms] ${os} 构建列表为空或请求失败`)
        return
      }

      const { buildEnv, buildVersion, fileList } = response.curVersionInfo
      logger.debug(`[Platforms] ${os} 构建信息: env=${buildEnv}, version=${buildVersion}, 文件数=${fileList?.length ?? 0}`)
      if (!fileList || fileList.length === 0) {
        logger.warn(`${os} 构建列表中无文件`)
        return
      }
      const fullUrl = `${cfg.address}/package/${os}/official/${buildEnv}/${buildVersion}/${fileList[0].fileName}`
      updatePlatformLink(os, fullUrl)
    } catch (error) {
      logger.error(`${os} 构建信息获取失败:`, error)
    }
  }

  /**
   * 处理平台按钮点击
   * - iOS/HarmonyOS/MacOS：阻止跳转（研发中）
   * - Android：智能检测品牌 → 优先应用商店 → 兜底直接下载
   * - Windows/其他：直接打开下载链接
   *
   * @param platform 被点击的平台信息
   * @param event    原生鼠标事件（用于阻止默认行为）
   */
  const handleClick = (platform: Platform, event: MouseEvent) => {
    logger.info(`[Platforms] 点击平台按钮: ${platform.name}`)
    // 尚未发布的平台：阻止跳转
    if (['HarmonyOS', 'iOS', 'MacOS'].includes(platform.name)) {
      logger.debug(`[Platforms] ${platform.name} 尚未发布，阻止跳转`)
      event.preventDefault()
      return
    }

    // Android 平台：智能跳转应用商店
    if (platform.name === 'Android') {
      const device = getDeviceInfo()
      logger.debug(`[Platforms] Android 设备品牌识别结果: ${device.brand}`)
      let marketUrl = ''

      if (device.brand === 'huawei') {
        marketUrl = 'https://url.cloud.huawei.com/AdWCjYkeLC?shareTo=qrcode'
      } else if (device.brand === 'xiaomi') {
        marketUrl = 'https://m.malink.cn/s/jU77bi'
      }

      if (marketUrl) {
        try {
          logger.debug(`[Platforms] 跳转 ${device.brand} 应用商店: ${marketUrl}`)
          window.location.href = marketUrl
          // 兜底方案：1.5 秒后如果商店未打开，自动下载 APK
          setTimeout(() => {
            logger.debug('[Platforms] 应用商店兜底：直接下载 APK')
            saveDownInfo(platform.name)
            window.open(platform.link, '_blank')
          }, 1500)
        } catch (e) {
          logger.error('打开应用商店失败:', e)
          saveDownInfo(platform.name)
          window.open(platform.link, '_blank')
        }
        return
      }
    }

    // 其他平台或无品牌识别的 Android：直接下载
    logger.debug(`[Platforms] 直接下载 ${platform.name}: ${platform.link}`)
    saveDownInfo(platform.name)
    window.open(platform.link, '_blank')
  }

  /**
   * 并发获取 Android 和 Windows 的最新安装包地址
   */
  const fetchPlatformLinks = async () => {
    logger.info('[Platforms] 开始并发获取 Android / Windows 下载地址')
    await Promise.all([
      requestBuildCfg('Android'),
      requestBuildCfg('Windows'),
    ])
    logger.info('[Platforms] 平台下载地址获取流程结束')
  }

  return { platforms, hoverStates, setHoverState, handleClick, fetchPlatformLinks }
}
