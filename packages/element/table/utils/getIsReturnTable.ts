import { isArray, isFunction, isObject, isString } from '@ideaz/utils'
import type { TableCol } from '../../types'

export function getIsReturnTable(tableCol: TableCol, toolBar: any | boolean) {
  const isHide = isFunction(tableCol.hide) ? tableCol.hide() : tableCol.hide
  let isUncheck = false

  if (isObject(toolBar)) {
    if (isString(toolBar.uncheck))
      isUncheck = tableCol.label === tableCol.toolBar.uncheck

    if (isArray(toolBar.uncheck))
      isUncheck = toolBar.uncheck.includes(tableCol.label)
  }

  return !isHide && !isUncheck
}
