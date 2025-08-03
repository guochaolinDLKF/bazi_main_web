<template>
  <div class="container">
    <!-- 顶部导航栏 - 修正为三栏布局 -->
    <header class="header">

      <!-- 左侧标题 -->
      <div class="nav-left">
        <div class="main-title-small">八字玄机</div>
      </div>


      <!-- 中间标题 -->
      <div class="nav-center">
       <span
           class="nav-item"
           :class="{ active: currentPage === 'home' }"
           @click="currentPage = 'home'"
       >首页</span>
        <span
            class="nav-item"
            :class="{ active: currentPage === 'mac' }"
            @click="currentPage = 'mac'"
        >Mac</span>
      </div>


      <!-- 语言切换部分-->
      <div class="nav-right">
        <div class="lang-container">
          <span
              :class="{ active: activeLang === 'simplified' }"
              @click="setActiveLang('simplified')"
              class="lang-item"
          >简体</span>
          <span
              :class="{ active: activeLang === 'traditional' }"
              @click="setActiveLang('traditional')"
              class="lang-item"
          >繁體</span>
        </div>
      </div>
    </header>

    <!-- 主体内容区域 -->
    <main class="main-content">
      <div v-if="currentPage === 'home'" class="home-page">

        <div class="main-title">八字玄机</div>
        <div class="platform-buttons">
          <div
              v-for="(platform, index) in platforms"
              :key="index"
              class="button"
              :class="{
            'android-btn': platform.name === 'Android',
            'windows-btn': platform.name === 'Windows',
            'ios-btn': platform.name === 'iOS'
          }"
          >
            <!-- 默认显示内容 -->
            <div class="original-content">
              <img :src="platform.icon" :alt="platform.name" class="icon"/>
              <span>{{ platform.name }}</span>
            </div>

            <!-- 鼠标悬停时显示的内容（仅Android和Windows按钮） -->
            <div class="download-overlay">
              <img src="/icons/download.png" alt="下载" class="download-icon"/>
              <span class="download-text">立刻下载</span>
            </div>
            <!-- 二维码覆盖层 -->
            <div class="qr-overlay">
              <img src="/icons/ios-qr.png" alt="iOS下载二维码" class="qr-image"/>
            </div>
          </div>
        </div>
      </div>
      <!-- Mac版页面 -->
      <div v-if="currentPage === 'mac'" class="mac-page">
        <div class="mac-title">八字玄机MacOS版</div>

        <!-- 下载按钮组 -->
        <div class="download-buttons">
          <!-- 白色虚线按钮 -->
          <div class="download-button outline">
            <img src="/icons/mac_download_normal.png" alt="下载" class="button-icon"/>
            <div class="button-text">
              <span>立即下载</span>
              <span class="version">1.1.0</span>
            </div>
          </div>

          <!-- 白色虚线按钮（App Store版） -->
          <div class="download-button outline app-store">
            <img src="/icons/mac_download_enter.png" alt="App Store" class="button-icon"/>
            <div class="button-text">
              <span>Mac App Store</span>
              <span class="version">1.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 修复：添加响应式状态管理
import {ref} from 'vue';

// 当前激活的语言状态
const activeLang = ref('simplified'); // 默认简体
const currentPage = ref('home'); // 默认显示首页


// 语言切换方法
const setActiveLang = (lang) => {
  activeLang.value = lang; // 更新激活状态
  console.log(lang);
};

// 平台按钮数据 - 使用假路径
const platforms = [
  {name: "Android", icon: "/icons/android.png"},
  {name: "HarmonyOS", icon: "/icons/harmonyos.png"},
  {name: "iOS", icon: "/icons/ios.png"},
  {name: "MacOS", icon: "/icons/macos.png"},
  {name: "Windows", icon: "/icons/windows.png"}
];


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5; /* 浅灰色背景 */
}

/* 修改点：添加relative定位 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  position: relative; /* 新增 */
}

/* 修改点：左侧自适应宽度 */
.nav-left {
  position: absolute;
  left: 25%; /* 位于左侧边缘至"首页"的中间点 */
  transform: translateX(-50%); /* 居中定位 */
  font-weight: bold;
}

/* 修改点：添加绝对定位居中 */
.nav-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  gap: 30px;
}

.nav-center .main-title-small {
  font-size: 18px;
  font-weight: normal;
  color: #000000;
}
.nav-item {
  font-size: 18px;
  cursor: pointer;
  color: #999;
  position: relative;
  padding: 5px 0;
}
.nav-item.active {
  color: #000;
  font-weight: bold;
}

.nav-item.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4CAF50;
}
/* 修改点：右侧语言定位 */
.nav-right {
  position: absolute;
  left: 75%; /* 定位到中间和右侧的中间位置 */
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* 确保在顶部 */
  flex: 0; /* 避免占用flex空间 */
}

