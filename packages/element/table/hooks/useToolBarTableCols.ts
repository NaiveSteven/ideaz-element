import { isArray, isObject, isString } from '@ideaz/utils'
import { getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

export const useToolBarTableCols = (props: any, emit: any) => {
  const checkedTableCols = ref(getOriginCheckedTableCols())
  const checkAll = ref(getIsCheckAll(checkedTableCols.value))
  const isIndeterminate = ref(getIsIndeterminate(checkedTableCols.value))

  watch(
    () => props.formatTableCols,
    () => {
      const uids = props.formatTableCols.map((item: TableCol) => item.__uid)
      uids.forEach((uid: string) => {
        if (!checkedTableCols.value.includes(uid))
          checkedTableCols.value.push(uid)
      })
    },
    { deep: true },
  )

  watch(
    () => props.sortTableCols,
    () => {
      checkAll.value = getIsCheckAll(checkedTableCols.value)
      isIndeterminate.value = getIsIndeterminate(checkedTableCols.value)
    },
    { deep: true },
  )

  function getOriginCheckedTableCols() {
    return props.sortTableCols
      .filter((item: TableCol) => {
        if (isObject(props.toolBar)) {
          if (isString(props.toolBar.uncheck))
            return item.label !== props.toolBar.uncheck

          if (isArray(props.toolBar.uncheck))
            return !props.toolBar.uncheck.includes(item.label)
        }
        return true
      })
      .map((item: TableCol) => item.__uid)
  }

  const handleChangeTableCols = (values: string[]) => {
    const data: TableCol[] = []
    if (values && values.length > 0) {
      // 记录被 toolBar 排除项的集合，需要插入到表格项中
      const otherData = props.originFormatTableCols.filter(
        (item: TableCol) =>
          !props.sortTableCols.map((cur: TableCol) => cur.__uid).includes(item.__uid),
      )

      // 根据 toolBar 的数据和选中的数据排序，重新生成表格项数据
      props.sortTableCols.forEach((tableCol: TableCol) => {
        values.forEach((value) => {
          if (value === tableCol.__uid)
            data.push(tableCol)
        })
      })
      // 将 toolBar 排除的数据根据原来的索引重新插入表格项中
      otherData.forEach((item: TableCol) => {
        const i = props.originFormatTableCols.findIndex(
          (tableCol: TableCol) => item.__uid === tableCol.__uid,
        )
        if (i > -1)
          data.splice(i, 0, item)
      })
    }
    emit('columns-change', data)
  }

  const handleCheckAllChange = (val: string[]) => {
    checkedTableCols.value = val ? props.sortTableCols.map((item: TableCol) => item.__uid) : []
    isIndeterminate.value = false
    handleChangeTableCols(val ? props.sortTableCols.map((item: TableCol) => item.__uid) : [])
  }

  const handleCheckedTableColsChange = (val: string[]) => {
    checkAll.value = getIsCheckAll(val)
    isIndeterminate.value = getIsIndeterminate(val)
    handleChangeTableCols(val)
  }

  const handleDataChange = (val: TableCol[], tableCols: TableCol[]) => {
    // 表格项
    const data: TableCol[] = []
    // 记录被 toolBar 排除项的集合，需要插入到表格项中
    const otherData = tableCols.filter(
      item => !val.map(cur => cur.__uid).includes(item.__uid),
    )
    if (tableCols && tableCols.length > 0) {
      // 根据 toolBar 的数据排序，重新生成表格项数据
      val.forEach((tableCol: TableCol) => {
        const item = tableCols.find(item => item.__uid === tableCol.__uid)
        if (item && item.__uid)
          data.push(item)
      })
      // 将 toolBar 排除的数据根据原来的索引重新插入表格项中
      otherData.forEach((item) => {
        const i = tableCols.findIndex(tableCol => item.__uid === tableCol.__uid)
        if (i > -1)
          data.splice(i, 0, item)
      })
    }
    emit('table-cols-change', val)
    emit('columns-change', data)
  }

  const handleReset = () => {
    isIndeterminate.value = false
    checkAll.value = true
    const filterToolBarData = props.originFormatTableCols.filter((item: TableCol) =>
      getIsReturnToolBar(item, props.toolBar),
    )
    // 重置的时候需要把不应该放在 toolBar 中的数据排除掉
    checkedTableCols.value = filterToolBarData.map((item: TableCol) => item.__uid)
    emit('table-cols-change', filterToolBarData)
    emit('columns-change', props.originFormatTableCols)
  }

  function getIsCheckAll(checked: string[]) {
    return !props.sortTableCols
      .map((item: TableCol) => item.__uid)
      .some((uid: string) => !checked.includes(uid))
  }

  function getIsIndeterminate(checked: string[]) {
    const bol = props.sortTableCols
      .map((item: TableCol) => item.__uid)
      .some((uid: string) => checked.includes(uid))

    return bol && checked.length && !getIsCheckAll(checked)
  }

  return {
    checkAll,
    isIndeterminate,
    checkedTableCols,
    handleCheckAllChange,
    handleCheckedTableColsChange,
    handleReset,
    handleDataChange,
  }
}
