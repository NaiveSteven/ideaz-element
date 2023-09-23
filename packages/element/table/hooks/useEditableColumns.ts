import { isFunction, isObject } from '@ideaz/utils'
import type { Ref } from 'vue'
import type { TableColumnCtx } from 'element-plus'
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
      onClick: (row: any, index: number, column: TableColumnCtx<any>) => {
        if (isFunction(props.editable?.onEdit))
          props.editable?.onEdit({ row, index, column, formRef: zTableFormRef.value })

        else
          row.__isEdit = true
      },
    }
  }

  const renderSave = () => {
    return {
      label: t('common.save'),
      type: 'primary',
      link: true,
      hide: (row: any) => !row.__isEdit || editableType.value === 'multiple',
      onClick: (row: any, index: number, column: TableColumnCtx<any>) => {
        if (!zTableFormRef.value)
          return
        if (isFunction(props.editable?.onSave)) {
          props.editable?.onSave({ row, index, column, formRef: zTableFormRef.value })
        }
        else {
          zTableFormRef.value.validateField
          && zTableFormRef.value.validateField(generateValidateFields(index), (validated: boolean) => {
            if (!validated)
              return

            replacePropertyValues(row)
            row.__isEdit = false
          })
        }
      },
    }
  }

  const renderCancel = () => {
    return {
      label: t('common.cancel'),
      type: 'primary',
      link: true,
      hide: (row: any) => !row.__isEdit || editableType.value === 'multiple',
      onClick: (row: any, index: number, column: TableColumnCtx<any>) => {
        if (isFunction(props.editable?.onCancel)) {
          props.editable?.onCancel({ row, index, column, formRef: zTableFormRef.value })
        }
        else {
          replacePropertyValues(row, true)
          row.__isEdit = false
        }
      },
    }
  }

  const renderDelete = () => {
    return {
      label: t('common.delete'),
      type: 'primary',
      link: true,
      onClick: (row: any, index: number, column: TableColumnCtx<any>) => {
        if (isFunction(props.editable?.onDelete))
          props.editable?.onDelete({ row, index, column, formRef: zTableFormRef.value })

        else
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
