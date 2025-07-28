import { isFunction } from '@ideaz/utils'
import type { Ref } from 'vue'
import { getCheckData, getIsReturnToolBar } from '../utils'
import type { ITableProps } from '../props'
import type { TableCol } from '../../../types'
import { useEditableColumns } from './useEditableColumns'

export function useTableColumns(mergedProps: Ref<ITableProps>, emit: any, tableData: Ref<any>) {
  const middleTableCols = shallowRef<TableCol[]>([])
  const sortTableCols = shallowRef<TableCol[]>([])
  const tableKey = ref(new Date().valueOf())
  const { columns, zTableFormRef } = useEditableColumns(mergedProps, emit, tableData)

  watch(() => columns.value, () => {
    middleTableCols.value = getCheckData(mergedProps.value.toolBar, columns.value)
    sortTableCols.value = columns.value.filter((item: TableCol) => {
      return getIsReturnToolBar(item, mergedProps.value.toolBar)
    })
  }, { immediate: true, deep: true })

  const formatTableCols = computed(() => {
    return middleTableCols.value.filter((item) => {
      return isFunction(item.hide) ? !item.hide() : !item.hide
    })
  })

  const originFormatTableCols = computed(() => {
    // tableKey.value = new Date().valueOf()
    // sortTableCols.value = columns.filter((item: TableCol) => {
    //   return getIsReturnToolBar(item, props.toolBar)
    // })
    return columns.value.map((item: TableCol) => item)
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
