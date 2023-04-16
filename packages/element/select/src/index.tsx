import { setFormAlias } from '@ideaz/shared';
import type { OptionsItem } from '~/types';

export default defineComponent({
  name: 'ZSelect',
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
      required: false,
    },
    modelValue: {
      type: [String, Number, Array],
      default: '',
      required: false,
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { emit, listeners = {} }) {
    const { attrsAll, onAll } = useFormComponentAttrs(props);
    const { vModelVal, handleInput } = useVModel(props, emit);
    const attrs = useAttrs();

    return () => (
      <el-select
        value={vModelVal.value}
        modelValue={vModelVal.value}
        {...{ props: attrsAll.value }}
        {...{ on: { ...onAll.value, ...listeners } }}
        {...attrs}
        onInput={handleInput}
        onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
      >
        {props.options.map((option, index) => {
          return (
            <el-option
              key={index}
              {...{ props: option }}
              label={option[setFormAlias(props).keys.value]}
              disabled={option[setFormAlias(props).keys.disabled]}
            >
              {option[setFormAlias(props).keys.label]}
            </el-option>
          );
        })}
      </el-select>
    );
  },
});
