<template>
  <!--
    App.vue —— 应用根组件 / 编排层

    职责：
    1. 组合所有子组件（NavBar / HomePage / MacPage / FooterSection）
    2. 使用 composables 管理全局状态（配置、语言、分析统计、平台下载）
    3. 根据 currentPage 状态切换首页 / Mac 版页面
    4. 处理页脚法律链接的打开逻辑
  -->
  <div class="container">
    <!-- 顶部导航栏 -->
    <NavBar
      :currentPage="currentPage"
      :activeLang="activeLang"
      @update:currentPage="currentPage = $event"
      @update:activeLang="setActiveLang"
    />

    <!-- 主体内容区：按 currentPage 条件渲染不同页面 -->
    <main class="main-content">
      <!-- 首页 -->
      <HomePage
        v-if="currentPage === 'home'"
        :platforms="platforms"
        :hoverStates="hoverStates"
        :onPlatformClick="handleClick"
        :onHoverState="setHoverState"
      />

      <!-- Mac 版下载页 -->
      <MacPage v-if="currentPage === 'mac'" />
    </main>

    <!-- 页脚 -->
    <FooterSection
      @showPrivacy="showPrivacyPolicy"
      @showAgreement="showServiceAgreement"
      @showRights="showRightsStatement"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HomePage from './components/HomePage.vue'
import MacPage from './components/MacPage.vue'
import FooterSection from './components/FooterSection.vue'
import { useConfig } from './composables/useConfig'
import { useLanguage } from './composables/useLanguage'
import { useAnalytics } from './composables/useAnalytics'
import { usePlatforms } from './composables/usePlatforms'

/** 当前显示的页面：'home' 或 'mac' */
const currentPage = ref('home')

// ---- 组合 composables 完成状态管理 ----

/** 配置文件加载 */
const { configData, fetchConfig } = useConfig()

/** 简繁语言切换 */
const { activeLang, setActiveLang } = useLanguage()

/** 数据统计（访问/下载上报） */
const { saveVisitInfo, saveDownInfo } = useAnalytics(configData)

/** 平台按钮管理（数据、悬停状态、点击处理） */
const { platforms, hoverStates, setHoverState, handleClick, fetchPlatformLinks } = usePlatforms(configData, saveDownInfo)

/**
 * 清除所有浏览器本地缓存
 * 每次页面加载时执行，确保用户拿到最新内容
 */
const clearAllCache = () => {
  try {
    localStorage.clear()
    sessionStorage.clear()
  } catch (error) {
    console.error('清除缓存时出错:', error)
  }
}

/**
 * 组件挂载后的初始化流程：
 * 1. 清除缓存
 * 2. 加载远端配置
 * 3. 上报页面访问
 * 4. 拉取各平台最新安装包地址
 */
onMounted(async () => {
  clearAllCache()
  await fetchConfig()
  // 以下两步互不依赖，并行执行
  await Promise.all([
    saveVisitInfo(),
    fetchPlatformLinks(),
  ])
})

// ---- 页脚法律链接处理 ----

const showPrivacyPolicy = () => {
  window.open('/about/privacy.html')
}

const showServiceAgreement = () => {
  window.open('/about/agreement.html')
}

const showRightsStatement = () => {
  window.open('/about/law.html')
}
</script>

<style scoped>
/* 容器和主内容区防止横向溢出 */
.container,
.main-content {
  max-width: 100vw;
  overflow-x: hidden;
}

/* 根容器：纵向弹性布局，最少占满一屏 */
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 主内容区：占据剩余空间，内容居中 */
.main-content {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
}
</style>
