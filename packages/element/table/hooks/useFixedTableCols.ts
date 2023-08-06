import type { ToolBarProps } from '../src/props'
import { getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

export const useFixedTableCols = (props: ToolBarProps, emit: any, centerCheckedTableCols: Ref<string[]>) => {
  const leftFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left'))
  const rightFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right'))
  const oldLeftFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left'))
  const oldRightFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right'))
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
      // if checked, when push to left or right, checked too
      if (centerCheckedTableCols.value.includes(tableCol.__uid)) {
        if (direction === 'left')
          leftCheckedTableColsUids.value.push(tableCol.__uid)

        if (direction === 'right')
          rightCheckedTableColsUids.value.push(tableCol.__uid)
      }
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
      leftFixedTableCols.value.push(item)

    if (direction === 'right')
      rightFixedTableCols.value.push(item)

    emit('columns-change', middleTableList)
    emit('table-cols-change', sortTableList)
  }

  const handleResetFixedTableCols = () => {
    leftFixedTableCols.value = originSortTableCols.value.filter((tableCol: TableCol) => tableCol.fixed === 'left')
    rightFixedTableCols.value = originSortTableCols.value.filter((tableCol: TableCol) => tableCol.fixed === 'right')
  }

  const handleFixedCheckedTableColsChange = (direction: 'left' | 'right', checkedData: string[]) => {
    const tableCols = props.middleTableCols.filter((item: TableCol) => item.fixed === direction ? checkedData.includes(item.__uid) : true)
    const fixedTableCols = props.middleTableCols.filter((item: TableCol) => item.fixed === direction)
    if (fixedTableCols.length < checkedData.length) {
      const fixedTableColsUids = fixedTableCols.map((item: TableCol) => item.__uid)
      const diffData = checkedData.filter((item: string) => !fixedTableColsUids.includes(item))
      diffData.forEach((uid: string) => {
        const index = props.originFormatTableCols.findIndex((item: TableCol) => item.__uid === uid)
        const tableCol = { ...props.originFormatTableCols[index], fixed: direction }
        tableCols.splice(index, 1, tableCol)
      })
    }
    emit('columns-change', tableCols)
  }

  const handleLeftFixedDragChange = () => {
    oldLeftFixedTableCols.value = [...leftFixedTableCols.value]
  }

  const handleSortTableCols = (dragData: any, direction: 'left' | 'right') => {
    const { oldIndex, newIndex } = dragData
    const sortList = direction === 'left' ? oldLeftFixedTableCols.value : oldRightFixedTableCols.value
    const dragItem = { ...sortList[oldIndex] }
    const oldItem = { ...sortList[newIndex] }
    const dragItemIndex = props.middleTableCols.findIndex((item: TableCol) => item.__uid === dragItem.__uid)
    const oldItemIndex = props.middleTableCols.findIndex((item: TableCol) => item.__uid === oldItem.__uid)
    const middleTableCols = [...props.middleTableCols]
    middleTableCols.splice(dragItemIndex, 1)
    middleTableCols.splice(oldItemIndex, 0, dragItem)
    emit('columns-change', middleTableCols)
  }

  return {
    handleTableColFixed,
    leftFixedTableCols,
    rightFixedTableCols,
    originSortTableCols,
    handleResetFixedTableCols,
    handleSortTableCols,
    leftCheckedTableColsUids,
    rightCheckedTableColsUids,
    handleLeftFixedDragChange,
    handleFixedCheckedTableColsChange,
  }
}
