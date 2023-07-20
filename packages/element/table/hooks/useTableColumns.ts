import { isArray, isFunction, isObject, isString, uid } from '@ideaz/utils'
import type { Ref } from 'vue'
import { getIsReturnToolBar } from '../utils'
import type { ITableProps } from '../src/props'
import type { TableCol } from '~/types'

function replacePropertyValues(obj: any, reverse = false) {
  for (const key in obj) {
    if (key.endsWith('Prop')) {
      const valueKey = key.slice(0, -4)
      if (Object.hasOwnProperty.call(obj, valueKey)) {
        if (reverse)
          obj[valueKey] = obj[key]

        else
          obj[key] = obj[valueKey]
      }
    }
  }

  return obj
}

export const useTableColumns = (props: ITableProps, tableData: Ref<any>) => {
  const middleTableCols = ref<TableCol[]>([])
  const sortTableCols = ref<TableCol[]>([])
  const tableKey = ref(new Date().valueOf())

  if (props.columns && props.columns.length) {
    props.columns.forEach((item: TableCol) => {
      item.__uid = uid()
      item.__isEdit = true
    })
  }

  const columns = (props.editable && props.columns.length > 0 && props.columns[props.columns.length - 1]?.type !== 'button')
    ? props.columns.concat([{
      type: 'button',
      label: '操作',
      buttons: [
        {
          label: '编辑',
          type: 'primary',
          link: true,
          hide: row => row.__isEdit,
          click: (row, index, column) => { row.__isEdit = true },
        },
        {
          label: '保存',
          type: 'primary',
          link: true,
          hide: row => !row.__isEdit,
          click: (row, index, column) => {
            replacePropertyValues(row)
            row.__isEdit = false
          },
        },
        {
          label: '取消',
          type: 'primary',
          link: true,
          hide: row => !row.__isEdit,
          click: (row, index, column) => {
            replacePropertyValues(row, true)
            row.__isEdit = false
          },
        },
        {
          label: '删除',
          type: 'primary',
          link: true,
          click: (row, index) => {
            tableData.value.splice(index, 1)
          },
        },
      ],
    }])
    : props.columns
  middleTableCols.value = columns.filter((item: TableCol) => {
    let isUncheck = false
    const toolBar = props.toolBar
    if (isObject(toolBar)) {
      if (isString(toolBar.uncheck))
        isUncheck = item.label === item.toolBar.uncheck

      if (isArray(toolBar.uncheck))
        isUncheck = toolBar.uncheck.includes(item.label)
    }
    return !isUncheck
  })

  const formatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
    return middleTableCols.value.filter((item) => {
      return isFunction(item.hide) ? !item.hide() : !item.hide
    })
  })

  const originFormatTableCols = computed(() => {
    tableKey.value = new Date().valueOf()
    sortTableCols.value = props.columns.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })

    return props.columns.map((item: TableCol) => item)
  })

  return {
    formatTableCols,
    middleTableCols,
    originFormatTableCols,
    sortTableCols,
    tableKey,
    getIsReturnToolBar,
  }
}
