import { ref } from 'vue'
import { convertDOM } from '../zhConverter'
import { logger } from '../utils/logger'

/**
 * 语言切换 composable
 * 管理简体中文/繁体中文状态，通过 DOM 遍历实现全页面实时简繁转换
 *
 * @returns activeLang  - 当前语言状态（simplified | traditional）
 * @returns setActiveLang - 切换语言并触发 DOM 转换
 * @returns initLanguage  - 初始化时若为繁体则执行转换
 */
export function useLanguage() {
  /** 当前激活的语言，默认简体 */
  const activeLang = ref<'simplified' | 'traditional'>('simplified')

  /**
   * 切换语言
   * 更新响应式状态并遍历 DOM 替换所有文本节点中的字符
   * @param lang 目标语言
   */
  const setActiveLang = (lang: 'simplified' | 'traditional') => {
    logger.info(`[Language] 切换语言: ${activeLang.value} → ${lang}`)
    activeLang.value = lang
    // 调用 zhConverter 全局转换函数，true 表示转为繁体
    convertDOM(lang === 'traditional')
  }

  /**
   * 初始化语言状态
   * 如果保存的语言偏好为繁体，则在页面加载完成后执行转换
   */
  const initLanguage = () => {
    if (activeLang.value === 'traditional') {
      logger.debug('[Language] 初始化为繁体，执行 DOM 转换')
      convertDOM(true)
    }
  }

  return { activeLang, setActiveLang, initLanguage }
}
