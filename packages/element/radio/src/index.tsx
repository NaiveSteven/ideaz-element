import { resolveDynamicComponent, setFormAlias } from '@ideaz/shared';
import type { OptionsItem, RadioOptionsItem } from '~/types';

export default defineComponent({
  name: 'ZRadio',
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
    modelValue: {
      type: [String, Number],
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

    const getChildComponentName = (option: RadioOptionsItem) => {
      if (!option.type) return 'el-radio';
      if (option.type === 'radio' || option.type === 'radio-button')
        return `el-${option.type}`;
      return 'el-radio';
    };

    return () => {
      return (
        <el-radio-group
          value={vModelVal.value}
          modelValue={vModelVal.value}
          {...{ props: attrsAll.value }}
          {...{ on: { ...onAll.value, ...listeners } }}
          {...attrs}
          onInput={handleInput}
          onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
        >
          {props.options.map((option, index) => {
            const ChildName = getChildComponentName(option);
            return resolveDynamicComponent({
              name: ChildName,
              attrs: {
                ...option,
                label: option[setFormAlias(props).keys.value],
                disabled: option[setFormAlias(props).keys.disabled],
                key: index,
              },
              content: option[setFormAlias(props).keys.label],
            });
          })}
        </el-radio-group>
      );
    };
  },
});
