import type { CrudProps } from '../src/props'

export const useTableColumns = (props: CrudProps, emit: any) => {
  const { t } = useLocale()

  const renderEdit = () => {
    return {
      label: t('table.edit'),
      type: 'primary',
      link: true,
      onClick: (row, index, column) => {

      },
    }
  }

  const renderDelete = () => {
    return {
      label: t('table.delete'),
      type: 'primary',
      link: true,
      onClick: (row, index) => {
        emit('delete', row, index)
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
          renderDelete(),
        ],
      },
    ])
  })

  return { tableColumns }
}
