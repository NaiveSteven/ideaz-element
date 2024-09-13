import type { ElTable } from 'element-plus'
import type { ComponentInternalInstance, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { isFunction, isObject } from '@ideaz/utils'
import DialogTip from '../../../dialog/src/dialog'
import type ZTable from '../../../table/src/Table'
import type { CrudDeleteDialogTipProps, CrudProps } from '../props'
import type { ITableProps } from '../../../table/src/props'
import type { TableCol } from '../../../types'

export function useSelectionData(props: CrudProps, emit: any, tableProps: Ref<ITableProps>, refreshAfterRequest: () => void, getTableData: () => void) {
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
      const dialogTipProps: CrudDeleteDialogTipProps = isObject(props.delete) ? props.delete as CrudDeleteDialogTipProps : {} as CrudDeleteDialogTipProps
      DialogTip({
        type: 'danger',
        ...dialogTipProps as Omit<CrudDeleteDialogTipProps, 'type'>,
        message: isFunction(dialogTipProps.message) ? dialogTipProps.message({ selectionData: selectionData.value }) : t('crud.multipleDeleteTip'),
        onConfirm: isFunction(dialogTipProps.onConfirm)
          ? ({ done, confirmButtonLoading }) => dialogTipProps.onConfirm?.({ done, confirmButtonLoading, selectionData: selectionData.value, tableRef: ctx!.$refs.zTableRef as typeof ZTable, getTableData })
          : async ({ done, confirmButtonLoading }: { done: () => void, confirmButtonLoading: Ref<boolean> }) => {
            confirmButtonLoading.value = true
            try {
              await deleteApi({ [props.dataKey]: selectionData.value.map((item: any) => item[props.dataKey]), selectionData: selectionData.value })
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
    emit('operate-delete', { selectionData: selectionData.value, table: ctx!.$refs.zTableRef as typeof ZTable, getTableData })
  }

  return {
    selectionData,
    isSelection,
    handleCheckboxChange,
    handleCloseAlert,
    handleMultipleDelete,
  }
}