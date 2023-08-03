export interface EnhancedHTMLElement extends HTMLElement {
  webkitRequestFullScreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
}

interface EnhancedDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>
  /**
     * @deprecated https://developer.apple.com/documentation/webkit/domdocument/1494852-webkitcancelfullscreen
     */
  webkitCancelFullScreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
  webkitFullScreenEnabled?: boolean
  mozFullScreenEnabled?: boolean
  msFullScreenEnabled?: boolean
  webkitFullscreenElement?: Element
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
}

export function isUndefined(val: unknown): val is undefined {
  return val === undefined
}

/**
 * @description 判断浏览器当前状态是否允许进入全屏
 */
export function isFullscreenEnabled(): boolean {
  return !!(
    (document as EnhancedDocument).fullscreenEnabled
        || (document as EnhancedDocument).webkitFullScreenEnabled
        || (document as EnhancedDocument).mozFullScreenEnabled
        || (document as EnhancedDocument).msFullScreenEnabled
  )
}

/**
 * @description 获取全屏元素
 */
export function getFullscreenElement(): Element | null {
  const doc: EnhancedDocument = document
  return doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement || null
}

/**
 * @description 判断当前是否是全屏状态
 */
export function isFullscreen(): boolean {
  return !!getFullscreenElement() || window.innerHeight === window.screen.height
}

/**
 * 退出全屏
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen
 */
export async function exitFullscreen() {
  const doc: EnhancedDocument = document
  try {
    if (doc.exitFullscreen)
      await doc.exitFullscreen()

    else if (doc.webkitExitFullscreen)
      await doc.webkitExitFullscreen()

    else if (doc.webkitCancelFullScreen)
      await doc.webkitCancelFullScreen()

    else if (doc.mozCancelFullScreen)
      await doc.mozCancelFullScreen()

    else if (doc.msExitFullscreen)
      await doc.msExitFullscreen()

    else
      throw new Error('该浏览器不支持全屏API')
  }
  catch (err) {
    console.error(err)
  }
}

/**
 * 进入全屏
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen
 * 存在 top-layer 叠加问题，如果要规避叠加顺序带来的问题，需要手动判断全屏状态，如果当前已经是全屏状态，可以先退出全屏，再让目标元素进入全屏
 * @param {EnhancedHTMLElement} [element=document.body] - 全屏目标元素，默认是 body
 * @param {FullscreenOptions} options - 全屏选项
 */
export async function enterFullscreen(element: EnhancedHTMLElement = document.body, options?: FullscreenOptions) {
  try {
    if (element.requestFullscreen)
      await element.requestFullscreen(options)

    else if (element.webkitRequestFullScreen)
      await element.webkitRequestFullScreen()

    else if (element.mozRequestFullScreen)
      await element.mozRequestFullScreen()

    else if (element.msRequestFullscreen)
      await element.msRequestFullscreen()

    else
      throw new Error('该浏览器不支持全屏API')
  }
  catch (err) {
    console.error(err)
  }
}

/**
 * @description 监听全屏变化事件
 * @param {Function} callback 回调函数
 * @param {boolean|AddEventListenerOptions} options 监听事件选项
 */
export function listenFullscreen(callback: EventListener, options?: boolean | AddEventListenerOptions): void {
  const doc: EnhancedDocument = document
  if (!isUndefined(doc.exitFullscreen))
    doc.addEventListener('fullscreenchange', callback, options)

  else if (doc.webkitExitFullscreen)
    doc.addEventListener('webkitfullscreenchange', callback, options)

  else if (doc.mozCancelFullScreen)
    doc.addEventListener('mozfullscreenchange', callback, options)

  else if (doc.msExitFullscreen)
    doc.addEventListener('MSFullscreenChange', callback, options)

  else
    throw new Error('该浏览器不支持全屏API')
}

/**
 * @description 移除监听全屏变化事件
 * @param {Function} callback 回调函数
 * @param {boolean|EventListenerOptions} options 监听事件选项
 */
export function unlistenFullscreen(callback: EventListener, options?: boolean | EventListenerOptions): void {
  const doc: EnhancedDocument = document
  if (!isUndefined(doc.exitFullscreen))
    doc.removeEventListener('fullscreenchange', callback, options)

  else if (doc.webkitExitFullscreen)
    doc.removeEventListener('webkitfullscreenchange', callback, options)

  else if (doc.mozCancelFullScreen)
    doc.removeEventListener('mozfullscreenchange', callback, options)

  else if (doc.msExitFullscreen)
    doc.removeEventListener('MSFullscreenChange', callback, options)

  else
    throw new Error('该浏览器不支持全屏API')
}

/**
 * 阻止F11按键的默认行为，并根据当前的全屏状态调用进入/退出全屏，
 * 解决通过F11按键和API两种方式进入全屏时出现的状态不一致问题。
 */
export function patchF11DefaultAction(): void {
  window.addEventListener('keydown', (e) => {
    // https://w3c.github.io/uievents-code/
    if (e.code === 'F11') {
      e.preventDefault()
      if (isFullscreen())
        exitFullscreen()

      else
        enterFullscreen()
    }
  })
}
