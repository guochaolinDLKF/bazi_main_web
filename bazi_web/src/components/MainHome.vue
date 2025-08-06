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
        <!--<span
            class="nav-item"
            :class="{ active: currentPage === 'mac' }"
            @click="currentPage = 'mac'"
        >Mac</span>-->
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
            'ios-btn': platform.name === 'iOS',
          }"
              @click="handleDownload(platform)"
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

        <!-- 新增视频播放组件 -->
        <!--  <div class="video-container">
            <video
                ref="videoPlayer"
                :poster="videoPoster"
                muted
                playsinline
                @play="onVideoPlay"
                @pause="onVideoPause"
                @loadedmetadata="onVideoLoaded"
                @canplay="onVideoCanPlay"
            >
              <source :src="videoSource" type="video/mp4">
              您的浏览器不支持视频播放。
            </video>-->

            <!-- 新增：视频画面内的播放按钮 -->
        <!--  <div class="video-play-overlay">
           <button @click="togglePlay" class="play-btn-overlay">
             <img :src="isPlaying ? '/icons/pause_video.png' : '/icons/play_video.png'" alt="播放控制">
           </button>
         </div> -->

         <!-- 自定义控制栏 -->
        <!-- <div class="custom-controls">
           <div class="volume-control">
             <button @click="toggleMute" class="control-btn">
               <img :src="isMuted ? '/icons/mute.png' : '/icons/volume.png'" alt="音量控制">
             </button>
             <input
                 type="range"
                 min="0" max="1" step="0.1"
                 v-model="volume"
                 @input="setVolume"
                 class="volume-slider"
             >
           </div>

         </div>
       </div>-->

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
            <img src="/icons/mac_store.png" alt="App Store" class="button-icon"/>
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
import {ref, onMounted, onBeforeUnmount,reactive} from 'vue';
import { AppService } from './AppService';
// 当前激活的语言状态
const activeLang = ref('simplified'); // 默认简体
const currentPage = ref('home'); // 默认显示首页
// 语言切换方法
const setActiveLang = (lang) => {
  activeLang.value = lang; // 更新激活状态
  console.log(lang);
};
// 生命周期钩子
onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  setupVideoEventListeners(); // 新增事件监听

  await requestAndroidCfg();
  await requestWindowsCfg();
});
// 平台按钮数据 - 使用假路径
const platforms = reactive([
  {
    name: "Android",
    icon: "/icons/android.png",
    link: "https://default-android.com"
  },
  {
    name: "Windows",
    icon: "/icons/windows.png",
    link: "https://default-windows.com"
  }
]);
const requestAndroidCfg= async ()=>{
  try {
    const response = await AppService.cfgRequest(
        `http://localhost:80/cfg/Android/Debug/buildList.json`);
    // 这里可以处理返回的数据（如存储到响应式变量中）
    console.log('在MainHome中接收到数据:', response.curVersionInfo);

    updatePlatformLink("Android",
        "http://43.143.225.203:8960/Android"+"/"+
        response.curVersionInfo.buildEnv+"/"+response.curVersionInfo.buildVersion+"/"+
        response.curVersionInfo.fileList[0].fileName)
  } catch (error) {
    console.error('在MainHome中捕获到错误:', error);
    // 这里可以添加错误处理逻辑（如显示错误提示）
  }
};
const requestWindowsCfg= async ()=>{
  try {
    const response = await AppService.cfgRequest(
        `http://localhost:80/cfg/Windows/Debug/buildList.json`);
    // 这里可以处理返回的数据（如存储到响应式变量中）
    console.log('在MainHome中接收到数据:', response.curVersionInfo);

    updatePlatformLink("Windows",
        "http://43.143.225.203:8960/Windows"+"/"+
        response.curVersionInfo.buildEnv+"/"+response.curVersionInfo.buildVersion+"/"+
        response.curVersionInfo.fileList[0].fileName)
  } catch (error) {
    console.error('在MainHome中捕获到错误:', error);
    // 这里可以添加错误处理逻辑（如显示错误提示）
  }
};
const updatePlatformLink = (platformName, newLink) => {
  const platform = platforms.find(p => p.name === platformName);
  if (platform) {
    platform.link = newLink; // 直接修改属性
  }
};
const handleDownload = (platform) => {
  window.open(platform.link, '_blank');
};
// 新增视频相关状态
const videoPlayer = ref(null);
const videoSource = ref('/videos/01-周易大学-静心面相.mp4'); // 假视频地址
const videoPoster = ref('/images/video-poster.jpg'); // 视频封面图
const videoLoaded = ref(false);
const videoCanPlay = ref(false);

