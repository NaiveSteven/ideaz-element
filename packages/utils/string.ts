export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128)
      return pre + 1

    return pre + 2
  }, 0)

export const cutStrByFullLength = (str = '', maxLength: number) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128)
      showLength += 1
    else
      showLength += 2

    if (showLength <= maxLength)
      return pre + cur

    return pre
  }, '')
}

export const toCamelCase = (str: string) => {
  return str
    .replace(/-([a-z])/g, (g) => {
      return g[1].toUpperCase()
    })
    .replace(/^([a-z])/, (g) => {
      return g[0].toUpperCase()
    })
}

export const toKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export const getPxValue = (value?: string | number) => {
  if (typeof value === 'string')
    return value.trim().endsWith('px') ? value.trim() : `${value.trim()}px`

  if (typeof value === 'number')
    return `${value.toString()}px`

  return 'auto'
}

export const convertToPx = (value: string | number) => {
  if (value === undefined) return value
  if (typeof value === 'number') {
    return value
  }
  else if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed.endsWith('px')) {
      return parseInt(trimmed.slice(0, -2), 10)
    }
    else {
      const num = parseInt(trimmed, 10)
      if (!isNaN(num))
        return num
    }
  }
  // 如果传入的不是数字或可以转换为数字的字符串，则返回 NaN
  return NaN
}
