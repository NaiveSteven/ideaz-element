import type { ElTable } from 'element-plus'
import type { ComponentInternalInstance, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import DialogTip from '../../dialog/src/dialog'
import type { CrudProps } from '../src/props'
import type { ITableProps } from '../../table/src/props'
import type { TableCol } from '~/types'

export const useSelectionData = (props: CrudProps, emit: any, tableProps: Ref<ITableProps>, getTableData: () => void) => {
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
        message: '确定删除选中数据吗？',
        onConfirm: async ({ done, confirmButtonLoading }: { done: () => void; confirmButtonLoading: Ref<boolean> }) => {
          confirmButtonLoading.value = true
          try {
            await deleteApi({ [props.dataKey]: selectionData.value.map((item: any) => item[props.dataKey]) })
            confirmButtonLoading.value = false
            done()
            ElMessage.success(t('common.success'))
            getTableData()
          }
          catch (error) {}
          confirmButtonLoading.value = false
        },
      })
    }
    emit('delete', selectionData.value)
  }

  return {
    selectionData,
    isSelection,
    handleCheckboxChange,
    handleCloseAlert,
    handleMultipleDelete,
  }
}
