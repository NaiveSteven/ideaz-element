import type { FilterFormProps } from '../src/props'

export const useFilterFormButtons = (props: FilterFormProps) => {
  const { t } = useLocale()

  const searchButtonProps = computed(() => {
    return {
      ...props.searchButtonProps,
      label: props.searchButtonLabel || props.searchButtonProps.label || t('common.search'),
      loading: props.searchButtonLoading || props.searchButtonProps.loading,
    }
  })

  const resetButtonProps = computed(() => {
    return {
      ...props.resetButtonProps,
      label: props.resetButtonLabel || props.resetButtonProps.label || t('common.reset'),
      loading: props.resetButtonLoading || props.resetButtonProps.loading,
    }
  })

  return { searchButtonProps, resetButtonProps }
}
