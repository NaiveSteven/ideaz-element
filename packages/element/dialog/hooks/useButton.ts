import type { DialogProps } from '../src/props'

export const useButton = (props: DialogProps) => {
  const isConfirmBtnLoading = ref(false)
  const isCancelBtnLoading = ref(false)
  const confirmBtnLabel = ref('确认')
  const cancelBtnLabel = ref('取消')

  const confirmBtnProps = computed(() => {
    return {
      ...props.confirmButtonProps,
      label: props.extend ? confirmBtnLabel.value : props.confirmButtonLabel,
      loading: props.extend ? isConfirmBtnLoading.value : props.isConfirmButtonLoading,
    }
  })

  const cancelBtnProps = computed(() => {
    return {
      ...props.cancelButtonProps,
      label: props.extend ? cancelBtnLabel.value : props.cancelButtonLabel,
      loading: props.extend ? isCancelBtnLoading.value : props.isCancelButtonLoading,
    }
  })

  return { confirmBtnProps, cancelBtnProps, isConfirmBtnLoading, isCancelBtnLoading }
}