// 新增视频控制状态
const isPlaying = ref(false);
const isMuted = ref(true); // 初始静音避免自动播放被阻止
const volume = ref(0.5); // 默认音量50%


// 播放/暂停切换
const togglePlay = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play();
    isPlaying.value = true;
  } else {
    videoPlayer.value.pause();
    isPlaying.value = false;
  }
};
// 静音切换
const toggleMute = () => {
  videoPlayer.value.muted = !videoPlayer.value.muted;
  isMuted.value = videoPlayer.value.muted;
};

// 音量设置
const setVolume = () => {
  videoPlayer.value.volume = volume.value;
  videoPlayer.value.muted = (volume.value === 0);
  isMuted.value = (volume.value === 0);
};
// 视频加载完成回调
const onVideoLoaded = () => {
  videoLoaded.value = true;
  checkVideoPlayback();
};

// 视频可以播放回调
const onVideoCanPlay = () => {
  videoCanPlay.value = true;
  checkVideoPlayback();
};

// 检查是否应该播放视频
const checkVideoPlayback = () => {
  if (!videoPlayer.value || !videoLoaded.value || !videoCanPlay.value) return;

  const videoRect = videoPlayer.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // 当视频顶部进入视口时播放（距离视口顶部小于视口高度）
  if (videoRect.top < viewportHeight) {
    videoPlayer.value.play().catch(error => {
      console.log('自动播放被阻止:', error);
    });
  }
};
const setupVideoEventListeners = () => {
  const video = videoPlayer.value;
  if (!video) return;

  // 视频播放时更新按钮状态
  video.addEventListener('play', () => {
    isPlaying.value = true;
  });

  // 视频暂停时更新按钮状态
  video.addEventListener('pause', () => {
    isPlaying.value = false;
  });

  // 视频结束时更新按钮状态
  video.addEventListener('ended', () => {
    isPlaying.value = false;
  });
};
// 滚动事件处理
const handleScroll = () => {
  if (currentPage.value === 'home' && videoPlayer.value) {
    checkVideoPlayback();
  }
};



onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);

  // 新增：移除视频事件监听
  const video = videoPlayer.value;
  if (video) {
    video.removeEventListener('play', () => {});
    video.removeEventListener('pause', () => {});
    video.removeEventListener('ended', () => {});
  }
});




</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.container {
  position: relative;
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
  margin-bottom: 40px;
}
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 核心垂直居中 */
  width: 100%;
  position: relative;
}
/* 平台按钮区域 */
.platform-buttons {
  display: flex;
  gap: 30px;
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
.download-button.outline:not(.app-store):hover .button-text span {
  color: #4CAF50;
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
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #000000;
  margin-bottom: 200px; /* 统一为200px */
  text-align: center;
}

/* 下载按钮组 */
.download-buttons {
  display: flex;
  flex-direction: row; /* 水平排列 */
  justify-content: center; /* 水平居中 */
  gap: 25px; /* 按钮间距 */
  max-width: 460px; /* 扩展最大宽度 */
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
  width: 45px;
  height: 45px;
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



/* 视频容器样式 */

.video-container {
  position: relative;
  top: 1080px;
}

.video-container {
  width: 100%;
  max-width: 800px;
  margin: 60px auto 0;
  aspect-ratio: 16/9; /* 保持16:9宽高比 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f0f0f0;
}
.video-play-overlay {
  position: absolute;
  bottom: 15px;     /* 距离画面底部15px */
  right: 15px;      /* 距离画面右侧15px */
  z-index: 20;      /* 确保在视频和控制栏上方 */
}
/* 播放按钮样式 */
.play-btn-overlay {
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  width: 46px;      /* 按钮区域宽度 */
  height: 46px;     /* 按钮区域高度 */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.play-btn-overlay img {
  width: 100%;      /* 宽度100%填充容器 */
  height: 100%;     /* 高度100%填充容器 */
  object-fit: contain; /* 等比例缩放并完整显示 */
}
/* 自定义控制栏样式 */
.custom-controls {
  position: absolute;
  left: 15px;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px); /* 减去左右边距 */
}

.control-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.control-btn img {
  width: 24px;
  height: 24px;
  filter: invert(1); /* 白色图标 */
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  accent-color: white; /* 滑块轨道颜色 */
}




</style>