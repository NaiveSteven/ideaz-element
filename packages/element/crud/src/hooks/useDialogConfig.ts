import type { ComponentInternalInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-unified'

import { isFunction, isObject, isString } from '@ideaz/utils'
import type ZTable from '../../../table/src/Table'
import type { CrudProps } from '../props'
import type { EditRequestApiParams, ValidateField } from '../../../types'

export function useDialogConfig(mergedProps: ComputedRef<CrudProps>, emit: any, currentMode: Ref<'edit' | 'add' | 'view'>, isShowDialog: Ref<boolean>, rowData: Ref<any>) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const ctx = instance.proxy
  const dialogForm = ref()
  const dialogFormData = ref({})
  const confirmButtonLoading = ref(false)
  const isOperateFormLoading = ref(false)

  const { t } = useLocale()

  const dialogProps = computed(() => {
    const { add, edit, dialog } = mergedProps.value
    const dialogProps = (isObject(add) && isObject(add.dialog) && currentMode.value === 'add')
      ? add?.dialog
      : (isObject(edit) && isObject(edit.dialog) && currentMode.value === 'edit') ? edit?.dialog : dialog
    return {
      title: dialog.title ? dialog.title : currentMode.value === 'add' ? t('crud.add') : currentMode.value === 'edit' ? t('common.edit') : t('common.view'),
      width: '680px',
      confirmButtonLoading: confirmButtonLoading.value,
      ...dialogProps,
    }
  })

  const done = () => {
    isShowDialog.value = false
  }

  const handleCancel = () => {
    if (!mergedProps.value.onOperateCancel)
      done()

    emit('operate-cancel', {
      done,
      formRef: dialogForm.value,
      formData: dialogFormData.value,
      type: currentMode.value,
      row: currentMode.value === 'edit' ? rowData.value : {},
      confirmButtonLoading,
    })
  }

  const handleConfirm = () => {
    dialogForm.value.validate(async (isValid: boolean, invalidFields: ValidateField) => {
      const submitApi = mergedProps.value.request?.submitApi
      const addApi = mergedProps.value.request?.addApi
      const editApi = mergedProps.value.request?.editApi

      if (!submitApi && !addApi && !editApi) {
        emit('operate-submit', {
          done,
          isValid,
          invalidFields,
          formRef: dialogForm.value,
          formData: dialogFormData.value,
          type: currentMode.value,
          row: currentMode.value === 'edit' ? rowData.value : {},
          confirmButtonLoading,
        })
      }
      else {
        if (isValid) {
          confirmButtonLoading.value = true
          try {
            const params = getParams()
            if (currentMode.value === 'edit') {
              if (isFunction(submitApi))
                await submitApi(params)

              if (isFunction(editApi))
                await editApi(params as EditRequestApiParams)
            }
            if (currentMode.value === 'add') {
              if (isFunction(submitApi))
                await submitApi(params)

              if (isFunction(addApi))
                await addApi(params)
            }
            ElMessage.success(t('common.success'))
            done();
            (ctx?.$refs?.zTableRef as typeof ZTable).getTableData()
          }
          catch (error) {

          }
          confirmButtonLoading.value = false
        }
      }
    })
  }

  function getParams() {
    const params = { type: currentMode.value, formData: dialogFormData.value }
    if (currentMode.value === 'edit')
      return { ...params, row: rowData.value, [mergedProps.value.dataKey]: rowData.value[mergedProps.value.dataKey] }

    return params
  }

  const handleDialogClosed = () => {
    dialogForm.value.resetFields()
    if (isFunction(mergedProps.value.dialog?.onClosed))
      mergedProps.value.dialog.onClosed({ formRef: dialogForm.value, type: currentMode.value, row: currentMode.value === 'edit' ? rowData.value : {} })
  }

  const handleDialogOpen = async () => {
    const detailApi = mergedProps.value.request?.detailApi
    const detail = mergedProps.value.request?.alias?.detail
    if (currentMode.value === 'edit') {
      if (detailApi) {
        isOperateFormLoading.value = true
        try {
          const res = await detailApi({ [mergedProps.value.dataKey]: rowData.value[mergedProps.value.dataKey], row: rowData.value })
          dialogFormData.value = isFunction(detail) ? detail(res) : isString(detail) ? get(res, detail) : res?.data
        }
        catch (error) { }
        isOperateFormLoading.value = false
      }
      else {
        dialogFormData.value = isFunction(detail) ? detail({ ...rowData.value }) : { ...rowData.value }
      }
    }
    if (isFunction(mergedProps.value.dialog?.onOpen)) {
      mergedProps.value.dialog.onOpen({
        formRef: dialogForm.value,
        type: currentMode.value,
        row: currentMode.value === 'edit' ? rowData.value : {},
      })
    }
  }

  return { dialogProps, dialogFormData, dialogForm, isOperateFormLoading, handleCancel, handleConfirm, handleDialogClosed, handleDialogOpen }
}
