import { ElMessage } from 'element-plus'
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
      type: 'primary',
      link: true,
      onClick: (row, index) => {
        rowData.value = row
        if (props.request?.deleteApi) {
          DialogTip({
            type: 'danger',
            message: '确定删除该条数据吗',
            onConfirm: async ({ done, confirmBtnLoading }) => {
              const dataKey = props.dataKey
              confirmBtnLoading.value = true
              try {
                await props.request?.deleteApi({ [dataKey]: row[dataKey] })
                confirmBtnLoading.value = false
                done()
                ElMessage.success(t('common.success'))
                getTableData()
              }
              catch (error) {
                console.log(error, 'delete error')
              }
              confirmBtnLoading.value = false
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
          renderEdit(),
          renderView(),
          renderDelete(),
        ],
      },
    ])
  })

  return { tableColumns, isShowDialog, rowData, currentMode, isShowDrawer }
}
