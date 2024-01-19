import { getCheckData, getIsReturnToolBar } from '../utils'
import type { TableCol } from '../../types'

export function useToolBarTableCols(props: any, emit: any) {
  const checkedTableCols = ref(getOriginCheckedTableCols(props.sortTableCols))

  watch(
    () => props.formatTableCols,
    () => {
      const uids = props.formatTableCols.filter((item: TableCol) => item.__uid && !item.fixed).map((item: TableCol) => item.__uid)
      uids.forEach((uid: string) => {
        if (!checkedTableCols.value.includes(uid))
          checkedTableCols.value.push(uid)
      })
    },
    { deep: true },
  )

  function getOriginCheckedTableCols(data: TableCol[]) {
    return getCheckData(props.toolBar, data)
      .filter(item => !item.fixed)
      .map(item => item.__uid)
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
    emit('columns-change', getCheckData(props.toolBar, props.originFormatTableCols))
  }

  return {
    checkedTableCols,
    handleReset,
    handleDataChange,
  }
}