/* 语言容器 - 新增白色背景+灰色描边 */
.lang-container {
  position: relative;
  display: flex;
  padding: 4px 7px; /* 调整内边距 */
  background: white;
  border-radius: 18px;
  border: 1px solid #e0e0e0; /* 统一1px灰色描边 */
  justify-content: center;
  align-items: center;
  z-index: 1; /* 确保在绿色背景上方 */
}

/* 语言项样式 - 精确控制 */
.lang-item {
  position: relative;
  padding: 3px 20px; /* 水平间距14px */
  font-size: 14px;
  cursor: pointer;
  color: #000;
  z-index: 2;
  transition: all 0.2s ease;
}

/* 选中状态的背景效果 */
.lang-item.active {
  color: white; /* 文字变白 */
}

/* 关键修复：调整绿色背景位置 */
.lang-item.active::before {
  content: "";
  position: absolute;
  top: -1px; /* 顶部间距一致 */
  left: -3px; /* 左侧间距一致 */
  right: -3px; /* 右侧间距一致 */
  bottom: -1px; /* 底部间距一致 */
  background-color: #4CAF50;
  border-radius: 20px; /* 与容器相同圆角 */
  z-index: -1; /* 确保在文字下方 */
}


/* 选中状态文字变白 */
.lang-item.active {
  color: white;
}

/* 主体内容样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 150px;
}

.main-title {
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #000000;
}
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 核心垂直居中 */
  height: 100%;
  width: 100%;
  position: relative;
}
/* 平台按钮区域 */
.platform-buttons {
  display: flex;
  gap: 30px;
  margin-top: 200px; /* 保持与标题的距离 */
}


.android-btn:hover,
.windows-btn:hover {
  background-color: #4CAF50 !important; /* 绿色背景 */
  position: relative; /* 为绝对定位子元素提供参照 */
}

.button {
  position: relative; /* 为绝对定位子元素提供锚点 */
}

/* 原始内容层（确保位置不变） */
.original-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


/* 下载覆盖层（绝对定位不影响原始内容） */
.download-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none; /* 默认隐藏 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}


/* Android/Windows悬停效果 */
.android-btn:hover .download-overlay,
.windows-btn:hover .download-overlay {
  display: flex; /* 显示覆盖层 */
  background-color: #4CAF50; /* 绿色背景 */
}

/* 确保原始内容在悬停时隐藏 */
.android-btn:hover .original-content,
.windows-btn:hover .original-content {
  visibility: hidden; /* 隐藏原始内容（保留布局空间） */
}

.download-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 6px;
}

.download-text {
  font-family: 'Microsoft YaHei', sans-serif; /* 新增字体设置 */
  color: white;
  font-size: 16px;
  font-weight: normal;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.icon {
  width: 36px;
  height: 36px;
  margin-bottom: 8px;
}

.button span {
  font-size: 14px;
}


/* 二维码覆盖层 - 默认隐藏 */
.qr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none; /* 默认隐藏 */
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* 二维码图片样式 */
.qr-image {
  width: 70px; /* 二维码尺寸 */
  height: 70px;
  object-fit: contain;
}

/* iOS按钮悬停时效果 */
.ios-btn:hover {
  background-color: #4CAF50 !important; /* 绿色背景 */
}

.ios-btn:hover .original-content {
  visibility: hidden; /* 隐藏原始内容（保留布局空间） */
}

.ios-btn:hover .qr-overlay {
  display: flex; /* 显示二维码层 */
}
/* ====== Mac页面样式（完全独立） ====== */

.mac-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
}

.mac-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
  letter-spacing: 1px;
  color: #000;
  text-align: center;
}

/* 下载按钮组 */
.download-buttons {
  display: flex;
  flex-direction: row; /* 水平排列 */
  justify-content: center; /* 水平居中 */
  gap: 25px; /* 按钮间距 */
  max-width: 500px; /* 扩展最大宽度 */
  width: 100%;
  align-items: stretch; /* 确保高度一致 */
}

/* 下载按钮通用样式 */
.download-button {
  flex: 1; /* 关键：让两个按钮平分容器宽度 */
  min-width: 180px; /* 防止内容过少时过度收缩 */
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
/* 鼠标悬停效果 */
.download-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 虚线按钮样式 */
.download-button.outline {
  background: white;
}

/* 按钮图标 */
.button-icon {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

/* 按钮文字部分 */
.button-text {
  display: flex;
  flex-direction: column;
}

.button-text span {
  font-size: 16px;
  line-height: 1.4;
}

.download-button.solid .button-text span {
  color: white;
}

.version {
  font-size: 14px;
  opacity: 0.7;
  font-weight: normal;
}
</style>