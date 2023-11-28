import { ElMessage } from 'element-plus'
import { Delete, EditPen, View } from '@element-plus/icons-vue'
import DialogTip from '../../dialog/src/dialog'
import type { CrudProps } from '../src/props'

export const useTableColumns = (props: CrudProps, emit: any, getTableData: () => void) => {
  const { t } = useLocale()
  const rowData = ref({})
  const isShowDialog = ref(false)
  const isShowDrawer = ref(false)
  const currentMode = ref<'add' | 'view' | 'edit'>('add')

  const renderEdit = () => {
    return {
      label: t('common.edit'),
      type: 'primary',
      link: true,
      icon: markRaw(EditPen),
      onClick: (row, index, column) => {
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
      onClick: (row, index) => {
        rowData.value = row
        if (props.request?.deleteApi) {
          DialogTip({
            type: 'danger',
            message: '确定删除该条数据吗',
            onConfirm: async ({ done, confirmButtonLoading }: { done: () => void; confirmButtonLoading: Ref<boolean> }) => {
              const dataKey = props.dataKey
              confirmButtonLoading.value = true
              try {
                await props.request?.deleteApi({ [dataKey]: row[dataKey] })
                confirmButtonLoading.value = false
                done()
                ElMessage.success(t('common.success'))
                getTableData()
              }
              catch (error) {
                console.log(error, 'delete error')
              }
              confirmButtonLoading.value = false
            },
          })
        }
        emit('delete', row)
      },
    }
  }

  const renderView = () => {
    return {
      label: '查看',
      type: 'primary',
      link: true,
      icon: markRaw(View),
      onClick: (row, index) => {
        rowData.value = row
        isShowDrawer.value = true
      },
    }
  }

  const tableColumns = computed(() => {
    return props.columns.concat([
      {
        type: 'button',
        label: t('table.action'),
        buttons: [
          renderView(),
          renderEdit(),
          renderDelete(),
        ],
      },
    ])
  })

  return { tableColumns, isShowDialog, rowData, currentMode, isShowDrawer }
}
