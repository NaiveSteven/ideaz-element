import type { CrudProps } from '../src/props'

export const useDrawerConfig = (props: CrudProps) => {
  const { t } = useLocale()

  const drawerProps = computed(() => {
    return {
      title: t('common.view'),
      size: 520,
      ...props.drawer,
    }
  })

  return { drawerProps }
}
