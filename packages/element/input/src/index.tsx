import { ElInput } from 'element-plus'
import { omit } from 'lodash-unified'
import { useInputMethods } from '../hooks'
import { FILTER_INPUT_PROPS, INPUT_SLOTS, inputEmits, zInputProps } from './input'

export default defineComponent({
  name: 'ZInput',
  inheritAttrs: false,
  props: zInputProps,
  emits: inputEmits,
  setup: (props, { emit, slots }) => {
    const { vModelVal } = useVModel(props, emit)
    const { scopedSlots } = useFormComponentSlots(props, slots, INPUT_SLOTS)
    const { focus, blur, select, clear, resizeTextarea } = useInputMethods()
    const size = useFormSize()
    const attrs = useAttrs()
    useExpose({ focus, blur, select, clear, resizeTextarea })

    return () => {
      return (
        <ElInput
          ref="inputRef"
          {...omit(props, FILTER_INPUT_PROPS)}
          {...attrs}
          size={size.value}
          modelValue={vModelVal.value}
          onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
          v-slots={scopedSlots.value}
        />
      )
    }
  },
})
