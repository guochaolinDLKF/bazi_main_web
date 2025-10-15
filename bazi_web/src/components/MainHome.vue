<template>
  <div class="container">

    <!-- <div v-if="showAlertPopup" class="popup-mask">
     <div class="popup-container">
       <div class="popup-content">
         <h3>重要通知</h3>
         <p>请访问我们的新官网获取更多服务</p>
       </div>
       <button @click="redirectToNewPage" class="popup-button">前往新页面</button>
     </div>
   </div>-->

    <!-- 顶部导航栏 - 修正为三栏布局 -->
    <header class="header">

      <!-- 左侧标题 -->
      <div class="nav-left">
        <div class="main-title-small">易德自在</div>
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
        <div class="content-wrapper">
          <div class="main-title">易德八字</div>

          <!--  <div class="product-description">
              <h3 class="description-title">易德——专业级八字排盘软件，让古老智慧，在指尖重生</h3>
              <h3 class="description-title1">七大功能</h3>
              <p>1. 安全可靠的云存储系统，随时回溯命例分析</p>
              <p>2. 默认启用真太阳时，确保排盘科学准确</p>
              <p>3. 内嵌专业知识提示系统，辅助深度解盘</p>
              <p>4. 吉凶事件日志记录，构建个人命运数据库</p>
              <p>5. 集成权威命理古籍原文，边排盘边参详</p>
              <p>6. 支持流日、流时动态查看，精细追踪运势波动</p>
              <p>7. 创新涂鸦黑板模式，释放思维推演空间</p>


            </div>-->
          <!-- <div class="product-image-container">
             <img
                 src="/icons/product.png"
                 alt="易德产品界面展示"
                 class="product-image"
                 :style="{
                   width: '1280px',
                   height: '720px'
                 }"
             />
           </div>-->

        </div>
        <div class="button-container">
          <div class="platform-buttons">
            <div
                v-for="(platform, index) in platforms"
                :key="index"
                class="button"
                @click.stop="handleClick(platform, $event)"
                @mouseover="setHoverState(platform.id, true)"
                @mouseleave="setHoverState(platform.id, false)"
                :class="{
            'android-btn': platform.name === 'Android',
            'windows-btn': platform.name === 'Windows',
            'ios-btn': platform.name === 'iOS',
            'harmonyos-btn': platform.name === 'HarmonyOS',
            'macos-btn': platform.name === 'MacOS'
          }"
            >
              <!-- 默认显示内容 -->
              <div class="original-content" v-show="!hoverStates[platform.id]">
                <img :src="platform.icon" :alt="platform.name" class="icon"/>
                <span>{{ platform.name }}</span>
              </div>
              <!-- 悬停时显示的研发提示 -->
              <div class="dev-message" v-show="hoverStates[platform.id]">
                正在研发中
              </div>
              <!-- 鼠标悬停时显示的内容（仅Android和Windows按钮） -->
              <div class="download-overlay">
                <img src="/icons/download.png" alt="下载" class="download-icon"/>
                <span class="download-text">立即下载</span>
              </div>
              <!-- 二维码覆盖层 -->
              <div class="qr-overlay">
                <img src="/icons/ios-qr.png" alt="iOS下载二维码" class="qr-image"/>
              </div>
            </div>
          </div>
        </div>
        <!-- 绿色区域 - 移动到按钮和视频之间 -->
        <div class="bottom-green-area"></div>


        <!-- 视频播放组件 -->
        <!-- <div class="video-container">
           <video
               ref="videoPlayer"
               :poster="videoPoster"
               playsinline
               muted
               @loadedmetadata="onVideoLoaded"
               @canplay="onVideoCanPlay"
               class="custom-video"
           >
             <source :src="videoSource" type="video/mp4">
             您的浏览器不支持视频播放。
           </video>

          <div class="video-play-overlay">
            <button @click="togglePlay" class="play-btn-overlay">
              <img :src="isPlaying ? '/icons/pause_video.png' : '/icons/play_video.png'" alt="播放控制">
            </button>
          </div>

        </div> -->

        <div class="white-rectangle">

          <!-- <div class="company-info-row">
             <div class="company-address">地址：北京市朝阳区东三环南路98号1幢14层1707</div>
             <div class="divider"></div>
             <div class="divider"></div>
             <div class="divider"></div>
             <div class="divider"></div>
             <div class="company-email">邮箱：ydzzcc@163.com</div>
           </div>-->

          <div class="qr-code-container">
            <div class="qr-code-item">
              <img src="/icons/ios-qr.png" alt="微信客服二维码1" class="qr-code-image"/>
              <p class="qr-code-text">微信客服</p>
            </div>
            <!--<div class="qr-code-item">
              <img src="/icons/ios-qr.png" alt="微信客服二维码2" class="qr-code-image"/>
              <p class="qr-code-text">微信客服2</p>
            </div>-->
          </div>
        </div>
      </div>

      <!-- Mac版页面 -->
      <div v-if="currentPage === 'mac'" class="mac-page">
        <div class="mac-title">易德自在MacOS版</div>

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
    <!-- 新增底部信息区域 -->
    <footer class="footer-section">
      <div class="footer-links">
        <a @click="showPrivacyPolicy">隐私政策</a>
        <span class="separator">|</span>
        <a @click="showServiceAgreement">服务协议</a>
        <span class="separator">|</span>
        <a @click="showRightsStatement">权利声明</a>
      </div>
      <div class="footer-records">

        <span>ICP证：</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" style="color:#939393;">京ICP备2025146375号-1</a>
        <span></span>
        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=11010502057604" rel="noreferrer"  target="_blank">
          <img class="footer-auth-icon" src="/icons/gongan.png">
          <span style="color:#939393;">京公网安备11010502057604号</span>
        </a>
        <span></span>
        <p>
          Copyright ©2025-2025 <a href="/" class="red">易德八字</a>. All Right Reserved.
        </p>
      </div>
    </footer>
  </div>


