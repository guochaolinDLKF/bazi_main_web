<template>
  <!--
    页脚组件
    包含：法律链接（隐私政策/服务协议/权利声明）、ICP 备案号、公网安备号、版权信息
    法律链接点击事件向上 emit，由 App.vue 统一处理
  -->
  <footer class="footer-section">
    <!-- 法律文件链接 -->
    <div class="footer-links">
      <a @click="$emit('showPrivacy')">隐私政策</a>
      <span class="separator">|</span>
      <a @click="$emit('showAgreement')">服务协议</a>
      <span class="separator">|</span>
      <a @click="$emit('showRights')">权利声明</a>
    </div>

    <!-- 备案号和版权信息 -->
    <div class="footer-records">
      <span>ICP证：</span>
      <a href="https://beian.miit.gov.cn/" target="_blank" style="color:#939393;">京ICP备2025146375号-1</a>
      <span></span>
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11010502057604" rel="noreferrer" target="_blank">
        <img class="footer-auth-icon" src="/icons/gongan.png" />
        <span style="color:#939393;">京公网安备11010502057604号</span>
      </a>
      <span></span>
      <p>
        Copyright ©2025-2025 <a href="/" class="red">易德八字</a>. All Right Reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Emits: 点击法律链接时向上通知
defineEmits<{
  showPrivacy: []
  showAgreement: []
  showRights: []
}>()
</script>

<style scoped>
/* 页脚容器 */
.footer-section {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  margin-top: auto; /* 始终保持底部 */
}

/* 法律链接行 */
.footer-links {
  margin-bottom: 10px;
}

/* 链接样式 */
.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
}

/* 链接悬停高亮 */
.footer-links a:hover {
  color: #1D953F;
}

/* 链接分隔符 */
.separator {
  margin: 0 10px;
  color: #ccc;
}

/* 备案信息区域 */
.footer-records {
  font-size: 10px;
  color: #999;
}

.footer-records span {
  margin: 0 8px;
}

/* 公安备案图标 */
.footer-auth-icon {
  vertical-align: middle;
  margin-right: 4px;
}

/* 窄屏：备案信息纵向排列 */
@media (max-width: 600px) {
  .footer-records {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .footer-records span {
    margin: 0;
  }
}
</style>
