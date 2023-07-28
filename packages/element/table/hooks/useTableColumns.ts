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
  const zTableFormRef = ref()
  const editableType = ref<'single' | 'multiple'>(isObject(props.editable) ? (props.editable.type || 'single') : 'single')
  const { t } = useLocale()

  if (props.columns && props.columns.length) {
    props.columns.forEach((item: TableCol) => {
      item.__uid = uid()
    })
  }

  const generateValidateFields = (index: number) => {
    if (tableData.value.length)
      return Object.keys(tableData.value[0]).map(prop => `tableData.${index}.${prop}`)

    return []
  }

  const columns = (props.editable && props.columns.length > 0 && props.columns[props.columns.length - 1]?.type !== 'button')
    ? props.columns.concat([{
      type: 'button',
      label: t('table.action'),
      buttons: [
        {
          label: t('table.edit'),
          type: 'primary',
          link: true,
          hide: row => row.__isEdit || editableType.value === 'multiple',
          onClick: (row, index, column) => { row.__isEdit = true },
        },
        {
          label: t('table.save'),
          type: 'primary',
          link: true,
          hide: row => !row.__isEdit || editableType.value === 'multiple',
          onClick: (row, index, column) => {
            if (!zTableFormRef.value)
              return
            zTableFormRef.value.validateField
            && zTableFormRef.value.validateField(generateValidateFields(index), (validated: boolean) => {
              if (!validated)
                return

              replacePropertyValues(row)
              row.__isEdit = false
            })
          },
        },
        {
          label: t('table.cancel'),
          type: 'primary',
          link: true,
          hide: row => !row.__isEdit || editableType.value === 'multiple',
          onClick: (row, index, column) => {
            replacePropertyValues(row, true)
            row.__isEdit = false
          },
        },
        {
          label: t('table.delete'),
          type: 'primary',
          link: true,
          onClick: (row, index) => {
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
    sortTableCols.value = columns.filter((item: TableCol) => {
      return getIsReturnToolBar(item, props.toolBar)
    })

    return columns.map((item: TableCol) => item)
  })

  return {
    formatTableCols,
    middleTableCols,
    originFormatTableCols,
    sortTableCols,
    tableKey,
    getIsReturnToolBar,
    zTableFormRef,
  }
}