</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, reactive} from 'vue';
import {convertDOM} from './../zhConverter';
import {AppService} from './AppService';


const configData = ref(null); // 存储配置数据
// 当前激活的语言状态
const activeLang = ref('simplified'); // 默认简体
const currentPage = ref('home'); // 默认显示首页


const showAlertPopup = ref(true); // 控制弹窗显示

// 跳转到新页面
const redirectToNewPage = () => {
  showAlertPopup.value = false;
  document.body.style.overflow = ''; // 恢复页面滚动
  window.location.href = 'https://www.ydzz.cc/index.html'; // 替换为目标URL
};


const fetchConfig = async () => {
  try {
    const response = await fetch('/config/config.json'); // 假设配置文件在public目录下
    if (!response.ok) throw new Error('配置加载失败');
    configData.value = await response.json();
    //console.log('配置文件加载成功!!');
  } catch (error) {
    console.error('配置文件读取错误:', error);
  }
};

// 语言切换方法
const setActiveLang = (lang) => {
  activeLang.value = lang; // 更新激活状态
  console.log(lang);
  convertDOM(lang === 'traditional');
};
// 生命周期钩子
onMounted(async () => {

  //if (showAlertPopup.value) {
  // document.body.style.overflow = 'hidden';
  //}

  if (activeLang.value === 'traditional') {
    convertDOM(true);
  }

  await fetchConfig();

  await saveVisitInfo();
  await requestAndroidCfg();
  await requestWindowsCfg();

  // 初始化视频观察器
  setTimeout(() => {
    initVideoObserver();
  }, 100);
});
// 平台按钮数据 - 使用假路径
const platforms = reactive([
  {
    name: "Android",
    id: "android",
    icon: "/icons/android.png",
    link: "https://default-android.com"
  }
  ,
  {
    name: "Windows",
    id: "windows",
    icon: "/icons/windows.png",
    link: "https://default-windows.com"
  }
  ,
  {
    name: "HarmonyOS",
    id: "harmony",
    icon: "/icons/harmonyos.png",
    link: "https://default-harmonyos.com"
  },
  {
    name: "iOS",
    id: "ios",
    icon: "/icons/ios.png",
    link: "https://default-harmonyos.com"
  },
  {
    name: "MacOS",
    id: "mac",
    icon: "/icons/macos.png",
    link: "https://default-macos.com"
  }
]);

