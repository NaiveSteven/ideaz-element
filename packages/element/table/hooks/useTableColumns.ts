import { isFunction, uid } from '@ideaz/utils'
import type { Ref } from 'vue'
import { getCheckData, getIsReturnToolBar } from '../utils'
import type { ITableProps } from '../src/props'
import { useEditableColumns } from './useEditableColumns'
import type { TableCol } from '~/types'

export const useTableColumns = (props: ITableProps, emit: any, tableData: Ref<any>) => {
  const middleTableCols = ref<TableCol[]>([])
  const sortTableCols = ref<TableCol[]>([])
  const tableKey = ref(new Date().valueOf())
  const { columns, zTableFormRef } = useEditableColumns(props, emit, tableData)

  if (props.columns && props.columns.length) {
    props.columns.forEach((item: TableCol) => {
      item.__uid = uid()
    })
  }

  middleTableCols.value = getCheckData(props.toolBar, columns)

  const formatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
    return middleTableCols.value.filter((item) => {
      return isFunction(item.hide) ? !item.hide() : !item.hide
    })
  })

  sortTableCols.value = columns.filter((item: TableCol) => {
    return getIsReturnToolBar(item, props.toolBar)
  })

  const originFormatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
    // sortTableCols.value = columns.filter((item: TableCol) => {
    //   return getIsReturnToolBar(item, props.toolBar)
    // })

    return columns.map((item: TableCol) => item)
  })

  return {
    formatTableCols,
    middleTableCols,
    originFormatTableCols,
    sortTableCols,
    tableKey,
    zTableFormRef,
  }
}
