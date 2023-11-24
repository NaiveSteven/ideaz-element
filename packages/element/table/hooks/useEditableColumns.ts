import { isFunction, isObject, uid } from '@ideaz/utils'
import type { Ref } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import DialogTip from '../../dialog/src/dialog'
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

export const useEditableColumns = (props: ITableProps, emit: any, tableData: Ref<any>) => {
  const editableType = ref<'single' | 'multiple'>(isObject(props.editable) ? (props.editable.type || 'single') : 'single')
  const zTableFormRef = ref()
  const columns = ref<TableCol[]>([])
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
        if (isObject(props.editable) && isFunction(props.editable?.onEdit))
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
        if (isObject(props.editable) && isFunction(props.editable?.onSave)) {
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
        if (isObject(props.editable) && isFunction(props.editable?.onCancel)) {
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
        const delData = () => {
          if (isObject(props.editable) && isFunction(props.editable?.onDelete))
            props.editable?.onDelete({ row, index, column, formRef: zTableFormRef.value })

          else
            tableData.value.splice(index, 1)
        }
        if (isObject(props.editable) && props.editable?.deleteConfirm) {
          DialogTip({
            type: 'warning',
            title: t('dialog.tip'),
            message: t('table.deleteTip'),
            onConfirm: ({ done }) => {
              done()
              delData()
            },
          })
        }
        else {
          delData()
        }
      },
    }
  }

  watchEffect(() => {
    const cols = props.columns.map((item) => {
      if (item.type === 'sort') return { width: 48, ...item, __uid: uid() }
      return { ...item, __uid: uid() }
    }) as TableCol[]
    if (props.editable && cols.length > 0 && cols[cols.length - 1]?.type !== 'button') {
      columns.value = cols.concat({
        type: 'button',
        __uid: uid(),
        label: t('table.action'),
        buttons: [
          renderEdit(),
          renderSave(),
          renderCancel(),
          renderDelete(),
        ],
      } as TableCol)
    }
    else if (props.editable && cols.length > 0 && cols[cols.length - 1]?.type === 'button') {
      columns.value = cols.map((item: any) => {
        if (item.type === 'button') {
          if (isFunction(item.buttons))
            item.buttons = item.buttons({ renderEdit: renderEdit(), renderSave: renderSave(), renderCancel: renderCancel(), renderDelete: renderDelete() }, tableData)
        }
        return item
      })
    }
    else {
      columns.value = cols
    }
  })

  return { columns, zTableFormRef }
}
