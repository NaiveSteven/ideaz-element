import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ComponentInternalInstance } from 'vue-demi'
import { isFunction, isObject } from '@ideaz/utils'
import type ZTable from '../../table/src/Table'
import type { CrudProps } from '../src/props'
import type { ValidateField } from '~/types'

export const useDialogConfig = (props: CrudProps, emit: any, currentMode: Ref<'edit' | 'add' | 'view'>, isShowDialog: Ref<boolean>, rowData: Ref<any>) => {
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
                await editApi(params)
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
    let params = { ...dialogFormData.value }
    const addParams = props.request?.addParams
    const editParams = props.request?.editParams
    const submitParams = props.request?.submitParams
    if (currentMode.value === 'edit') {
      params = isFunction(editParams) ? editParams({ formData: dialogFormData.value, rowData: rowData.value }) : { ...dialogFormData.value, id: rowData.value.id }
      if (isFunction(submitParams))
        return submitParams({ formData: dialogFormData.value, rowData: rowData.value, type: currentMode.value })
      return params
    }
    if (currentMode.value === 'add') {
      params = isFunction(addParams) ? addParams({ formData: dialogFormData.value }) : { ...dialogFormData.value }
      if (isFunction(submitParams))
        return submitParams({ formData: dialogFormData.value, type: currentMode.value })
      return params
    }
    return params
  }

  const handleDialogClosed = () => {
    dialogForm.value.resetFields()
    if (isFunction(props.dialog?.onClosed))
      props.dialog.onClosed()
  }

  const handleDialogOpen = async () => {
    const editDetailApi = props.request?.editDetailApi
    const transformEditDetail = props.request?.transformEditDetail
    if (editDetailApi) {
      isOperateFormLoading.value = true
      try {
        const res = await editDetailApi({ [props.dataKey]: rowData.value[props.dataKey] })
        dialogFormData.value = isFunction(transformEditDetail) ? transformEditDetail(res) : res.data
      }
      catch (error) {}
      isOperateFormLoading.value = false
    }
    else {
      dialogFormData.value = isFunction(transformEditDetail) ? transformEditDetail({ ...rowData.value }) : { ...rowData.value }
    }
    if (isFunction(props.dialog?.onOpen))
      props.dialog.onOpen()
  }

  return { dialogProps, dialogFormData, dialogForm, isOperateFormLoading, handleCancel, handleConfirm, handleDialogClosed, handleDialogOpen }
}
