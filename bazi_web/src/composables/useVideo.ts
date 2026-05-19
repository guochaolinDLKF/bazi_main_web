import { ref, onBeforeUnmount } from 'vue'

/**
 * 视频播放器 composable（当前模板中已注释，保留以备后续使用）
 * 管理视频播放、暂停、音量控制，以及基于 IntersectionObserver 的可见性自动播放
 *
 * 功能：
 * 1. 播放/暂停切换
 * 2. 视频加载状态追踪
 * 3. 视口可见性自动播放（进入视口播放，离开暂停）
 * 4. 组件卸载时清理观察器和事件监听
 */
export function useVideo() {
  /** 视频元素模板引用 */
  const videoPlayer = ref<HTMLVideoElement | null>(null)
  /** 视频源地址 */
  const videoSource = ref('/videos/01-周易大学-静心面相.mp4')
  /** 视频封面图 */
  const videoPoster = ref('/images/video-poster.jpg')
  /** 视频元数据是否已加载 */
  const videoLoaded = ref(false)
  /** 视频是否已缓冲到可播放状态 */
  const videoCanPlay = ref(false)
  /** 当前是否正在播放 */
  const isPlaying = ref(false)
  /** 音量 0-1 */
  const volume = ref(1)
  /** IntersectionObserver 实例，用于检测视频是否在视口中 */
  const videoObserver = ref<IntersectionObserver | null>(null)

  /**
   * 切换播放/暂停
   */
  const togglePlay = () => {
    if (!videoPlayer.value) return
    if (videoPlayer.value.paused) {
      videoPlayer.value.play()
      isPlaying.value = true
    } else {
      videoPlayer.value.pause()
      isPlaying.value = false
    }
  }

  /**
   * 视频元数据加载完成回调
   */
  const onVideoLoaded = () => {
    videoLoaded.value = true
  }

  /**
   * 视频可播放回调
   */
  const onVideoCanPlay = () => {
    videoCanPlay.value = true
  }

  /**
   * 初始化 IntersectionObserver
   * 当视频进入视口 50% 时自动播放，离开时暂停
   */
  const initVideoObserver = () => {
    if (!videoPlayer.value) return
    videoObserver.value = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 视频进入视口 → 尝试播放
            if (videoPlayer.value!.paused) {
              videoPlayer.value!.muted = false
              videoPlayer.value!.volume = volume.value
              videoPlayer.value!.play().then(() => {
                isPlaying.value = true
              }).catch(error => {
                console.log('自动播放被阻止:', error)
                // 浏览器可能阻止自动播放，重试一次
                videoPlayer.value!.play()
                videoPlayer.value!.muted = false
              })
            }
          } else {
            // 视频离开视口 → 暂停
            if (!videoPlayer.value!.paused) {
              videoPlayer.value!.pause()
              isPlaying.value = false
            }
          }
        })
      },
      { threshold: 0.5 } // 50% 可见时触发
    )
    videoObserver.value.observe(videoPlayer.value)
  }

  /**
   * 组件卸载时清理资源
   * 断开 IntersectionObserver 和移除视频事件监听
   */
  onBeforeUnmount(() => {
    if (videoObserver.value) {
      videoObserver.value.disconnect()
    }
    const video = videoPlayer.value
    if (video) {
      video.removeEventListener('play', () => {})
      video.removeEventListener('pause', () => {})
      video.removeEventListener('ended', () => {})
    }
  })

  return {
    videoPlayer,
    videoSource,
    videoPoster,
    videoLoaded,
    videoCanPlay,
    isPlaying,
    volume,
    togglePlay,
    onVideoLoaded,
    onVideoCanPlay,
    initVideoObserver,
  }
}
