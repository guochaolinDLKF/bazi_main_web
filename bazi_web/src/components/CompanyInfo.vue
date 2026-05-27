<template>
  <!--
    公司联系方式组件（白色背景区域）
    展示公司地址、邮箱和微信客服二维码
    纯展示型组件
  -->
  <div class="white-rectangle">
    <!-- 地址和邮箱：中间用竖线分隔 -->
    <div class="company-info-row">
      <div class="company-address">地址：北京市朝阳区东三环南路98号1幢14层1707</div>
      <span class="divider-text">|</span>
      <div class="company-email">邮箱：ydzzcc@163.com</div>
    </div>

    <!-- 微信客服二维码 -->
    <div class="qr-code-container">
      <div class="qr-code-item">
        <img src="/icons/ios-qr.png" alt="微信客服二维码1" class="qr-code-image" />
        <p class="qr-code-text">微信客服</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 白色背景容器：全宽 */
.white-rectangle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 160px;
  background-color: white;
  padding: 20px 0;
  margin-top: 40px;
}

/* 联系信息行：弹性布局居中 */
.company-info-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

/* 地址和邮箱文字样式 */
.company-address,
.company-email {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  white-space: nowrap; /* 防止换行 */
}

/* 分隔符 */
.divider-text {
  margin: 0 15px;
  color: #999;
}

/* 二维码容器 */
.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  width: 100%;
  max-width: 800px;
}

/* 单个二维码项 */
.qr-code-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 二维码图片 */
.qr-code-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

/* 二维码说明文字 */
.qr-code-text {
  font-size: 10px;
}

/* 窄屏适配：地址和邮箱纵向排列、居中 */
@media (max-width: 600px) {
  .white-rectangle {
    padding: 16px 16px;
  }

  .company-info-row {
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .company-address,
  .company-email {
    font-size: 12px;
    white-space: normal;
    text-align: center;
    width: 100%;
  }

  .divider-text {
    display: none;
  }

  .qr-code-container {
    gap: 40px;
  }

  .qr-code-image {
    width: 64px;
    height: 64px;
  }
}

/* 超窄屏 */
@media (max-width: 360px) {
  .company-address,
  .company-email {
    font-size: 11px;
  }

  .qr-code-image {
    width: 56px;
    height: 56px;
  }
}
</style>
