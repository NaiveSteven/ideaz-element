import { omit } from 'lodash-unified'
import { isFunction } from '@ideaz/utils'
import { getCurrentInstance } from 'vue'
import type { DialogProps } from '../src/props'

export const useDialog = (props: DialogProps, emit: any) => {
  const ctx = getCurrentInstance()
  const dialogRef = ref()
  const isShowDialog = ref(false)

  const dialogConfig = computed(() => {
    return omit({ ...props, width: props.type !== 'normal' ? 420 : props.width }, ['cancelButtonProps', 'confirmButtonProps', 'title'])
  })

  const done = () => {
    isShowDialog.value = false
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
    if (props.extend) {
      done()
      return
    }
    emit('update:modelValue', false)
  }

  const handleConfirm = () => {
    emit('confirm', done, ctx)
  }

  const handleClosed = () => {
    if (props.extend)
      emit('vanish')
  }

  return { dialogConfig, dialogRef, isShowDialog, done, handleCancel, handleConfirm, handleClosed }
}
