import { useExpose } from '@ideaz/hooks'
import {
  useRadioColumnMethods,
  useTableColumnSlots,
} from '../hooks'
import RadioColumn from './RadioColumn'
import { tableColumnProps } from './props'

export default defineComponent({
  name: 'ZTableColumn',
  components: { RadioColumn },
  props: tableColumnProps,
  emits: ['radio-change'],
  setup(props, { emit, slots }) {
    const { clearSelection, toggleRadioSelection } = useRadioColumnMethods()
    const { scopedSlots } = useTableColumnSlots(props, slots)

    useExpose({
      clearSelection,
      toggleRadioSelection,
    })

    const attrsAll = computed(() => {
      return { align: 'center', ...props.column }
    })

    return () => {
      const { column, tableProps } = props

      if (column.type === 'radio') {
        return (
          <RadioColumn
            ref="radioColumn"
            column={column}
            tableProps={tableProps}
            onRadio-change={(row: any) => emit('radio-change', row)}
          />
        )
      }
      return (
        <el-table-column {...attrsAll.value} v-slots={scopedSlots.value}/>
      )
    }
  },
})
