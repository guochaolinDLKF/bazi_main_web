<template>
  <!--
    顶部导航栏组件
    三栏布局：左侧品牌名 | 中间导航项 | 右侧语言切换
    通过 v-model 风格的事件向上通知页面切换和语言切换
  -->
  <header class="header">
    <!-- 左侧：品牌名称 -->
    <div class="nav-left">
      <div class="main-title-small">易德自在</div>
    </div>

    <!-- 中间：导航项（首页） -->
    <div class="nav-center">
      <span
        class="nav-item"
        :class="{ active: currentPage === 'home' }"
        @click="$emit('update:currentPage', 'home')"
      >首页</span>
    </div>

    <!-- 右侧：简繁语言切换 -->
    <div class="nav-right">
      <div class="lang-container">
        <span
          :class="{ active: activeLang === 'simplified' }"
          @click="$emit('update:activeLang', 'simplified')"
          class="lang-item"
        >简体</span>
        <span
          :class="{ active: activeLang === 'traditional' }"
          @click="$emit('update:activeLang', 'traditional')"
          class="lang-item"
        >繁體</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Props: 从父组件接收当前页面和语言状态
defineProps<{
  currentPage: string
  activeLang: 'simplified' | 'traditional'
}>()

// Emits: 向上通知页面切换和语言切换
defineEmits<{
  'update:currentPage': [page: string]
  'update:activeLang': [lang: 'simplified' | 'traditional']
}>()
</script>

<style scoped>
/* 头部容器：三栏绝对定位布局 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  position: relative;
}

/* 左侧品牌名：定位在 25% 水平位置 */
.nav-left {
  position: absolute;
  left: 25%;
  transform: translateX(-50%);
  font-weight: bold;
}

/* 中间导航区域：绝对居中 */
.nav-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  gap: 30px;
}

/* 品牌名文字样式 */
.main-title-small {
  font-size: 18px;
  font-weight: bold;
  color: #1D953F;
}

/* 导航项基础样式 */
.nav-item {
  font-size: 12px;
  cursor: pointer;
  color: #999;
  position: relative;
  padding: 5px 14px;
}

/* 导航项激活态 */
.nav-item.active {
  color: #000;
  font-weight: normal;
}

/* 激活态下划线（绿色） */
.nav-item.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4CAF50;
}

/* 右侧语言切换：定位在 75% 水平位置 */
.nav-right {
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  flex: 0;
}

/* 语言切换容器：胶囊形状 */
.lang-container {
  position: relative;
  display: flex;
  padding: 4px 7px;
  background: white;
  border-radius: 18px;
  border: 1px solid #e0e0e0;
  justify-content: center;
  align-items: center;
  z-index: 1;
  white-space: nowrap;
  transition: all 0.3s ease;
  max-width: 100%;
}

/* 语言选项样式 */
.lang-item {
  position: relative;
  padding: 3px 20px;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  z-index: 2;
  transition: all 0.2s ease;
}

/* 选中态：白色文字 */
.lang-item.active {
  color: white;
  white-space: nowrap;
}

/* 选中态：绿色胶囊背景（伪元素实现） */
.lang-item.active::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -3px;
  right: -3px;
  bottom: -1px;
  background-color: #1D953F;
  border-radius: 20px;
  z-index: -1;
}

/* 窄屏适配：缩小语言切换按钮内边距 */
@media (max-width: 800px) {
  .lang-item {
    padding: 3px 15px;
  }
}

@media (max-width: 600px) {
  .lang-item {
    padding: 3px 10px;
    font-size: 13px;
  }
}
</style>
