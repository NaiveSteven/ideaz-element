import { isArray, isObject, isString } from '@ideaz/utils'
import { getIsReturnToolBar } from '../utils'
import type { TableCol } from '~/types'

export const useToolBarTableCols = (props: any, emit: any) => {
  const checkedTableCols = ref(getOriginCheckedTableCols(props.sortTableCols))

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

  function getCheckData(data: TableCol[]) {
    return data
      .filter((item) => {
        if (isObject(props.toolBar)) {
          if (isString(props.toolBar.uncheck))
            return item.label !== props.toolBar.uncheck

          if (isArray(props.toolBar.uncheck))
            return !props.toolBar.uncheck.includes(item.label)
        }
        return true
      })
  }

  function getOriginCheckedTableCols(data: TableCol[]) {
    return getCheckData(data)
      .map(item => item.__uid)
  }

  const handleChangeTableCols = (values: string[]) => {
    const data: TableCol[] = []
    if (values && values.length > 0) {
      const otherData = props.originFormatTableCols.filter(
        (item: TableCol) =>
          !props.sortTableCols.map((cur: TableCol) => cur.__uid).includes(item.__uid),
      )

      props.sortTableCols.forEach((tableCol: TableCol) => {
        values.forEach((value) => {
          if (value === tableCol.__uid)
            data.push(tableCol)
        })
      })
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
    handleChangeTableCols(val ? props.sortTableCols.map((item: TableCol) => item.__uid) : [])
  }

  const handleCheckedTableColsChange = (val: string[]) => {
    handleChangeTableCols(val)
  }

  const handleDataChange = (val: TableCol[], tableCols: TableCol[]) => {
    const data: TableCol[] = []
    const otherData = tableCols.filter(
      item => !val.map(cur => cur.__uid).includes(item.__uid),
    )
    if (tableCols && tableCols.length > 0) {
      val.forEach((tableCol: TableCol) => {
        const item = tableCols.find(item => item.__uid === tableCol.__uid)
        if (item && item.__uid)
          data.push(item)
      })
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
    const filterToolBarData = props.originFormatTableCols.filter((item: TableCol) =>
      getIsReturnToolBar(item, props.toolBar),
    )
    checkedTableCols.value = getOriginCheckedTableCols(filterToolBarData)
    emit('table-cols-change', filterToolBarData)
    emit('columns-change', getCheckData(props.originFormatTableCols))
  }

  return {
    checkedTableCols,
    handleCheckAllChange,
    handleCheckedTableColsChange,
    handleReset,
    handleDataChange,
  }
}
