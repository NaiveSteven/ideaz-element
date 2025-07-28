import { get } from 'lodash-unified'
import { isFunction, isString } from '@ideaz/utils'
import type { CrudProps } from '../props'

export function useDrawerConfig(mergedProps: ComputedRef<CrudProps>) {
  const viewData = ref<any>({})
  const isDescLoading = ref(false)

  const { t } = useLocale()

  const drawerProps = computed(() => {
    return {
      title: t('common.view'),
      size: 520,
      ...mergedProps.value.drawer,
    }
  })

  const handleDrawerOpen = async (row: any) => {
    const detail = mergedProps.value.request?.alias?.detail
    if (mergedProps.value.request?.detailApi) {
      isDescLoading.value = true
      try {
        const res = await mergedProps.value.request?.detailApi({ [mergedProps.value.dataKey]: row[mergedProps.value.dataKey], row })
        viewData.value = isFunction(detail) ? detail(res) : isString(detail) ? get(res, detail) : res?.data
      }
      catch (error) {}
      isDescLoading.value = false
    }
    else {
      viewData.value = isFunction(detail) ? detail({ ...row }) : { ...row }
    }
    if (isFunction(mergedProps.value.drawer?.onOpen))
      mergedProps.value.drawer.onOpen({ row })
  }

  return { drawerProps, isDescLoading, viewData, handleDrawerOpen }
}
