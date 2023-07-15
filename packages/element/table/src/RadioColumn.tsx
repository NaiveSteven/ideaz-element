import { isFunction, isString } from '@ideaz/utils'

export default defineComponent({
  name: 'ZRadioColumn',
  props: {
    tableCol: {
      type: Object,
      default: () => ({}),
    },
    tableAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['radio-change'],
  setup(props, { emit, expose }) {
    const radioValue = ref('')

    const attrsAll = computed(() => {
      return { width: 48, align: 'center', ...props.tableCol }
    })

    const getRowKey = (rowData: any) => {
      const rowKey = props.tableAttrs.rowKey || props.tableAttrs['row-key']
      if (isFunction(rowKey))
        return rowKey(rowData)

      if (isString(rowKey))
        return rowData[rowKey]

      return rowData.id
    }

    const handleRadioChange = (row: any) => {
      emit('radio-change', row)
    }

    const clearSelection = () => {
      radioValue.value = ''
      emit('radio-change', {})
    }

    const toggleRadioSelection = (row: any) => {
      const rowKey = props.tableAttrs.rowKey || props.tableAttrs['row-key']
      const rowKeyVal = isFunction(rowKey)
        ? rowKey(row)
        : isString(rowKey)
          ? row[rowKey]
          : row.id
      radioValue.value = rowKeyVal
      handleRadioChange(row)
    }

    expose({
      clearSelection,
      toggleRadioSelection,
    })

    return () => {
      return <el-table-column {...attrsAll.value} v-slots={{
        default: ({ row }: any) => {
          return <el-radio
            v-model={radioValue.value}
            label={getRowKey(row)}
            onChange={handleRadioChange(row)}
          />
        },
      }} />
    }
  },
})
