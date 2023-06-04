import { isVue3 } from 'vue-demi'
import { reactiveOmit } from '@vueuse/core'
import { isFunction } from '@ideaz/utils'
import { useInputMethods, useInputSlots } from '../hooks'
import { INPUT_SLOTS, inputEmits, inputProps } from './input'

export default defineComponent({
  name: 'ZInput',
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup: (props, { emit, slots, listeners = {}, attrs }) => {
    const { vModelVal, handleInput } = useVModel(props, emit)
    const { scopedSlots } = useInputSlots(props, slots)
    const { focus, blur, select, clear, resizeTextarea } = useInputMethods()
    const size = useFormSize()
    useExpose({ focus, blur, select, clear, resizeTextarea })

    return () => {
      if (isVue3) {
        const vue3Props = reactiveOmit(props, 'value', 'prefix')

        return (
          <el-input
            ref="inputRef"
            {...vue3Props}
            {...attrs}
            size={size.value}
            modelValue={vModelVal.value}
            onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
            v-slots={scopedSlots}
          />
        )
      }
      else {
        return (
          <el-input
            ref="inputRef"
            {...{ props: { ...props, ...attrs, size: size.value } }}
            {...{ on: listeners }}
            value={vModelVal.value}
            onInput={handleInput}
          >
            {INPUT_SLOTS.map((slot) => {
              if (isFunction(scopedSlots[slot]))
                return <template slot={slot}>{(scopedSlots[slot] as () => VNode)()}</template>

              return null
            })}
          </el-input>
        )
      }
    }
  },
})
