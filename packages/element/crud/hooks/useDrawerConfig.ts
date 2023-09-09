import type { CrudProps } from '../src/props'

export const useDrawerConfig = (props: CrudProps) => {
  const viewData = ref<any>({})
  const isDescLoading = ref(false)

  const { t } = useLocale()

  const drawerProps = computed(() => {
    return {
      title: t('common.view'),
      size: 520,
      ...props.drawer,
    }
  })

  const handleDrawerOpen = async (row: any) => {
    if (props.request?.viewApi) {
      isDescLoading.value = true
      try {
        const res = await props.request?.viewApi({ [props.dataKey]: row[props.dataKey] })
        viewData.value = res.data
      }
      catch (error) {
        console.log(error, 'detail error')
      }
      isDescLoading.value = false
    }
    else {
      viewData.value = row
    }
  }

  return { drawerProps, isDescLoading, viewData, handleDrawerOpen }
}
