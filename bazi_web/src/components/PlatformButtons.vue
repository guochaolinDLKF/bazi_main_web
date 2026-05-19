<template>
  <!--
    平台下载按钮组组件
    展示五大平台（Android/Windows/HarmonyOS/iOS/MacOS）的下载入口
    支持悬停态切换：
      - Android/Windows：显示"立即下载"覆盖层
      - iOS/HarmonyOS/MacOS：显示"正在研发中"提示
    点击和悬停事件通过回调 props 向上传递
  -->
  <div class="button-container">
    <div class="platform-buttons">
      <div
        v-for="(platform, index) in platforms"
        :key="index"
        class="button"
        @click.stop="onClick(platform, $event)"
        @mouseover="onHover(platform.id, true)"
        @mouseleave="onHover(platform.id, false)"
        :class="{
          'android-btn': platform.name === 'Android',
          'windows-btn': platform.name === 'Windows',
          'ios-btn': platform.name === 'iOS',
          'harmonyos-btn': platform.name === 'HarmonyOS',
          'macos-btn': platform.name === 'MacOS'
        }"
      >
        <!-- 默认显示：图标 + 平台名称 -->
        <div class="original-content" v-show="!hoverStates[platform.id]">
          <img :src="platform.icon" :alt="platform.name" class="icon" />
          <span>{{ platform.name }}</span>
        </div>

        <!-- 悬停提示：正在研发中（iOS/HarmonyOS/MacOS） -->
        <div class="dev-message" v-show="hoverStates[platform.id]">
          正在研发中
        </div>

        <!-- 悬停覆盖层：下载图标 + "立即下载"（Android/Windows） -->
        <div class="download-overlay">
          <img src="/icons/download.png" alt="下载" class="download-icon" />
          <span class="download-text">立即下载</span>
        </div>

        <!-- iOS 二维码覆盖层 -->
        <div class="qr-overlay">
          <img src="/icons/ios-qr.png" alt="iOS下载二维码" class="qr-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Platform } from '../types'

// Props: 平台列表、悬停状态、以及点击/悬停回调
defineProps<{
  platforms: Platform[]
  hoverStates: Record<string, boolean>
  /** 点击按钮回调，参数为平台信息和原生事件 */
  onClick: (platform: Platform, event: MouseEvent) => void
  /** 悬停状态变化回调，参数为平台ID和是否悬停 */
  onHover: (platformId: string, isHover: boolean) => void
}>()
</script>

<style scoped>
/* 按钮区域容器 */
.button-container {
  position: relative;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  transform: none;
  margin-bottom: 0px;
  transition: min-height 0.4s ease;
  min-height: 120px;
}

/* 平台按钮弹性布局：自动换行、居中 */
.platform-buttons {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  max-width: 100%;
  align-content: flex-start;
  transition: gap 0.3s ease;
}

/* 单个按钮样式 */
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border: 1px solid #ffffff;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

/* 按钮悬停上浮效果 */
.button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 平台图标 */
.icon {
  width: 50px;
  height: 50px;
  margin-bottom: 13px;
}

.button span {
  font-size: 14px;
}

/* Android/Windows 按钮悬停背景 */
.android-btn:hover,
.windows-btn:hover {
  background-color: #ffffff !important;
  position: relative;
}

/* 原始内容层：占满按钮空间 */
.original-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* 下载覆盖层：默认隐藏，绝对定位覆盖按钮 */
.download-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

/* Android/Windows 悬停时显示下载覆盖层 */
.android-btn:hover .download-overlay,
.windows-btn:hover .download-overlay {
  display: flex;
  background-color: #ffffff;
}

/* Android/Windows 悬停时隐藏原始内容 */
.android-btn:hover .original-content,
.windows-btn:hover .original-content {
  visibility: hidden;
}

/* 下载图标 */
.download-icon {
  width: 54px;
  height: 54px;
  margin-bottom: 6px;
}

/* "立即下载"文字 */
.download-text {
  font-family: 'OPPOSans-M', sans-serif;
  color: #1D953F;
  font-size: 21px;
  font-weight: normal;
}

/* 二维码覆盖层：默认隐藏 */
.qr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.qr-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

/* iOS 按钮悬停效果 */
.ios-btn:hover {
  background-color: #ffffff !important;
}

.ios-btn:hover .original-content {
  visibility: hidden;
}

/* "正在研发中"提示，默认隐藏 */
.dev-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
  font-weight: bold;
}

/* 尚未发布平台悬停时显示研发提示 */
.harmonyos-btn:hover .dev-message,
.ios-btn:hover .dev-message,
.macos-btn:hover .dev-message {
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 2;
}

/* === 响应式适配 === */

@media (max-width: 1000px) {
  .button-container {
    bottom: 10%;
    min-height: 180px;
  }
  .platform-buttons {
    gap: 30px;
    row-gap: 30px;
  }
}

@media (max-width: 800px) {
  .platform-buttons {
    gap: 30px;
    row-gap: 30px;
  }
}

@media (max-width: 600px) {
  .button-container {
    bottom: 25%;
    min-height: 240px;
  }
  .platform-buttons {
    gap: 20px;
    row-gap: 20px;
  }
}
</style>
