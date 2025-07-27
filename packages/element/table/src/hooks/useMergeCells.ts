import type { TableColumnCtx } from 'element-plus'
import type { Ref } from 'vue'
import type { ITableProps } from '../props'

export function useMergeCells(mergedProps: Ref<ITableProps>) {
  const spanMethod = ({ row, column, rowIndex, columnIndex }: { row: any, column: TableColumnCtx<any>, rowIndex: number, columnIndex: number }) => {
    if (!mergedProps.value.mergeCells) return
    const { direction = 'both', props: mergeProps } = mergedProps.value.mergeCells

    // 如果指定了要合并的字段，但当前列不在其中，则不合并
    if (mergeProps && !mergeProps.includes(column.property)) {
      return {
        rowspan: 1,
        colspan: 1
      }
    }

    const data = mergedProps.value.data || []
    const result = {
      rowspan: 1,
      colspan: 1
    }

    // 处理行合并
    if (direction === 'row' || direction === 'both') {
      // 如果不是第一列，且当前行的当前列的值与前一列的值相同，则不显示
      if (columnIndex > 0 && row[column.property] === data[rowIndex][mergedProps.value.columns[columnIndex - 1].prop as string]) {
        result.colspan = 0
      }
      // 如果是第一列，或者当前行的当前列的值与前一列的值不同，则计算后续有多少个相同的值
      else {
        let count = 1
        while (columnIndex + count < mergedProps.value.columns.length) {
          const nextProp = mergedProps.value.columns[columnIndex + count].prop
          if (nextProp && row[column.property] === row[nextProp]) {
            count++
          } else {
            break
          }
        }
        result.colspan = count
      }
    }

    // 处理列合并
    if (direction === 'column' || direction === 'both') {
      // 如果不是第一行，且当前列的当前行的值与上一行的值相同，则不显示
      if (rowIndex > 0 && row[column.property] === data[rowIndex - 1][column.property]) {
        result.rowspan = 0
      }
      // 如果是第一行，或者当前列的当前行的值与上一行的值不同，则计算后续有多少个相同的值
      else {
        let count = 1
        while (rowIndex + count < data.length) {
          if (row[column.property] === data[rowIndex + count][column.property]) {
            count++
          } else {
            break
          }
        }
        result.rowspan = count
      }
    }
    return result
  }

  return {
    spanMethod
  }
}
