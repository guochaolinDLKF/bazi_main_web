# 易德八字 - 官网

易德八字是一款专业级八字排盘软件，由**易德自在（北京）文化科技有限公司**开发。本项目是它的产品官网，用于软件宣传和各平台客户端下载引导。

## 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | 前端框架，使用 Composition API (`<script setup>` 语法) |
| **TypeScript** | 类型安全的 JavaScript 超集 |
| **Vite 7** | 构建工具，开发和生产构建均极速 |
| **原生 CSS** | 手写样式，无第三方 UI 库依赖 |

## 项目结构

```
src/
├── App.vue                    # 根组件——整个页面的"调度中心"
├── main.ts                    # 入口文件，挂载 App
├── style.css                  # 全局基础样式（重置、字体等）
├── zhConverter.js             # 简体中文 ↔ 繁体中文转换工具
│
├── types/
│   └── index.ts               # 所有 TypeScript 类型定义
│
├── utils/                     # 工具函数层
│   ├── HttpUtil.ts            # HTTP 请求封装（基于 fetch，带超时控制）
│   ├── AppService.ts          # 后端 API 调用服务
│   └── device.ts              # 设备信息检测（判断品牌、平台等）
│
├── composables/               # 逻辑层（Vue Composition API hooks）
│   ├── useConfig.ts           # 加载站点配置
│   ├── useLanguage.ts         # 简繁语言切换
│   ├── useAnalytics.ts        # 访问和下载统计上报
│   ├── usePlatforms.ts        # 平台下载按钮管理（获取版本、智能跳转）
│   └── useVideo.ts            # 视频播放器逻辑（暂停/播放/可见性检测）
│
├── components/                # 视图层
│   ├── NavBar.vue             # 顶部导航栏（品牌名 + 页面切换 + 语言切换）
│   ├── HomePage.vue           # 首页——产品介绍、功能列表、截图展示
│   ├── PlatformButtons.vue    # 平台下载按钮组（Android/Windows/iOS 等）
│   ├── CompanyIntro.vue       # 公司简介（绿色背景区域）
│   ├── CompanyInfo.vue        # 公司联系方式和微信客服二维码
│   ├── MacPage.vue            # Mac 版下载页面
│   └── FooterSection.vue      # 页脚（法律链接 + ICP 备案 + 版权）
│
└── about/                     # 静态法律页面
    ├── privacy.html           # 隐私政策
    ├── agreement.html         # 服务协议
    ├── law.html               # 权利声明
    └── vip.html               # VIP 会员服务协议
```

## 页面功能

整个网站就是一个单页面应用，包含以下功能模块：

### 导航栏
- 品牌名 "易德自在" 和 "首页" 导航项
- **简繁中文切换**：点击 "简体" / "繁體" 按钮，整个页面文字实时转换

### 首页
- **产品标语**："易德八字——专业级八字排盘软件，让古老智慧，在指尖重生"
- **七大功能介绍**：云存储、真太阳时、知识提示、吉凶日志、命理古籍、流日流时、涂鸦黑板
- **产品截图展示**
- **平台下载按钮**：

  | 平台 | 行为 |
  |------|------|
  | Android | 自动识别华为/小米品牌 → 优先跳转应用商店 → 兜底直接下载 APK |
  | Windows | 直接下载最新 EXE 安装包 |
  | iOS / 鸿蒙 / Mac | 显示"正在研发中"，暂不开放 |

- **公司简介**：绿色背景区域，介绍公司定位和核心产品
- **联系方式**：地址、邮箱、微信客服二维码

### Mac 版页面
- 独立的 Mac 下载入口（当前在导航栏中隐藏）

### 页脚
- 隐私政策 / 服务协议 / 权利声明（点击在新窗口打开）
- ICP 备案号 + 公网安备号
- 版权信息

## 架构设计

### 三层分离

```
视图层 (components)  →  只负责渲染，不写业务逻辑
逻辑层 (composables) →  管理状态和业务逻辑，可跨组件复用
工具层 (utils)       →  纯函数，无 Vue 依赖
```

### 数据流向

```
App.vue（编排层）
  ├── 调用 composables 获取状态和方法
  ├── 通过 props 向下传递给子组件
  └── 通过 emits 接收子组件的事件通知
```

这种架构的好处：
- **职责清晰**：每个文件只做一件事，不会互相冲突
- **易于测试**：逻辑层和视图层分离，可以独立测试
- **可维护**：新增功能只需添加新组件或 composable，不影响现有代码

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 部署

构建产物在 `dist/` 目录下，将其中所有文件部署到任意静态服务器即可。

生产环境需要将 `public/config/config.json` 中的配置项改为生产环境地址：

```json
{
  "address": "https://oss.ydzz.cc",      // OSS 文件存储地址
  "mode": "Release",                      // 构建模式
  "optionUrl": "https://api.ydzz.cc"      // 后端接口地址
}
```
