import { isFunction } from '@ideaz/utils'
import type { Ref } from 'vue'
import { getCheckData, getIsReturnToolBar } from '../utils'
import type { ITableProps } from '../src/props'
import { useEditableColumns } from './useEditableColumns'
import type { TableCol } from '~/types'

export const useTableColumns = (props: ITableProps, emit: any, tableData: Ref<any>) => {
  const middleTableCols = shallowRef<TableCol[]>([])
  const sortTableCols = shallowRef<TableCol[]>([])
  const tableKey = ref(new Date().valueOf())
  const { columns, zTableFormRef } = useEditableColumns(props, emit, tableData)

  watch(() => columns.value, () => {
    middleTableCols.value = getCheckData(props.toolBar, columns.value)
    sortTableCols.value = columns.value.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })
  }, { immediate: true, deep: true })

  const formatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
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
