import { getRowKey } from '@ideaz/shared'
import { radioColumnProps } from './props'

export default defineComponent({
  name: 'ZRadioColumn',
  props: radioColumnProps,
  emits: ['radio-change'],
  setup(props, { emit, expose }) {
    const radioValue = ref('')

    const attrsAll = computed(() => {
      return { width: 48, align: 'center', ...props.column }
    })

    const handleRadioChange = (row: any) => {
      emit('radio-change', row)
    }

    const clearSelection = () => {
      radioValue.value = ''
      emit('radio-change', {})
    }

    const toggleRadioSelection = (row: any) => {
      const { rowKey } = props.tableProps
      const rowKeyVal = getRowKey(row, rowKey)
      radioValue.value = rowKeyVal
      handleRadioChange(row)
    }

    expose({
      clearSelection,
      toggleRadioSelection,
    })

    return () => {
      return (
        <el-table-column
          {...attrsAll.value}
          v-slots={{
            default: ({ row }: any) => {
              return (
                <el-radio
                  v-model={radioValue.value}
                  label={getRowKey(row, props.tableProps?.rowKey)}
                  onChange={() => handleRadioChange(row)}
                />
              )
            },
          }}
        />
      )
    }
  },
})
