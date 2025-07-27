import { isFunction } from '@ideaz/utils'
import { cloneDeep, set } from 'lodash-unified'
import type { ComputedRef } from 'vue'
import type { FormColumn } from '../../types'
import {
  useCol,
  useFormSlots,
} from './hooks'
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
      type: Object as PropType<ComputedRef<FormProps>>,
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
    const formPropsValue = computed(() => props.formProps.value)

    return () => {
      const { columns, options, modelValue } = props
      return columns.map((col: FormColumn, colIndex: number) => {
        const { scopedSlots } = useFormSlots(col, slots, formPropsValue.value)
        const { colKls, colStyle } = useCol(formPropsValue.value, col)
        return (
          <FormItem
            key={col.__key}
            ref={`formItem${colIndex}`}
            col={col}
            modelValue={modelValue}
            formConfig={formPropsValue.value}
            options={options}
            class={colKls.value}
            style={colStyle.value}
            v-slots={{ ...slots, ...scopedSlots }}
            v-show={isFunction(col.show) ? col.show(modelValue) : col.show}
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
