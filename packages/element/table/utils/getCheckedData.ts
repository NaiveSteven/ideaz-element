import { isArray, isObject, isString } from '@ideaz/utils'
import type { TableCol } from '~/types'

export function getCheckData(toolBar: any, data: TableCol[]) {
  return data
    .filter((item) => {
      if (isObject(toolBar)) {
        if (isString(toolBar.uncheck))
          return item.label !== toolBar.uncheck

        if (isArray(toolBar.uncheck))
          return !toolBar.uncheck.includes(item.label)
      }
      return true
    })
}
