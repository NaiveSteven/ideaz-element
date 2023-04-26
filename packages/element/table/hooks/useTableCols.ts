import { isArray, isFunction, isObject, isString, uid } from '@ideaz/utils'
import { getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

export const useTableCols = (props: any) => {
  const middleTableCols = ref<TableCol[]>([])
  const sortTableCols = ref<TableCol[]>([])
  const tableKey = ref(new Date().valueOf())

  if (props.tableCols && props.tableCols.length) {
    props.tableCols.forEach((item: TableCol) => {
      item.__uid = uid()
    })
  }

  middleTableCols.value = props.tableCols.filter((item: TableCol) => {
    let isUncheck = false
    const toolBar = props.toolBar
    if (isObject(toolBar)) {
      if (isString(toolBar.uncheck))
        isUncheck = item.label === item.toolBar.uncheck

      if (isArray(toolBar.uncheck))
        isUncheck = toolBar.uncheck.includes(item.label)
    }
    return !isUncheck
  })

  const formatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
    return middleTableCols.value.filter((item) => {
      return isFunction(item.hide) ? !item.hide() : !item.hide
    })
  })

  const originFormatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
    sortTableCols.value = props.tableCols.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })

    return props.tableCols.map((item: TableCol) => item)
  })

  return {
    formatTableCols,
    middleTableCols,
    originFormatTableCols,
    sortTableCols,
    tableKey,
    getIsReturnToolBar,
  }
}
