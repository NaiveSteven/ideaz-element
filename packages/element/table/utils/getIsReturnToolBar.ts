import { isArray, isDef, isObject } from '@ideaz/utils'
import type { TableCol } from '~/types'

export const getIsReturnToolBar = (tableCol: TableCol, toolBar: { [propName: string]: any } | boolean | undefined) => {
  // const isHide = isFunction(tableCol.hide) ? tableCol.hide() : tableCol.hide
  const isFixed = isDef(tableCol.fixed)

  if (isDef(toolBar) && toolBar === false)
    return false

  if (isObject(toolBar)) {
    return isArray(toolBar.exclude)
      ? !toolBar.exclude.includes(tableCol.label) && !isFixed
      : !isFixed
  }
  return !isFixed
}
