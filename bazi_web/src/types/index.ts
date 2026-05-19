/**
 * 全局类型定义模块
 * 定义项目中使用的核心数据结构接口
 */

/** 运行时配置数据结构，对应 public/config/config.json */
export interface ConfigData {
  /** OSS 文件存储地址，用于拼接安装包下载链接 */
  address: string
  /** 构建模式：Debug / Release */
  mode: string
  /** 后端运营接口地址，上报访问和下载统计 */
  optionUrl: string
}

/** 平台按钮数据结构 */
export interface Platform {
  /** 平台显示名称，如 "Android"、"iOS" */
  name: string
  /** 平台唯一标识，用于悬停状态映射 */
  id: string
  /** 平台图标路径 */
  icon: string
  /** 下载链接，启动时从远端获取真实地址 */
  link: string
}

/** 设备信息，通过解析 UserAgent 获取 */
export interface DeviceInfo {
  /** 完整的 UserAgent 字符串 */
  userAgent: string
  /** 是否为 Android 设备 */
  isAndroid: boolean
  /** 是否为 iOS 设备 */
  isIOS: boolean
  /** 是否为移动设备 */
  isMobile: boolean
  /** 设备品牌（华为/小米/OPPO/vivo/三星/未知） */
  brand: 'huawei' | 'xiaomi' | 'oppo' | 'vivo' | 'samsung' | 'unknown'
}

/** 构建版本信息，来自远端 buildList.json */
export interface BuildVersionInfo {
  /** 构建环境标识 */
  buildEnv: string
  /** 版本号 */
  buildVersion: string
  /** 构建产物文件列表 */
  fileList: Array<{
    /** 文件名（如 APK 或 EXE 文件名） */
    fileName: string
  }>
}

/** buildList.json 的顶层响应结构 */
export interface BuildListResponse {
  curVersionInfo: BuildVersionInfo
}
