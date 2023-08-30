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

  const dialogProps = computed(() => {
    const { dialog } = props
    return {
      title: dialog.title ? dialog.title : currentMode.value === 'add' ? '新增' : currentMode.value === 'edit' ? '编辑' : '查看',
      width: '680px',
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
      if (!submitApi) {
        emit('submit', { done, isValid, invalidFields, form: dialogForm.value, formData: dialogFormData.value, type: currentMode.value })
      }
      else {
        if (isValid) {
          let params = { ...dialogFormData.value }
          if (currentMode.value === 'edit')
            params = { ...dialogFormData.value, id: rowData.value.id }

          await submitApi(params)
          ElMessage.success('成功')
          done();
          (ctx?.$refs?.zTableRef as typeof ZTable).getTableData()
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
