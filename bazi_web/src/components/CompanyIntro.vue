<template>
  <!--
    公司简介组件（绿色背景区域）
    纯展示型组件，无 props/emits
    居中显示公司介绍文案
  -->
  <div class="bottom-green-area">
    <div class="company-intro">
      <div class="company-intro-title">公司简介</div>
      <div class="company-intro-text">
        易德自在（北京）文化科技有限公司，2025年注册于北京，专注于将传统八字命理与现代科技深度融合，打造真正服务于专业命理师与研究者的高效工具的企业。
        核心产品《易德》八字排盘系统，基于真太阳时与系统化命理逻辑构建，提供精准排盘、运势推演与命例管理能力，让复杂的命理分析变得更清晰、更高效、更可沉淀。
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 绿色背景区域：占视口 1/3 高度 */
.bottom-green-area {
  left: 0;
  width: 100%;
  height: 33.33vh;
  background-color: #008000;
  z-index: 0;
  position: relative;
}

/* 简介内容：绝对定位居中，白色文字 */
.company-intro {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  max-width: 800px;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 1.8;
  pointer-events: none; /* 不影响下层交互 */
  padding: 20px 30px;
  border-radius: 10px;
  backdrop-filter: blur(4px); /* 背景虚化效果 */
}

/* 标题 */
.company-intro-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
}

/* 正文 */
.company-intro-text {
  font-size: 16px;
  line-height: 1.8;
}
</style>
