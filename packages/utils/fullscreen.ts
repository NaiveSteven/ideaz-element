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
 * @description Determine whether the current state of the browser allows full screen access
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
 * @description Get Full Screen Elements
 */
export function getFullscreenElement(): Element | null {
  const doc: EnhancedDocument = document
  return doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement || null
}

/**
 * @description Determine whether the current state is full screen
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
 * Enter full screen
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen
 * There is a problem with top layer stacking. If you want to avoid the problem caused by stacking order,
 * you need to manually determine the full screen status. If the current state is already full screen, you can exit full screen first and then let the target element enter full screen
 * @param {EnhancedHTMLElement} [element=document.body] - Full screen target element, default to body
 * @param {FullscreenOptions} options - Full screen options
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
 * @description Monitor full screen change events
 * @param {Function} callback
 * @param {boolean|AddEventListenerOptions} options Listening Event Options
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
 * @description Remove monitoring for full screen change events
 * @param {Function} callback
 * @param {boolean|EventListenerOptions} options Listening Event Options
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
 * Block the default behavior of the F11 button and call enter/exit full screen based on the current full screen state,
 * Resolve the issue of inconsistent status when entering full screen through both F11 button and API methods.
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
