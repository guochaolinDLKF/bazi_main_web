import type { DeviceInfo } from '../types'

/**
 * 获取当前设备信息
 * 通过解析浏览器 UserAgent 字符串判断设备平台和品牌
 * 用于 Android 平台智能跳转应用商店
 */
export function getDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent || ""

  return {
    userAgent: ua,
    // 匹配 Android 设备
    isAndroid: /Android/i.test(ua),
    // 匹配 iPhone/iPad/iPod
    isIOS: /iPhone|iPad|iPod/i.test(ua),
    // 匹配所有移动设备
    isMobile: /Android|iPhone|iPad|iPod|Mobile/i.test(ua),
    // 按优先级判断设备品牌
    brand:
      /HUAWEI|HONOR/i.test(ua) ? "huawei" :
      /Xiaomi|Mi|Redmi/i.test(ua) ? "xiaomi" :
      /OPPO/i.test(ua) ? "oppo" :
      /vivo/i.test(ua) ? "vivo" :
      /Samsung/i.test(ua) ? "samsung" :
      "unknown"
  }
}
