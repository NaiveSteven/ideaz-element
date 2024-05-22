import { isFunction } from '@ideaz/utils'
import type { ElTable } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Delete, EditPen, View } from '@element-plus/icons-vue'
import type { ComponentInternalInstance } from 'vue'
import DialogTip from '../../dialog/src/dialog'
import type { TableCol, TableColumnScopeData } from '../../types'
import type { CrudProps } from '../src/props'
import { COLUMN_TYPE_FIELDS } from '../src/props'

export function useTableColumns(props: CrudProps, emit: any, getTableData: () => void) {
  const { t } = useLocale()
  const rowData = ref({})
  const isShowDialog = ref(false)
  const isShowDrawer = ref(false)
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
  const currentMode = ref<'add' | 'view' | 'edit'>('add')

  const refreshAfterRequest = () => {
    const tableRef = ctx!.$refs.zTableRef as typeof ElTable
    tableRef.clearSelection()
    tableRef.clearSort()
    tableRef.clearFilter()
    getTableData()
  }

  const renderEdit = () => {
    return {
      label: t('common.edit'),
      type: 'primary',
      link: true,
      icon: markRaw(EditPen),
      onClick: ({ row }: TableColumnScopeData) => {
        rowData.value = row
        currentMode.value = 'edit'
        isShowDialog.value = true
      },
    }
  }

  const renderDelete = () => {
    return {
      label: t('common.delete'),
      type: 'danger',
      link: true,
      icon: markRaw(Delete),
      onClick: ({ row }: TableColumnScopeData) => {
        rowData.value = row
        if (props.request?.deleteApi) {
          DialogTip({
            type: 'danger',
            message: t('crud.deleteTip'),
            onConfirm: async ({ done, confirmButtonLoading }: { done: () => void, confirmButtonLoading: Ref<boolean> }) => {
              const dataKey = props.dataKey
              const deleteParams = props.request?.deleteParams
              confirmButtonLoading.value = true
              try {
                await props.request?.deleteApi?.(isFunction(deleteParams) ? deleteParams(row) : { [dataKey]: row[dataKey] })
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
        emit('operate-delete', row)
      },
    }
  }

  const renderView = () => {
    return {
      label: t('common.view'),
      type: 'primary',
      link: true,
      icon: markRaw(View),
      onClick: ({ row }: TableColumnScopeData) => {
        rowData.value = row
        isShowDrawer.value = true
      },
    }
  }

  const tableColumns = computed(() => {
    const columns = props.columns?.filter((column: TableCol) => COLUMN_TYPE_FIELDS.some(key => column[key])) || []
    if (props.action && (props.detail !== false || props.edit !== false || props.delete !== false)) {
      const buttons = [props.detail !== false && renderView(), props.edit !== false && renderEdit(), props.delete !== false && renderDelete()].filter(item => item)
      return columns.concat([
        {
          type: 'button',
          label: t('table.action'),
          fixed: 'right',
          width: buttons.length * 60,
          buttons,
        },
      ])
    }
    return columns
  })

  return { tableColumns, isShowDialog, rowData, currentMode, isShowDrawer, refreshAfterRequest }
}
