import type { ToolBarProps } from '../src/props'
import { getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

export const useFixedTableCols = (props: ToolBarProps, emit: any) => {
  const leftFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left'))
  const rightFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right'))
  const leftCheckedTableColsUids = ref<string[]>([])
  const rightCheckedTableColsUids = ref<string[]>([])

  const originSortTableCols = computed(() => {
    return props.originFormatTableCols.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })
  })

  const handleTableColFixed = (tableCol: TableCol, direction: 'left' | 'right' | false) => {
    const sortList = direction === false ? originSortTableCols.value : props.sortTableCols
    const middleTableIndex = props.middleTableCols.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
    const sortTableIndex = sortList.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
    const middleTableList = [...props.middleTableCols]
    const sortTableList = [...props.sortTableCols]
    const item = { ...tableCol, fixed: direction }
    middleTableList.splice(middleTableIndex, 1, item)
    if (direction) {
      sortTableList.splice(sortTableIndex, 1)
    }
    else {
      const leftFixedTableIndex = leftFixedTableCols.value.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
      const rightFixedTableIndex = rightFixedTableCols.value.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
      if (leftFixedTableCols.value.length && leftFixedTableIndex > -1)
        leftFixedTableCols.value.splice(leftFixedTableIndex, 1)

      if (rightFixedTableCols.value.length && rightFixedTableIndex > -1)
        rightFixedTableCols.value.splice(rightFixedTableIndex, 1)

      sortTableList.splice(sortTableIndex, 1, item)
    }

    if (direction === 'left')
      leftFixedTableCols.value.push(tableCol)

    if (direction === 'right')
      rightFixedTableCols.value.push(tableCol)

    emit('columns-change', middleTableList)
    emit('table-cols-change', sortTableList)
  }

  const handleResetFixedTableCols = () => {
    leftFixedTableCols.value = originSortTableCols.value.filter((tableCol: TableCol) => tableCol.fixed === 'left')
    rightFixedTableCols.value = originSortTableCols.value.filter((tableCol: TableCol) => tableCol.fixed === 'right')
  }

  const handleFixedCheckedTableColsChange = (direction: 'left' | 'right') => {

  }

  return {
    handleTableColFixed,
    leftFixedTableCols,
    rightFixedTableCols,
    originSortTableCols,
    handleResetFixedTableCols,
    leftCheckedTableColsUids,
    rightCheckedTableColsUids,
    handleFixedCheckedTableColsChange,
  }
}
