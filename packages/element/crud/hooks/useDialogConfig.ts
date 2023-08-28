import type { Ref } from 'vue'
import type { CrudProps } from '../src/props'

export const useDialogConfig = (props: CrudProps, currentMode: Ref<'edit' | 'add' | 'view'>) => {
  const dialogFormData = ref({})
  const dialogProps = computed(() => {
    const { dialog } = props
    return {
      title: dialog.title ? dialog.title : currentMode.value === 'add' ? '新增' : currentMode.value === 'edit' ? '编辑' : '查看',
      width: '680px',
    }
  })

  const handleCancel = () => {

  }

  const handleConfirm = () => {}

  return { dialogProps, dialogFormData, handleCancel, handleConfirm }
}
