import { isFunction, isObject } from '@ideaz/utils'
import type { Ref } from 'vue'
import type { ITableProps } from '../src/props'

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

export const useEditableColumns = (props: ITableProps, emit: any, tableData: Ref<any>) => {
  const editableType = ref<'single' | 'multiple'>(isObject(props.editable) ? (props.editable.type || 'single') : 'single')
  const zTableFormRef = ref()
  let columns: any[] = []
  const { t } = useLocale()

  const generateValidateFields = (index: number) => {
    if (tableData.value.length)
      return Object.keys(tableData.value[0]).map(prop => `tableData.${index}.${prop}`)

    return []
  }

  const renderEdit = () => {
    return {
      label: t('common.edit'),
      type: 'primary',
      link: true,
      hide: (row: any) => row.__isEdit || editableType.value === 'multiple',
      onClick: (row, index, column) => { row.__isEdit = true },
    }
  }

  const renderSave = () => {
    return {
      label: t('common.save'),
      type: 'primary',
      link: true,
      hide: row => !row.__isEdit || editableType.value === 'multiple',
      onClick: (row, index, column) => {
        emit('save', row, index, column)
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
    }
  }

  const renderCancel = () => {
    return {
      label: t('common.cancel'),
      type: 'primary',
      link: true,
      hide: row => !row.__isEdit || editableType.value === 'multiple',
      onClick: (row, index, column) => {
        emit('cancel', row, index, column)
        replacePropertyValues(row, true)
        row.__isEdit = false
      },
    }
  }

  const renderDelete = () => {
    return {
      label: t('common.delete'),
      type: 'primary',
      link: true,
      onClick: (row, index) => {
        emit('delete', row, index)
        tableData.value.splice(index, 1)
      },
    }
  }

  if (props.editable && props.columns.length > 0 && props.columns[props.columns.length - 1]?.type !== 'button') {
    columns = props.columns.concat([{
      type: 'button',
      label: t('table.action'),
      buttons: [
        renderEdit(),
        renderSave(),
        renderCancel(),
        renderDelete(),
      ],
    }])
  }
  else if (props.editable && props.columns.length > 0 && props.columns[props.columns.length - 1]?.type === 'button') {
    columns = props.columns.map((item: any) => {
      if (item.type === 'button') {
        if (isFunction(item.buttons))
          item.buttons = item.buttons({ renderEdit: renderEdit(), renderSave: renderSave(), renderCancel: renderCancel(), renderDelete: renderDelete() }, tableData)
      }
      return item
    })
  }
  else {
    columns = props.columns
  }

  return { columns, zTableFormRef }
}
