import type { ElTable } from 'element-plus'
import type { ComponentInternalInstance, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { isFunction } from '@ideaz/utils'
import DialogTip from '../../dialog/src/dialog'
import type { CrudProps } from '../src/props'
import type { ITableProps } from '../../table/src/props'
import type { TableCol } from '~/types'

export const useSelectionData = (props: CrudProps, emit: any, tableProps: Ref<ITableProps>, refreshAfterRequest: () => void) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
  const selectionData = ref(props.selectionData || [])

  const { t } = useLocale()

  const isSelection = computed(() => {
    return tableProps.value.columns.filter((column: TableCol) => column.type === 'selection').length > 0 && selectionData.value.length > 0
  })

  const handleCheckboxChange = (selection: any) => {
    emit('selection-change', selection)
    emit('update:selectionData', selection)
    if (props.selectionData === undefined)
      selectionData.value = selection
  }

  const handleCloseAlert = () => {
    (ctx!.$refs.zTableRef as typeof ElTable).clearSelection()
  }

  const handleMultipleDelete = () => {
    const deleteApi = props.request?.deleteApi
    if (deleteApi) {
      DialogTip({
        type: 'danger',
        message: t('crud.multipleDeleteTip'),
        onConfirm: async ({ done, confirmButtonLoading }: { done: () => void; confirmButtonLoading: Ref<boolean> }) => {
          confirmButtonLoading.value = true
          try {
            const deleteParams = props.request?.deleteParams
            await deleteApi(isFunction(deleteParams) ? deleteParams(selectionData.value) : { [props.dataKey]: selectionData.value.map((item: any) => item[props.dataKey]) })
            confirmButtonLoading.value = false
            done()
            ElMessage.success(t('common.success'))
            refreshAfterRequest()
          }
          catch (error) {}
          confirmButtonLoading.value = false
        },
      })
    }
    emit('operate-delete', selectionData.value)
  }

  return {
    selectionData,
    isSelection,
    handleCheckboxChange,
    handleCloseAlert,
    handleMultipleDelete,
  }
}
