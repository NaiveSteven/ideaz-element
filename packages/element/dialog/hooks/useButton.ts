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
      label: props.extend ? confirmBtnLabel.value : (props.confirmButtonLabel || t('common.confirm')),
      loading: props.extend ? isConfirmBtnLoading.value : props.isConfirmButtonLoading,
    }
  })

  const cancelBtnProps = computed(() => {
    return {
      ...props.cancelButtonProps,
      label: props.extend ? cancelBtnLabel.value : (props.cancelButtonLabel || t('common.cancel')),
      loading: props.extend ? isCancelBtnLoading.value : props.isCancelButtonLoading,
    }
  })

  return { confirmBtnProps, cancelBtnProps, isConfirmBtnLoading, isCancelBtnLoading }
}
