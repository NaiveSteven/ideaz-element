export const getPxValue = (value?: string | number) => {
  if (typeof value === 'string')
    return value.trim().endsWith('px') ? value.trim() : `${value.trim()}px`

  if (typeof value === 'number')
    return `${value.toString()}px`

  return 'auto'
}
