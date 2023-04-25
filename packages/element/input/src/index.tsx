import { isVue3 } from 'vue-demi';
import { useExpose } from '@ideaz/hooks';
import { useFormMethods, useInputSlots } from '../hooks';
import { INPUT_SLOTS, inputEmits, inputProps } from './input';

export default defineComponent({
  name: 'ZInput',
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup: (props, { emit, slots, listeners = {}, attrs }) => {
    const { vModelVal, handleInput } = useVModel(props, emit);
    const { scopedSlots } = useInputSlots(props, slots);
    const { focus, blur, select } = useFormMethods();

    useExpose({ focus, blur, select });

    return () => {
      if (isVue3) {
        const vue3Props = { ...props };
        delete vue3Props.value;
        delete vue3Props.prefix;
        return (
          <el-input
            ref="inputRef"
            {...vue3Props}
            {...attrs}
            modelValue={vModelVal.value}
            onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
            v-slots={scopedSlots}
          />
        );
      } else {
        return (
          <el-input
            ref="inputRef"
            {...{ props: { ...props, ...attrs } }}
            {...{ on: listeners }}
            value={vModelVal.value}
            onInput={handleInput}
          >
            {INPUT_SLOTS.map((slot) => {
              if (scopedSlots[slot]) {
                return <template slot={slot}>{scopedSlots[slot]!()}</template>;
              }
              return null;
            })}
          </el-input>
        );
      }
    };
  },
});
