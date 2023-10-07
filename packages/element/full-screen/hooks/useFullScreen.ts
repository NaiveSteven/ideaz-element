import type { EnhancedHTMLElement } from '@ideaz/utils'
import {
  enterFullscreen,
  exitFullscreen,
  getFullscreenElement,
  isFullscreen,
  isFunction,
  listenFullscreen,
} from '@ideaz/utils'

export interface UseFullscreenOptions {
  getElement?: (() => EnhancedHTMLElement) | HTMLElement
  onFullscreenChange?: (state: boolean) => void
}

export const useFullscreen = ({ getElement = () => document.body, onFullscreenChange }: UseFullscreenOptions = {}) => {
  const isTargetFullscreen = ref(false)
  const checkFullscreenStatus = () => {
    const element = isFunction(getElement) ? getElement() : getElement
    const isFullscreenFlag = isFullscreen()
    isTargetFullscreen.value = isFullscreenFlag ? (getFullscreenElement() || document.body) === element : false
  }
  const toggleFullscreen = () => {
    const element = isFunction(getElement) ? getElement() : getElement
    checkFullscreenStatus()
    if (isTargetFullscreen.value === true)
      exitFullscreen()

    else
      enterFullscreen(element)
  }
  onMounted(() => {
    checkFullscreenStatus()
    listenFullscreen(() => {
      checkFullscreenStatus()
      onFullscreenChange?.(isTargetFullscreen.value)
    })
  })

  return {
    isTargetFullscreen,
    toggleFullscreen,
  }
}