const saveVisitInfo = async () => {
  var cfg = configData.value;
  var url = cfg.optionUrl + "/game/visit_page";
  //console.log(url);
  await AppService.getRequest(url);
};
const saveDownInfo = async (platform) => {
  var cfg = configData.value;
  var url = cfg.optionUrl + "/game/down_info?downPlatform=" + platform;
  //console.log(url);
  await AppService.getRequest(url);
};
const requestAndroidCfg = async () => {
  try {
    var cfg = configData.value;
    var url = cfg.address + "/package/Android/" + cfg.mode + "/buildList.json";
    //console.log(url)
    const response = await AppService.getRequest(url);

    url = cfg.address + "/package/Android" + "/" +
        response.curVersionInfo.buildEnv + "/" + response.curVersionInfo.buildVersion + "/" +
        response.curVersionInfo.fileList[0].fileName;
    //console.log(url)
    updatePlatformLink("Android", url)
  } catch (error) {
    console.error('在MainHome中捕获到错误:', error);
    // 这里可以添加错误处理逻辑（如显示错误提示）
  }
};
const requestWindowsCfg = async () => {
  try {
    var cfg = configData.value;
    var url = cfg.address + "/package/Windows/" + cfg.mode + "/buildList.json";
    //console.log(url)
    const response = await AppService.getRequest(url);
    url = cfg.address + "/package/Windows" + "/" +
        response.curVersionInfo.buildEnv + "/" + response.curVersionInfo.buildVersion + "/" +
        response.curVersionInfo.fileList[0].fileName;
    //console.log(url)
    updatePlatformLink("Windows", url)
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
const handleClick = (platform, event) => {
  // 阻止HarmonyOS/iOS/MacOS的链接跳转
  if (['HarmonyOS', 'iOS', 'MacOS'].includes(platform.name)) {
    event.preventDefault(); // 阻止默认行为
    return; // 不执行后续逻辑
  }
  saveDownInfo(platform.name);
  // 其他平台正常跳转
  window.open(platform.link, '_blank');
}
// 新增视频相关状态
const videoPlayer = ref(null);
const videoSource = ref('/videos/01-周易大学-静心面相.mp4'); // 假视频地址
const videoPoster = ref('/images/video-poster.jpg'); // 视频封面图
const videoLoaded = ref(false);
const videoCanPlay = ref(false);

// 新增视频控制状态
const isPlaying = ref(false);
const volume = ref(1); // 默认音量50%

// Intersection Observer用于检测视频可见性
const videoObserver = ref(null);

const hoverStates = reactive({
  harmony: false,
  ios: false,
  mac: false
})

const setHoverState = (platform, isHover) => {
  hoverStates[platform] = isHover
}


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

// 视频加载完成回调
const onVideoLoaded = () => {
  videoLoaded.value = true;
};

// 视频可以播放回调
const onVideoCanPlay = () => {
  videoCanPlay.value = true;
};

// 初始化Intersection Observer来检测视频可见性
const initVideoObserver = () => {
  if (!videoPlayer.value) return;
  console.log("initVideoObserver")
  videoObserver.value = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 视频进入视口，尝试播放
            if (videoPlayer.value.paused) {
              videoPlayer.value.muted = false;
              videoPlayer.value.volume = volume.value;
              videoPlayer.value.play().then(() => {
                isPlaying.value = true;

              }).catch(error => {
                console.log('自动播放被阻止:', error);
                videoPlayer.value.play();
                videoPlayer.value.muted = false;
              });

            }
          } else {
            // 视频离开视口，暂停播放
            if (!videoPlayer.value.paused) {
              videoPlayer.value.pause();
              isPlaying.value = false;
            }
          }
        });
      },
      {
        threshold: 0.5, // 当50%的视频在视口中时触发
      }
  );
  videoObserver.value.observe(videoPlayer.value);

};


