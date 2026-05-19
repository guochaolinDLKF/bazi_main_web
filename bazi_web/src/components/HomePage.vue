<template>
  <!--
    首页组件
    组合产品介绍、平台下载按钮、公司简介和联系信息
    作为中间编排层，将 props 透传给子组件
  -->
  <div class="home-page">
    <div class="content-wrapper">
      <!-- 产品主标题 -->
      <div class="main-title">易德八字</div>

      <!-- 产品功能描述 -->
      <div class="product-description">
        <h3 class="description-title">易德——专业级八字排盘软件，让古老智慧，在指尖重生</h3>
        <h3 class="description-title1">七大功能</h3>
        <p>1. 安全可靠的云存储系统，随时回溯命例分析</p>
        <p>2. 默认启用真太阳时，确保排盘科学准确</p>
        <p>3. 内嵌专业知识提示系统，辅助深度解盘</p>
        <p>4. 吉凶事件日志记录，构建个人命运数据库</p>
        <p>5. 集成权威命理古籍原文，边排盘边参详</p>
        <p>6. 支持流日、流时动态查看，精细追踪运势波动</p>
        <p>7. 创新涂鸦黑板模式，释放思维推演空间</p>
      </div>

      <!-- 产品界面截图 -->
      <div class="product-image-container">
        <img
          src="/icons/product.png"
          alt="易德产品界面展示"
          class="product-image"
          :style="{ width: '1280px', height: '720px' }"
        />
      </div>
    </div>

    <!-- 平台下载按钮组 -->
    <PlatformButtons
      :platforms="platforms"
      :hoverStates="hoverStates"
      :onClick="onPlatformClick"
      :onHover="onHoverState"
    />

    <!-- 公司简介（绿色区域） -->
    <CompanyIntro />

    <!-- 公司联系信息 -->
    <CompanyInfo />
  </div>
</template>

<script setup lang="ts">
import type { Platform } from '../types'
import PlatformButtons from './PlatformButtons.vue'
import CompanyIntro from './CompanyIntro.vue'
import CompanyInfo from './CompanyInfo.vue'

// Props: 接收来自 App.vue 的平台数据和回调函数，透传给子组件
defineProps<{
  /** 平台按钮列表 */
  platforms: Platform[]
  /** 各平台悬停状态 */
  hoverStates: Record<string, boolean>
  /** 平台按钮点击回调 */
  onPlatformClick: (platform: Platform, event: MouseEvent) => void
  /** 悬停状态变化回调 */
  onHoverState: (platformId: string, isHover: boolean) => void
}>()
</script>

<style scoped>
/* 首页容器 */
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

/* 内容包裹器 */
.content-wrapper {
  width: 100%;
}

/* 主标题：绿色大字居中 */
.main-title {
  width: 100%;
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #1D953F;
  margin-top: 120px;
  margin-bottom: 60px;
}

/* 产品描述区域：居中显示 */
.product-description {
  max-width: 600px;
  margin: 0 auto 30px;
  text-align: center;
  color: #000000;
  line-height: 1.6;
}

.product-description p {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 300;
}

.product-description p:last-child {
  margin-bottom: 0;
}

/* 副标题 */
.description-title {
  font-size: 20px;
  font-weight: 500;
  color: #5EA371;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

/* 七大功能标题 */
.description-title1 {
  font-size: 30px;
  font-weight: 600;
  color: #26B74F;
  margin-bottom: 15px;
  padding-bottom: 8px;
}

/* 产品截图容器 */
.product-image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 100px;
}

/* 产品截图 */
.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  transition: all 0.3s ease;
  object-fit: contain;
}

/* === 多级响应式适配 === */

@media (max-width: 1000px) {
  .main-title {
    margin-top: 100px;
    margin-bottom: 50px;
  }
}

@media (max-width: 900px) {
  .product-image { max-width: 90%; }
  .main-title {
    margin-top: 100px;
    margin-bottom: 50px;
  }
}

@media (max-width: 800px) {
  .main-title {
    margin-top: 100px;
    margin-bottom: 50px;
  }
}

@media (max-width: 750px) {
  .main-title {
    margin-top: 100px;
    margin-bottom: 50px;
  }
}

@media (max-width: 680px) {
  .main-title {
    margin-top: 80px;
    margin-bottom: 40px;
  }
}

@media (max-width: 600px) {
  .product-description {
    max-width: 90%;
  }
  .description-title { font-size: 16px; }
  .product-description p { font-size: 14px; }
  .main-title {
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: 32px;
  }
  .product-image-container {
    margin-bottom: 40px;
  }
}

@media (max-width: 400px) {
  .main-title {
    margin-top: 40px;
    margin-bottom: 24px;
    font-size: 28px;
  }
  .description-title {
    font-size: 14px;
  }
  .description-title1 {
    font-size: 22px;
  }
  .product-description p {
    font-size: 13px;
  }
  .product-image-container {
    margin-bottom: 30px;
  }
}
</style>
