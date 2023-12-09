import { get } from 'lodash-unified'
import { isFunction, isString } from '@ideaz/utils'
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
    if (props.request?.detailApi) {
      isDescLoading.value = true
      try {
        const detail = props.request?.alias?.detail
        const detailParams = props.request?.detailParams
        const res = await props.request?.detailApi(isFunction(detailParams) ? detailParams({ rowData: row }) : { [props.dataKey]: row[props.dataKey] })
        viewData.value = isFunction(detail) ? detail(res) : isString(detail) ? get(res, detail) : res?.data
      }
      catch (error) {}
      isDescLoading.value = false
    }
    else {
      viewData.value = row
    }
  }

  return { drawerProps, isDescLoading, viewData, handleDrawerOpen }
}
