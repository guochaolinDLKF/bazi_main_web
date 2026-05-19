<template>
  <!--
    Mac 版下载页面
    展示两个下载入口：直接下载 和 Mac App Store
    当前在导航栏中已隐藏（注释掉），但组件保留
  -->
  <div class="mac-page">
    <div class="mac-title">易德自在MacOS版</div>

    <div class="download-buttons">
      <!-- 直接下载按钮 -->
      <div class="download-button outline">
        <img src="/icons/mac_download_normal.png" alt="下载" class="button-icon" />
        <div class="button-text">
          <span>立即下载</span>
          <span class="version">1.1.0</span>
        </div>
      </div>

      <!-- Mac App Store 按钮 -->
      <div class="download-button outline app-store">
        <img src="/icons/mac_store.png" alt="App Store" class="button-icon" />
        <div class="button-text">
          <span>Mac App Store</span>
          <span class="version">1.1.0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面容器：居中布局 */
.mac-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
}

/* 页面标题 */
.mac-title {
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #000000;
  margin-bottom: 200px;
  text-align: center;
}

/* 下载按钮组：水平排列 */
.download-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
  max-width: 460px;
  width: 100%;
  align-items: stretch; /* 确保按钮高度一致 */
}

/* 下载按钮通用样式 */
.download-button {
  flex: 1; /* 平分宽度 */
  min-width: 180px;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 悬停上浮效果 */
.download-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 白色背景按钮 */
.download-button.outline {
  background: white;
}

/* 按钮内图标 */
.button-icon {
  width: 45px;
  height: 45px;
  margin-right: 15px;
}

/* 按钮文字区域 */
.button-text {
  display: flex;
  flex-direction: column;
}

.button-text span {
  font-size: 16px;
  line-height: 1.4;
}

/* 版本号 */
.version {
  font-size: 14px;
  opacity: 0.7;
  font-weight: normal;
}
</style>
