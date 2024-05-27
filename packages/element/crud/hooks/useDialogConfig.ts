import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-unified'
import type { ComponentInternalInstance } from 'vue-demi'
import { isFunction, isObject, isString } from '@ideaz/utils'
import type ZTable from '../../table/src/Table'
import type { CrudProps, EditRequestApiParams } from '../src/props'
import type { ValidateField } from '../../types'

export function useDialogConfig(props: CrudProps, emit: any, currentMode: Ref<'edit' | 'add' | 'view'>, isShowDialog: Ref<boolean>, rowData: Ref<any>) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const ctx = instance.proxy
  const dialogForm = ref()
  const dialogFormData = ref({})
  const confirmButtonLoading = ref(false)
  const isOperateFormLoading = ref(false)

  const { t } = useLocale()

  const dialogProps = computed(() => {
    const { add, edit, dialog } = props
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
    if (!props.onCancel)
      done()

    emit('cancel', { done, form: dialogForm.value, formData: dialogFormData.value, type: currentMode.value, confirmButtonLoading })
  }

  const handleConfirm = () => {
    dialogForm.value.validate(async (isValid: boolean, invalidFields: ValidateField) => {
      const submitApi = props.request?.submitApi
      const addApi = props.request?.addApi
      const editApi = props.request?.editApi

      if (!submitApi && !addApi && !editApi) {
        emit('operate-submit', {
          done,
          isValid,
          invalidFields,
          form: dialogForm.value,
          formData: dialogFormData.value,
          type: currentMode.value,
          rowData: currentMode.value === 'edit' ? rowData.value : {},
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
      return { ...params, row: rowData.value, [props.dataKey]: rowData.value[props.dataKey] }

    return params
  }

  const handleDialogClosed = () => {
    dialogForm.value.resetFields()
    if (isFunction(props.dialog?.onClosed))
      props.dialog.onClosed({ form: dialogForm.value, type: currentMode.value, rowData: currentMode.value === 'edit' ? rowData.value : {} })
  }

  const handleDialogOpen = async () => {
    const detailApi = props.request?.detailApi
    const detail = props.request?.alias?.detail
    if (currentMode.value === 'edit') {
      if (detailApi) {
        isOperateFormLoading.value = true
        try {
          const res = await detailApi({ [props.dataKey]: rowData.value[props.dataKey], row: rowData.value })
          dialogFormData.value = isFunction(detail) ? detail(res) : isString(detail) ? get(res, detail) : res?.data
        }
        catch (error) { }
        isOperateFormLoading.value = false
      }
      else {
        dialogFormData.value = isFunction(detail) ? detail({ ...rowData.value }) : { ...rowData.value }
      }
    }
    if (isFunction(props.dialog?.onOpen)) {
      props.dialog.onOpen({
        form: dialogForm.value,
        type: currentMode.value,
        rowData: currentMode.value === 'edit' ? rowData.value : {},
      })
    }
  }

  return { dialogProps, dialogFormData, dialogForm, isOperateFormLoading, handleCancel, handleConfirm, handleDialogClosed, handleDialogOpen }
}
