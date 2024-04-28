import { isFunction, isString } from '@ideaz/utils'

export function getRowKey(rowData: any, rowKey?: string | ((rowData: any) => any)) {
  if (isFunction(rowKey))
    return rowKey(rowData)

  if (isString(rowKey))
    return rowData[rowKey]

  return rowData.id
}
