const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const isClient = typeof window !== 'undefined'

export const camelCase = (name: string) => {
  return name.replace(SPECIAL_CHARS_REGEXP, (_: {}, separator: string, letter: string, offset: string) => {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export const getStyle = (element: HTMLElement, styleName: any) => {
  if (!isClient) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float')
    styleName = 'cssFloat'

  try {
    const compute = document.defaultView?.getComputedStyle(element, '')
    return element.style?.[styleName] || (compute ? compute?.[styleName] : null)
  }
  catch (e) {
    return element.style[styleName]
  }
}
