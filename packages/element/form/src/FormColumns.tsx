import { isFunction } from '@ideaz/utils'
import { cloneDeep, set } from 'lodash-unified'
import {
  useCol,
  useFormSlots,
} from '../hooks'
import type { FormColumn } from '../../types'
import FormItem from './FormItem'
import type { FormProps } from './props'

function renderContent(col: FormColumn, slots: any, data: any) {
  if (col.slot)
    return slots[col.slot] && slots[col.slot]({ formData: data })

  if (isFunction(col.render))
    return col.render({ formData: data })
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
        return (
          <FormItem
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
              const newVal = set(cloneDeep(modelValue), field, val)
              emit('update:modelValue', newVal)
              emit('change', { value: val, field, formData: newVal })
            }}
          >
            {(isFunction(col.render) || col.slot) ? renderContent(col, slots, props.modelValue) : null}
          </FormItem>
        )
      })
    }
  },
})
