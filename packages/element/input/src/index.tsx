import { isVue3 } from 'vue-demi';
import { useInputSlots } from '../hooks';

export default defineComponent({
  name: 'ZInput',
  props: {
    value: {
      type: String,
      default: '',
      required: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
    prepend: {
      type: [String, Function],
      default: '',
    },
    append: {
      type: [String, Function],
      default: '',
    },
    prefix: {
      type: [String, Function],
      default: '',
    },
    suffix: {
      type: [String, Function],
      default: '',
    },
  },
  emits: ['input', 'update:modelValue'],
  setup: (props, { emit, slots }) => {
    const { vModelVal, handleInput } = useVModel(props, emit);
    const { scopedSlots } = useInputSlots(props, slots);

    return () => {
      if (isVue3) {
        return (
          <el-input
            modelValue={vModelVal.value}
            onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
            v-slots={scopedSlots}
          />
        );
      } else {
        return (
          <el-input value={vModelVal.value} onInput={handleInput}>
            <div slot="prepend">
              {scopedSlots.prepend && scopedSlots.prepend()}
            </div>
          </el-input>
        );
      }
    };
  },
});
