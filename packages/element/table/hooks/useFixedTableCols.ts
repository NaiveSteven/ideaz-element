import { isArray, isObject } from '@ideaz/utils'
import type { ToolBarProps } from '../src/props'
import { getCheckData, getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

function getArrayDifference(array1: TableCol[], array2: string[]) {
  const uidSet = new Set(array2)

  const difference = array1.filter(obj => !uidSet.has(obj.__uid))

  return difference.map(obj => obj.__uid)
}

export const useFixedTableCols = (props: ToolBarProps, emit: any, centerCheckedTableCols: Ref<string[]>) => {
  const leftFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left'))
  const rightFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right'))
  const oldLeftFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left'))
  const oldRightFixedTableCols = ref<TableCol[]>(props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right'))
  const leftCheckedTableColsUids = ref<string[]>(leftFixedTableCols.value.map(item => item.__uid))
  const rightCheckedTableColsUids = ref<string[]>(rightFixedTableCols.value.map(item => item.__uid))

  const originSortTableCols = computed(() => {
    return props.originFormatTableCols.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })
  })

  const handleTableColFixed = (tableCol: TableCol, direction: 'left' | 'right' | false) => {
    const sortList = direction === false ? getOriginSortTableColsWithoutFixed(tableCol) : props.sortTableCols
    const sortTableIndex = sortList.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
    const middleTableIndex = props.middleTableCols.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
    const middleTableList = [...props.middleTableCols]
    const sortTableList = [...props.sortTableCols]
    const item = { ...tableCol, fixed: direction }
    middleTableList.splice(middleTableIndex, 1)
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
      const originMiddleTableIndex = getOriginFormatTableColsWithoutFixed(item).findIndex((item: TableCol) => item.__uid === tableCol.__uid)
      const leftFixedTableIndex = leftFixedTableCols.value.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
      const rightFixedTableIndex = rightFixedTableCols.value.findIndex((item: TableCol) => item.__uid === tableCol.__uid)
      const leftCheckedTableIndex = leftCheckedTableColsUids.value.findIndex((item: string) => item === tableCol.__uid)
      const rightCheckedTableIndex = rightCheckedTableColsUids.value.findIndex((item: string) => item === tableCol.__uid)
      if (leftFixedTableCols.value.length && leftFixedTableIndex > -1)
        leftFixedTableCols.value.splice(leftFixedTableIndex, 1)

      if (leftCheckedTableIndex > -1)
        leftCheckedTableColsUids.value.splice(leftCheckedTableIndex, 1)

      if (rightFixedTableCols.value.length && rightFixedTableIndex > -1)
        rightFixedTableCols.value.splice(rightFixedTableIndex, 1)

      if (rightCheckedTableIndex > -1)
        rightCheckedTableColsUids.value.splice(rightCheckedTableIndex, 1)

      middleTableList.splice(originMiddleTableIndex, 0, item)
      sortTableList.splice(sortTableIndex, 0, item)
    }

    if (direction === 'left')
      leftFixedTableCols.value.push(item)

    if (direction === 'right')
      rightFixedTableCols.value.push(item)

    emit('columns-change', middleTableList.filter(item => !item.fixed).concat(getCheckedFixedCols(direction)))
    emit('table-cols-change', sortTableList)
  }

  const handleResetFixedTableCols = () => {
    const tableCols = props.originFormatTableCols.filter((item) => {
      if (isObject(props.toolBar)) {
        return isArray(props.toolBar.exclude)
          ? !props.toolBar.exclude.includes(item.label)
          : true
      }
      return true
    })

    leftFixedTableCols.value = props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left')
    rightFixedTableCols.value = props.originFormatTableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right')
    leftCheckedTableColsUids.value = tableCols.filter((tableCol: TableCol) => tableCol.fixed === 'left').map(item => item.__uid)
    rightCheckedTableColsUids.value = tableCols.filter((tableCol: TableCol) => tableCol.fixed === 'right').map(item => item.__uid)
  }

  const handleFixedCheckedTableColsChange = (direction: 'left' | 'right', checkedData: string[]) => {
    const tableCols = getCheckedFixedCols(direction, checkedData)
    emit('columns-change', props.middleTableCols.filter(item => !item.fixed).concat(tableCols))
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
    if (dragItemIndex > -1 && oldItemIndex > -1) {
      middleTableCols.splice(dragItemIndex, 1)
      middleTableCols.splice(oldItemIndex, 0, dragItem)
      emit('columns-change', middleTableCols)
    }
  }

  function getCheckedFixedCols(direction: 'left' | 'right' | false, checkedUids?: string[]) {
    let tableCols: TableCol[] = []
    const checkedData = checkedUids || (direction === 'left' ? leftCheckedTableColsUids.value : rightCheckedTableColsUids.value)
    if (direction === 'left') {
      tableCols = tableCols.concat(leftFixedTableCols.value.filter(item => checkedData.includes(item.__uid)),
        rightFixedTableCols.value.filter(item => rightCheckedTableColsUids.value.includes(item.__uid)))
    }
    else {
      tableCols = tableCols.concat(rightFixedTableCols.value.filter(item => checkedData.includes(item.__uid)),
        leftFixedTableCols.value.filter(item => leftCheckedTableColsUids.value.includes(item.__uid)))
    }

    return tableCols
  }

  // get origin formatTableCols to reset fixed table column
  function getOriginFormatTableColsWithoutFixed(tableCol: TableCol) {
    const fixedUids = leftCheckedTableColsUids.value.concat(rightCheckedTableColsUids.value).filter(uid => uid !== tableCol.__uid)

    return getCheckData(props.toolBar, props.originFormatTableCols).filter(item => !fixedUids.includes(item.__uid)
    && (centerCheckedTableCols.value.includes(item.__uid) || leftCheckedTableColsUids.value.includes(item.__uid) || rightCheckedTableColsUids.value.includes(item.__uid)))
  }

  function getOriginSortTableColsWithoutFixed(tableCol: TableCol) {
    const fixedUids = leftFixedTableCols.value.concat(rightFixedTableCols.value).filter(item => item.__uid !== tableCol.__uid).map(item => item.__uid)

    return props.originFormatTableCols.filter(item => !fixedUids.includes(item.__uid))
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
