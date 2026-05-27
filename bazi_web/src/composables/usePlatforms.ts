import { reactive, type Ref } from 'vue'
import type { ConfigData, Platform, BuildListResponse } from '../types'
import { AppService } from '../utils/AppService'
import { getDeviceInfo } from '../utils/device'

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
    }
  }

  /**
   * 从 OSS 获取最新版本构建信息并更新平台链接
   * @param os 操作系统名称（Android / Windows）
   */
  const requestBuildCfg = async (os: string) => {
    if (!configData.value) return
    try {
      const cfg = configData.value
      const baseUrl = `${cfg.address}/package/${os}/${cfg.mode}/buildList.json`
      const response = await AppService.getRequest(baseUrl) as BuildListResponse | null
      if (!response) return

      const { buildEnv, buildVersion, fileList } = response.curVersionInfo
      if (!fileList || fileList.length === 0) {
        console.warn(`${os} 构建列表中无文件`)
        return
      }
      const fullUrl = `${cfg.address}/package/${os}/${buildEnv}/${buildVersion}/${fileList[0].fileName}`
      updatePlatformLink(os, fullUrl)
    } catch (error) {
      console.error(`${os} 构建信息获取失败:`, error)
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
    // 尚未发布的平台：阻止跳转
    if (['HarmonyOS', 'iOS', 'MacOS'].includes(platform.name)) {
      event.preventDefault()
      return
    }

    // Android 平台：智能跳转应用商店
    if (platform.name === 'Android') {
      const device = getDeviceInfo()
      let marketUrl = ''

      if (device.brand === 'huawei') {
        marketUrl = 'https://url.cloud.huawei.com/AdWCjYkeLC?shareTo=qrcode'
      } else if (device.brand === 'xiaomi') {
        marketUrl = 'https://m.malink.cn/s/jU77bi'
      }

      if (marketUrl) {
        try {
          window.location.href = marketUrl
          // 兜底方案：1.5 秒后如果商店未打开，自动下载 APK
          setTimeout(() => {
            saveDownInfo(platform.name)
            window.open(platform.link, '_blank')
          }, 1500)
        } catch (e) {
          console.error('打开应用商店失败:', e)
          saveDownInfo(platform.name)
          window.open(platform.link, '_blank')
        }
        return
      }
    }

    // 其他平台或无品牌识别的 Android：直接下载
    saveDownInfo(platform.name)
    window.open(platform.link, '_blank')
  }

  /**
   * 并发获取 Android 和 Windows 的最新安装包地址
   */
  const fetchPlatformLinks = async () => {
    await Promise.all([
      requestBuildCfg('Android'),
      requestBuildCfg('Windows'),
    ])
  }

  return { platforms, hoverStates, setHoverState, handleClick, fetchPlatformLinks }
}
