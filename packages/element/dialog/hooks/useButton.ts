import type { DialogProps } from '../src/props'

export const useButton = (props: DialogProps) => {
  const isConfirmBtnLoading = ref(false)
  const isCancelBtnLoading = ref(false)

  const { t } = useLocale()

  const confirmBtnLabel = ref(t('common.confirm'))
  const cancelBtnLabel = ref(t('common.cancel'))

  const confirmBtnProps = computed(() => {
    return {
      ...props.confirmButtonProps,
      label: props.extend ? confirmBtnLabel.value : (props.confirmButtonLabel || props.confirmButtonProps.label || t('common.confirm')),
      loading: props.extend ? isConfirmBtnLoading.value : (props.confirmButtonLoading || props.confirmButtonProps.loading),
    }
  })

  const cancelBtnProps = computed(() => {
    return {
      ...props.cancelButtonProps,
      label: props.extend ? cancelBtnLabel.value : (props.cancelButtonLabel || props.cancelButtonProps.label || t('common.cancel')),
      loading: props.extend ? isCancelBtnLoading.value : (props.cancelButtonLoading || props.cancelButtonProps.loading),
    }
  })

  return { confirmBtnProps, cancelBtnProps, isConfirmBtnLoading, isCancelBtnLoading }
}