onBeforeUnmount(() => {

// 销毁Intersection Observer
  if (videoObserver.value) {
    videoObserver.value.disconnect();
  }

  // 移除视频事件监听
  const video = videoPlayer.value;
  if (video) {
    video.removeEventListener('play', () => {
    });
    video.removeEventListener('pause', () => {
    });
    video.removeEventListener('ended', () => {
    });
  }
});

const showPrivacyPolicy = () => {
  // 这里可以实现隐私政策的展示逻辑
  console.log('显示隐私政策');
  // 实际应用中可能是:
  window.open('/about/privacy.html');
  // 或者显示一个模态框
};

const showServiceAgreement = () => {
  window.open('/about/agreement.html');
};

const showRightsStatement = () => {
  console.log('显示权利声明');
  window.open('/about/law.html');
};
</script>

<style scoped>

.product-image-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 100px;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  transition: all 0.3s ease;
  object-fit: contain;
}

.description-title1 {
  font-size: 30px;
  font-weight: 600;
  color: #26B74F;
  margin-bottom: 15px;
  padding-bottom: 8px;
}
.description-title {
  font-size: 20px;
  font-weight: 500;
  color: #5EA371;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* 添加底部边框，与微信风格一致 */
}
.product-description {
  width: 40%;
  margin: 20px auto 30px;
  text-align: left;
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
@media (max-width: 1200px) {
  .product-description{
    width: 40%;
  }
}

@media (max-width: 900px) {
  .product-description{
    width: 40%;
  }

  .product-image {
    max-width: 90%;
  }
}

@media (max-width: 600px) {
  .product-description{
    width: 70%;
  }

  .description-title {
    font-size: 16px;
  }

  .product-description p {
    font-size: 14px;
  }
}

body * {
  transition: opacity 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.container, .main-content, .home-page {
  max-width: 100vw; /* 关键：限制所有容器不超出视口 */
  overflow-x: hidden;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5; /* 浅灰色背景 */
}

.bottom-green-area {
  left: 0;
  width: 100%;
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

.main-title-small {
  font-size: 18px;
  font-weight: bold;
  color: #1D953F;
}

.main-title,
.button-container,
.bottom-green-area,
.video-container {
  position: relative; /* 关键：使元素跟随页面滚动 */
  transform: none; /* 移除可能存在的变换 */
  z-index: auto; /* 重置层级 */
}

.nav-item {
  font-size: 12px;
  cursor: pointer;
  color: #999;
  position: relative;
  padding: 5px 14px;
}

.nav-item.active {
  color: #000;
  font-weight: normal;
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
  white-space: nowrap;
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
  white-space: nowrap;
}

/* 关键修复：调整绿色背景位置 */
.lang-item.active::before {
  content: "";
  position: absolute;
  top: -1px; /* 顶部间距一致 */
  left: -3px; /* 左侧间距一致 */
  right: -3px; /* 右侧间距一致 */
  bottom: -1px; /* 底部间距一致 */
  background-color: #1D953F;
  border-radius: 20px; /* 与容器相同圆角 */
  z-index: -1; /* 确保在文字下方 */
}


/* 选中状态文字变白 */
.lang-item.active {
  color: white;
}

.lang-container {
  transition: all 0.3s ease; /* 添加平滑过渡效果 */
  max-width: 100%; /* 确保不超过容器宽度 */
}

/* 窄屏时调整语言项内边距 */
@media (max-width: 800px) {
  .lang-item {
    padding: 3px 15px; /* 缩小左右内边距 */
  }
}

/* 超窄屏时进一步缩小 */
@media (max-width: 600px) {
  .lang-item {
    padding: 3px 10px; /* 进一步缩小内边距 */
    font-size: 13px; /* 稍微缩小字体 */
  }
}

/* 主体内容样式 */
.main-content {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-title {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  text-align: center;
  width: 100%;
  font-size: 45px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #1D953F;
  transition: top 0.4s ease; /* 标题位置变化过渡 */

  margin-top: 120px; /* 可根据需要添加间距 */
  margin-bottom: 400px;
}

/* 窄屏时上移标题 */
@media (max-width: 1000px) {
  .main-title {
    top: 0; /* 移除固定定位 */
    margin-top: 100px;
    margin-bottom: 200px;
  }

  .button-container {
    bottom: unset; /* 移除固定定位 */
    min-height: 180px;
    margin-bottom: 10px;
  }
}

@media (max-width: 900px) {
  .main-title {
    top: unset !important; /* 移除固定定位 */
    margin-top: 100px;
    margin-bottom: 200px;
  }

  .button-container {
    bottom: unset; /* 移除固定定位 */
    min-height: 240px;
    margin-bottom: 20px;
  }
}

@media (max-width: 800px) {
  .main-title {
    top: unset !important; /* 移除固定定位 */
    margin-top: 100px;
    margin-bottom: 200px;
  }

  .button-container {
    bottom: unset; /* 移除固定定位 */
    min-height: 240px;
    margin-bottom: 20px;
  }
}

/* 超窄屏时进一步上移标题 */
@media (max-width: 750px) {
  .main-title {
    top: unset !important; /* 移除固定定位 */
    margin-top: 100px;
    margin-bottom: 200px;
  }

  .button-container {
    bottom: unset; /* 移除固定定位 */
    min-height: 240px;
    margin-bottom: 20px;
  }
}

@media (max-width: 680px) {
  .main-title {
    top: unset !important; /* 移除固定定位 */
    margin-top: 80px;
    margin-bottom: 100px;
  }

  .button-container {
    bottom: unset; /* 移除固定定位 */
    min-height: 240px;
    margin-bottom: 20px;
  }
}

/* 超窄屏时进一步上移标题 */
@media (max-width: 600px) {
  .main-title {
    top: unset !important; /* 移除固定定位 */
    margin-top: 80px;
    margin-bottom: 70px;
  }

  .button-container {
    bottom: unset; /* 移除固定定位 */
    min-height: 240px;
    margin-bottom: 20px;
  }
}

.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 核心垂直居中 */
  width: 100%;
  position: relative;
}

@media (max-width: 800px) {
  .platform-buttons {
    gap: 30px; /* 缩小间距 */
    row-gap: 30px; /* 行间距 */
  }
}

/* 新增：超窄屏时进一步调整 */
@media (max-width: 600px) {
  .platform-buttons {
    gap: 20px;
    row-gap: 20px;
  }
}

/* 平台按钮区域 */
.platform-buttons {
  display: flex;
  flex-wrap: wrap; /* 关键：允许换行 */
  flex-direction: row;
  justify-content: center; /* 保持居中 */
  gap: 50px;
  max-width: 100%; /* 防止超出容器 */
  align-content: flex-start;
  transition: gap 0.3s ease;
}

@media (max-width: 1000px) {
  .button-container {
    bottom: 10%; /* 下移按钮区域 */
    min-height: 180px; /* 增加最小高度 */
  }

  .platform-buttons {
    gap: 30px; /* 缩小间距 */
    row-gap: 30px;
  }
}

/* 超窄屏时进一步增加高度 */
@media (max-width: 600px) {
  .button-container {
    bottom: 25%; /* 继续下移 */
    min-height: 240px; /* 进一步增加高度 */
  }

  .platform-buttons {
    gap: 20px;
    row-gap: 20px;
  }
}

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
  transition: min-height 0.4s ease; /* 添加高度变化过渡 */
  min-height: 120px; /* 基础高度 */

}


.android-btn:hover,
.windows-btn:hover {
  background-color: #ffffff !important; /* 绿色背景 */
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
  background-color: #ffffff; /* 绿色背景 */
}

/* 确保原始内容在悬停时隐藏 */
.android-btn:hover .original-content,
.windows-btn:hover .original-content {
  visibility: hidden; /* 隐藏原始内容（保留布局空间） */
}

.download-icon {
  width: 54px;
  height: 54px;
  margin-bottom: 6px;
}

.download-text {
  font-family: 'OPPOSans-M', sans-serif; /* 新增字体设置 */
  color: #1D953F;
  font-size: 21px;
  font-weight: normal;
}

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
}

.button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.icon {
  width: 50px;
  height: 50px;
  margin-bottom: 13px;
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
  width: 100px; /* 二维码尺寸 */
  height: 100px;
  object-fit: contain;
}

/* iOS按钮悬停时效果 */
.ios-btn:hover {
  background-color: #ffffff !important; /* 绿色背景 */
}

.ios-btn:hover .original-content {
  visibility: hidden; /* 隐藏原始内容（保留布局空间） */
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

.harmonyos-btn:hover .dev-message,
.ios-btn:hover .dev-message,
.macos-btn:hover .dev-message {
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 2;
}

/* 视频容器样式 */

.video-container {
  position: relative;
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
  bottom: 15px; /* 距离画面底部15px */
  right: 15px; /* 距离画面右侧15px */
  z-index: 20; /* 确保在视频和控制栏上方 */
}

/* 播放按钮样式 */
.play-btn-overlay {
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  width: 46px; /* 按钮区域宽度 */
  height: 46px; /* 按钮区域高度 */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-btn-overlay img {
  width: 100%; /* 宽度100%填充容器 */
  height: 100%; /* 高度100%填充容器 */
  object-fit: contain; /* 等比例缩放并完整显示 */
}


.control-btn img {
  width: 24px;
  height: 24px;
  filter: invert(1); /* 白色图标 */
}

/* 修改视频容器样式 */
.video-container {
  position: relative; /* 改为相对定位 */
  width: 100%;
  max-width: 800px; /* 限制最大宽度 */
  margin-top: 100px; /* 确保顶部无额外间距 */
  margin-bottom: 40px; /* 底部添加一些间距 */
  aspect-ratio: 16/9; /* 保持宽高比 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 10; /* 确保视频在绿色区域上方 */
}

/* 隐藏所有浏览器默认视频控制条 */
.custom-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 隐藏所有控制条 */

  ::-webkit-media-controls {
    display: none !important;
  }

  /* Firefox */
  scrollbar-width: none;
  /* IE和Edge */
  -ms-overflow-style: none;
}


/* 调整底部绿色区域 */
.bottom-green-area {
  width: 100%;
  height: 33.33vh; /* 保持高度 */
  background-color: #008000; /* 绿色 */
  z-index: 0; /* 确保层级 */
}

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

.company-info-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.company-address,
.company-email {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  white-space: nowrap; /* 防止文字换行 */
}

.divider {
  margin: 0 15px;
  color: #999;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .company-address,
  .company-email {
    font-size: 12px;
  }

  .divider {
    margin: 0 8px;
  }
}

.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px; /* 两个二维码之间的间距 */
  width: 100%;
  max-width: 800px;
}

.qr-code-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-code-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 10px;
}

.qr-code-text {
  font-size: 10px;
}

/* 确保主内容区域有足够空间 */
.main-content {
  padding-bottom: 0; /* 增加底部内边距确保内容不被绿色区域覆盖 */
}


/* 新增底部样式 */
.footer-section {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  margin-top: auto; /* 确保 footer 始终在底部 */
}

.footer-links {
  margin-bottom: 10px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #1D953F;
}

.separator {
  margin: 0 10px;
  color: #ccc;
}

.footer-records {
  font-size: 10px;
  color: #999;
}

.footer-records span {
  margin: 0 8px;
}

/* 响应式调整 */
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


/* 在style中添加以下样式 */
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.popup-container {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 80%;
  width: 400px;
  text-align: center;
}

.popup-content h3 {
  font-size: 22px;
  color: #1D953F;
  margin-bottom: 15px;
}

.popup-content p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 25px;
}

.popup-button {
  background-color: #1D953F;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-button:hover {
  background-color: #167530;
}
</style>