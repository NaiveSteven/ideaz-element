import { isFunction } from '@ideaz/utils'
import { cloneDeep, set } from 'lodash-unified'
import {
  useCol,
  useFormSlots,
} from '../hooks'
import FormItem from './FormItem'
import type { FormProps } from './props'
import type { FormColumn } from '~/types'

const renderContent = (col: FormColumn, slots: any) => {
  if (col.slot)
    return slots[col.slot] && slots[col.slot]()

  if (isFunction(col.render))
    return col.render(h)
}

export default defineComponent({
  name: 'FormColumns',
  components: { FormItem },
  props: {
    columns: {
      type: Array as PropType<FormColumn[]>,
      default: () => [],
    },
    formProps: {
      type: Object as PropType<FormProps>,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    return () => {
      const { columns, formProps, options, modelValue } = props
      return columns.map((col: FormColumn, colIndex: number) => {
        const { scopedSlots } = useFormSlots(col, slots, formProps)
        const { colKls, colStyle } = useCol(formProps, col)
        return <FormItem
          key={col.__key}
          ref={`formItem${colIndex}`}
          col={col}
          modelValue={modelValue}
          formConfig={formProps}
          options={options}
          class={colKls.value}
          style={colStyle.value}
          v-slots={{ ...slots, ...scopedSlots }}
          v-show={isFunction(col.hideUseVShow) ? !col.hideUseVShow(modelValue) : true}
          onUpdate:modelValue={(val: any, field: string) => {
            emit('update:modelValue', set(cloneDeep(modelValue), field, val))
            emit('change', { prop: val, field })
          }}
        >
          {(isFunction(col.render) || col.slot) ? renderContent(col, slots) : null}
        </FormItem>
      })
    }
  },
})
