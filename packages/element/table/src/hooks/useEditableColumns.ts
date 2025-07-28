import { isFunction, isObject, uid } from '@ideaz/utils'
import { isEqual } from 'lodash-unified'
import type { Ref } from 'vue'
import DialogTip from '../../../dialog/src/dialog'
import type { ITableProps } from '../props'
import type { BtnItem, TableCol, TableColumnScopeData } from '../../../types'

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

export function useEditableColumns(mergedProps: Ref<ITableProps>, emit: any, tableData: Ref<any>): { zTableFormRef: Ref<any>, columns: Ref<TableCol[]> } {
  const editableType = ref<'single' | 'multiple'>(isObject(mergedProps.value.editable) ? (mergedProps.value.editable.type || 'single') : 'single')
  const zTableFormRef = ref()
  const columns = ref<TableCol[]>([])
  const { t } = useLocale()
  const { editable } = mergedProps.value

  const generateValidateFields = (index: number) => {
    if (tableData.value.length)
      return Object.keys(tableData.value[0]).map(prop => `tableData.${index}.${prop}`)

    return []
  }

  const renderEdit = (): BtnItem => {
    return {
      label: t('common.edit'),
      type: 'primary',
      link: true,
      hide: ({ row }: TableColumnScopeData) => row.__isEdit || editableType.value === 'multiple',
      onClick: ({ row, $index, column }: TableColumnScopeData) => {
        if (isObject(mergedProps.value.editable) && isFunction(mergedProps.value.editable?.onEdit)) {
          mergedProps.value.editable?.onEdit({ row, $index, column, formRef: zTableFormRef.value })
        }
        else {
          row.__isEdit = true
          emit('update:data', tableData.value)
        }
      },
    }
  }

  const renderSave = (): BtnItem => {
    return {
      label: t('common.save'),
      type: 'primary',
      link: true,
      hide: ({ row }: TableColumnScopeData) => !row.__isEdit || editableType.value === 'multiple',
      onClick: ({ row, $index, column }: TableColumnScopeData) => {
        if (!zTableFormRef.value)
          return
        if (isObject(mergedProps.value.editable) && isFunction(mergedProps.value.editable?.onSave)) {
          mergedProps.value.editable?.onSave({ row, $index, column, formRef: zTableFormRef.value })
        }
        else {
          zTableFormRef.value.validateField
          && zTableFormRef.value.validateField(generateValidateFields($index), (validated: boolean) => {
            if (!validated)
              return

            replacePropertyValues(row)
            row.__isEdit = false
            emit('update:data', tableData.value)
          })
        }
      },
    }
  }

  const renderCancel = (): BtnItem => {
    return {
      label: t('common.cancel'),
      type: 'primary',
      link: true,
      hide: ({ row }: TableColumnScopeData) => !row.__isEdit || editableType.value === 'multiple',
      onClick: ({ row, $index, column }: TableColumnScopeData) => {
        if (isObject(mergedProps.value.editable) && isFunction(mergedProps.value.editable?.onCancel)) {
          mergedProps.value.editable?.onCancel({ row, $index, column, formRef: zTableFormRef.value })
        }
        else {
          replacePropertyValues(row, true)
          row.__isEdit = false
          emit('update:data', tableData.value)
        }
      },
    }
  }

  const renderDelete = (): BtnItem => {
    return {
      label: t('common.delete'),
      type: 'primary',
      link: true,
      onClick: ({ row, $index, column }: TableColumnScopeData) => {
        const delData = () => {
          if (isObject(mergedProps.value.editable) && isFunction(mergedProps.value.editable?.onDelete)) {
            mergedProps.value.editable?.onDelete({ row, $index, column, formRef: zTableFormRef.value })
          }
          else {
            tableData.value.splice($index, 1)
            emit('update:data', tableData.value)
          }
        }
        if (isObject(mergedProps.value.editable) && mergedProps.value.editable?.deleteConfirm) {
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

  watch(() => mergedProps.value.columns, (newVal, oldVal) => {
    // Avoid excessive update problems caused by reference address changes
    if (isEqual(newVal, oldVal))
      return
    const cols = mergedProps.value.columns.map((item: TableCol) => {
      if (item.type === 'sort')
        return { width: 48, ...item, __uid: uid() }
      if (isObject(item.component))
        return { ...item, __uid: uid(), component: markRaw(item.component) }
      return { ...item, __uid: uid() }
    }) as TableCol[]
    if (editable && cols.length > 0 && cols[cols.length - 1]?.type !== 'button') {
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
    else if (editable && cols.length > 0 && cols[cols.length - 1]?.type === 'button') {
      columns.value = cols.map((item: TableCol) => {
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
  }, { immediate: true, deep: true })

  return { columns, zTableFormRef }
}
