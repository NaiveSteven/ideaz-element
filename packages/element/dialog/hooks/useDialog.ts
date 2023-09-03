import { omit } from 'lodash-unified'
import { isFunction } from '@ideaz/utils'
import type { DialogProps } from '../src/props'

export const useDialog = (props: DialogProps, emit: any) => {
  const dialogRef = ref()

  const dialogConfig = computed(() => {
    return omit(props, ['cancelButtonProps', 'confirmButtonProps', 'title'])
  })

  const done = () => {
    dialogRef.value.done()
  }

  const handleCancel = () => {
    if (isFunction(props.beforeClose)) {
      props.beforeClose(done)
      return
    }
    if (isFunction(props.onCancel)) {
      emit('cancel', done)
      return
    }
    emit('update:modelValue', false)
  }

  const handleConfirm = () => {
    emit('confirm', done)
  }

  return { dialogConfig, dialogRef, handleCancel, handleConfirm }
}
