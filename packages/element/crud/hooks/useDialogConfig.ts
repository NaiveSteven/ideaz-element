import type { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ComponentInternalInstance } from 'vue-demi'
import { isFunction } from '@ideaz/utils'
import type ZTable from '../../table/src/Table'
import type { CrudProps } from '../src/props'
import type { ValidateField } from '~/types'

export const useDialogConfig = (props: CrudProps, emit: any, currentMode: Ref<'edit' | 'add' | 'view'>, isShowDialog: Ref<boolean>, rowData: Ref<any>) => {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const ctx = instance.proxy
  const dialogForm = ref()
  const dialogFormData = ref({})
  const confirmButtonLoading = ref(false)

  const { t } = useLocale()

  const dialogProps = computed(() => {
    const { dialog } = props
    return {
      title: dialog.title ? dialog.title : currentMode.value === 'add' ? t('crud.add') : currentMode.value === 'edit' ? t('common.edit') : t('common.view'),
      width: '680px',
      confirmButtonLoading: confirmButtonLoading.value,
      ...dialog,
    }
  })

  const done = () => {
    isShowDialog.value = false
  }

  const handleCancel = () => {
    if (!props.onCancel)
      done()

    emit('cancel', { done, form: dialogForm.value, formData: dialogFormData.value, type: currentMode.value })
  }

  const handleConfirm = () => {
    dialogForm.value.validate(async (isValid: boolean, invalidFields: ValidateField) => {
      const submitApi = props.request?.submitApi
      const addApi = props.request?.addApi
      const editApi = props.request?.editApi
      if (!submitApi && !addApi && !editApi) {
        emit('submit', { done, isValid, invalidFields, form: dialogForm.value, formData: dialogFormData.value, type: currentMode.value, rowData: currentMode.value === 'edit' ? rowData.value : {} })
      }
      else {
        if (isValid) {
          confirmButtonLoading.value = true
          try {
            let params = { ...dialogFormData.value }

            if (currentMode.value === 'edit') {
              params = { ...dialogFormData.value, id: rowData.value.id }
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

  const handleDialogClosed = () => {
    dialogForm.value.resetFields()
    if (isFunction(props.dialog?.onClosed))
      props.dialog.onClosed()
  }

  return { dialogProps, dialogFormData, dialogForm, handleCancel, handleConfirm, handleDialogClosed }
}
