import { get } from 'lodash-unified'
import { isFunction, isString } from '@ideaz/utils'
import type { CrudProps } from '../props'

export function useDrawerConfig(props: CrudProps) {
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
    const detail = props.request?.alias?.detail
    if (props.request?.detailApi) {
      isDescLoading.value = true
      try {
        const res = await props.request?.detailApi({ [props.dataKey]: row[props.dataKey], row })
        viewData.value = isFunction(detail) ? detail(res) : isString(detail) ? get(res, detail) : res?.data
      }
      catch (error) {}
      isDescLoading.value = false
    }
    else {
      viewData.value = isFunction(detail) ? detail({ ...row }) : { ...row }
    }
    if (isFunction(props.drawer?.onOpen))
      props.drawer.onOpen({ row })
  }

  return { drawerProps, isDescLoading, viewData, handleDrawerOpen }
}
