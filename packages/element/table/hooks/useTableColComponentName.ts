export const useTableColComponentName = () => {
  const getComponentName = (type: string | (() => string)) => {
    const cNames = ['select']
    const propComponentName = typeof type === 'function' ? type() : type

    if (cNames.includes(propComponentName))
      return `z-${propComponentName}`

    else
      return 'z-table-custom-column-container'
  }

  const getDynamicComponentName = (type: string | (() => string)) => {
    const eleNames = ['input', 'datepicker', 'switch']
    const propComponentName = typeof type === 'function' ? type() : type

    if (eleNames.includes(propComponentName)) {
      if (propComponentName === 'datepicker')
        return 'el-date-picker'

      return `el-${propComponentName}`
    }
    else {
      return propComponentName || 'unknown'
    }
  }

  return { getComponentName, getDynamicComponentName }
}
