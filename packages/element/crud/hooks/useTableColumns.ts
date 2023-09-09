import type { CrudProps } from '../src/props'

export const useTableColumns = (props: CrudProps, emit: any) => {
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
        isShowDrawer.value = true
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
