import { omit } from 'lodash-unified'
import { isFunction } from '@ideaz/utils'
import type { DialogProps } from '../src/props'
import { useButton } from './useButton'

export const useDialog = (props: DialogProps, emit: any) => {
  const dialogRef = ref()
  const isShowDialog = ref(false)

  const { confirmBtnProps, cancelBtnProps, isConfirmBtnLoading, isCancelBtnLoading } = useButton(props)

  const dialogConfig = computed(() => {
    return omit({ ...props, width: props.type !== 'normal' ? 420 : props.width }, ['cancelButtonProps', 'confirmButtonProps', 'title'])
  })

  const done = () => {
    isShowDialog.value = false
    emit('update:modelValue', false)
  }

  const handleCancel = () => {
    if (isFunction(props.beforeClose)) {
      props.beforeClose(done)
      return
    }
    if (isFunction(props.onCancel)) {
      emit('cancel', { done, cancelButtonLoading: isCancelBtnLoading })
      return
    }
    if (props.extend) {
      done()
      return
    }
    emit('update:modelValue', false)
  }

  const handleConfirm = () => {
    if (props.type === 'info' && !props.onConfirm)
      done()

    emit('confirm', { done, confirmButtonLoading: isConfirmBtnLoading })
  }

  const handleClosed = () => {
    if (props.extend)
      emit('vanish')
  }

  return { dialogConfig, dialogRef, isShowDialog, confirmBtnProps, cancelBtnProps, done, handleCancel, handleConfirm, handleClosed }
}
