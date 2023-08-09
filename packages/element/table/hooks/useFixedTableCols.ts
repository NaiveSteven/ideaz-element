import { isArray, isObject } from '@ideaz/utils'
import type { ToolBarProps } from '../src/props'
import { getCheckData, getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

function getArrayDifference(array1: TableCol[], array2: string[]) {
  const uidSet = new Set(array2)

  const difference = array1.filter(obj => !uidSet.has(obj.__uid))

  return difference.map(obj => obj.__uid)
}

function sortByUidOrder(array1: TableCol[], array2: TableCol[]) {
  const uidMap: any = {}

  // 创建一个映射以便根据__uid字段查找对象在第一个数组中的索引
  array1.forEach((obj, index) => {
    uidMap[obj.__uid] = index
  })

  // 根据第一个数组中对象的顺序重新排序第二个数组
  const sortedArray = array2.sort((a, b) => {
    const indexA = uidMap[a.__uid]
    const indexB = uidMap[b.__uid]
    return indexA - indexB
  })

  return sortedArray
}

function insertObjectByFieldValue(array1: TableCol[], objToInsert: TableCol, array2: TableCol[], fieldName = '__uid') {
  const fieldValue = objToInsert[fieldName]
  const index = array1.findIndex(obj => obj[fieldName] === fieldValue)

  if (index !== -1)
    array2.splice(index, 0, objToInsert)

  return array2
}

function removeObjectsByFieldValue(array: TableCol[], fieldValue: any, fieldName = '__uid') {
  return array.filter(obj => obj[fieldName] !== fieldValue)
}

function removeItemsByValue(array: string[], value: any) {
  return array.filter(item => item !== value)
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

  const handleTableColFixedFromCenter = (tableCol: TableCol, direction: 'left' | 'right') => {
    let middleTableList: TableCol[] = []
    let sortTableList: TableCol[] = []
    const item = { ...tableCol, fixed: direction }

    middleTableList = removeObjectsByFieldValue(props.middleTableCols, tableCol.__uid)
    sortTableList = removeObjectsByFieldValue(props.sortTableCols, tableCol.__uid)

    // if checked, when push to left or right, checked too
    if (centerCheckedTableCols.value.includes(tableCol.__uid)) {
      if (direction === 'left')
        leftCheckedTableColsUids.value.push(tableCol.__uid)

      if (direction === 'right')
        rightCheckedTableColsUids.value.push(tableCol.__uid)

      // if checked, delete checked uids at the same time
      const centerCheckedIndex = centerCheckedTableCols.value.findIndex((uid: string) => tableCol.__uid === uid)
      if (centerCheckedIndex > -1)
        centerCheckedTableCols.value.splice(centerCheckedIndex, 1)
    }

    if (direction === 'left')
      leftFixedTableCols.value.push(item)

    if (direction === 'right')
      rightFixedTableCols.value.push(item)

    emit('columns-change', middleTableList.filter(item => !item.fixed).concat(getCheckedFixedCols(direction)))
    emit('table-cols-change', sortTableList)
  }

  const handleFixedTableColFromSide = (tableCol: TableCol, direction: 'left' | 'right') => {
    const middleTableList = [...props.middleTableCols]
    const item = { ...tableCol, fixed: direction }

    if (direction === 'left') {
      leftFixedTableCols.value.push(item)
      if (rightCheckedTableColsUids.value.includes(tableCol.__uid))
        leftCheckedTableColsUids.value.push(tableCol.__uid)

      rightFixedTableCols.value = removeObjectsByFieldValue(rightFixedTableCols.value, tableCol.__uid)
      rightCheckedTableColsUids.value = removeItemsByValue(rightCheckedTableColsUids.value, tableCol.__uid)
    }
    else {
      rightFixedTableCols.value.push(item)
      if (leftCheckedTableColsUids.value.includes(tableCol.__uid))
        rightCheckedTableColsUids.value.push(tableCol.__uid)

      leftFixedTableCols.value = removeObjectsByFieldValue(leftFixedTableCols.value, tableCol.__uid)
      leftCheckedTableColsUids.value = removeItemsByValue(leftCheckedTableColsUids.value, tableCol.__uid)
    }

    removeObjectsByFieldValue(middleTableList, tableCol.__uid)
    emit('columns-change', middleTableList.filter(item => !item.fixed).concat(getCheckedFixedCols(direction)))
  }

  const handleUnfixedTableCol = (tableCol: TableCol) => {
    let middleTableList: TableCol[] = []
    const sortTableList = [...props.sortTableCols]
    const item = { ...tableCol, fixed: false }

    // if fixed column checked, center column checked too
    if (leftCheckedTableColsUids.value.includes(tableCol.__uid) || rightCheckedTableColsUids.value.includes(tableCol.__uid))
      centerCheckedTableCols.value.push(tableCol.__uid)

    leftCheckedTableColsUids.value = removeItemsByValue(leftCheckedTableColsUids.value, tableCol.__uid)
    rightCheckedTableColsUids.value = removeItemsByValue(rightCheckedTableColsUids.value, tableCol.__uid)

    leftFixedTableCols.value = removeObjectsByFieldValue(leftFixedTableCols.value, tableCol.__uid)
    rightFixedTableCols.value = removeObjectsByFieldValue(rightFixedTableCols.value, tableCol.__uid)
    middleTableList = removeObjectsByFieldValue(props.middleTableCols, tableCol.__uid)

    insertObjectByFieldValue(getOriginFormatTableColsWithoutFixed(item), item, middleTableList)
    insertObjectByFieldValue(getOriginSortTableColsWithoutFixed(tableCol), item, sortTableList)

    emit('columns-change', middleTableList.filter(item => !item.fixed).concat(getCheckedFixedCols(false)))
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

  const handleSideFixedDragChange = (direction: 'left' | 'right') => {
    if (direction === 'left')
      oldLeftFixedTableCols.value = [...leftFixedTableCols.value]

    else
      oldRightFixedTableCols.value = [...rightFixedTableCols.value]
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
    handleTableColFixedFromCenter,
    leftFixedTableCols,
    rightFixedTableCols,
    originSortTableCols,
    handleResetFixedTableCols,
    handleSortTableCols,
    leftCheckedTableColsUids,
    rightCheckedTableColsUids,
    handleSideFixedDragChange,
    handleUnfixedTableCol,
    handleFixedTableColFromSide,
    handleFixedCheckedTableColsChange,
  }
}
