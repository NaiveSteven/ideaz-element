import { isArray, isFunction, isObject, isString, uid } from '@ideaz/utils'
import { getIsReturnToolBar } from '../utils'
import type { ITableProps } from '../src/props'
import type { TableCol } from '~/types'

export const useTableColumns = (props: ITableProps) => {
  const middleTableCols = ref<TableCol[]>([])
  const sortTableCols = ref<TableCol[]>([])
  const tableKey = ref(new Date().valueOf())

  if (props.columns && props.columns.length) {
    props.columns.forEach((item: TableCol) => {
      item.__uid = uid()
    })
  }

  middleTableCols.value = props.columns.filter((item: TableCol) => {
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
    sortTableCols.value = props.columns.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })

    return props.columns.map((item: TableCol) => item)
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
