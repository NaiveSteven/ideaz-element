import { resolveDynamicComponent, setFormAlias } from '@ideaz/shared';
import type { CheckboxOptionsItem, OptionsItem } from '~/types';

export default defineComponent({
  name: 'ZCheckbox',
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<any>,
      default: () => [],
      required: false,
    },
    modelValue: {
      type: Array as PropType<any>,
      default: () => [],
      required: false,
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['input', 'update:modelValue'],
  setup: (props, { emit, listeners = {} }) => {
    const { attrsAll, onAll } = useFormComponentAttrs(props);
    const { vModelVal, handleInput } = useVModel(props, emit);
    const attrs = useAttrs();

    const getChildComponentName = (option: CheckboxOptionsItem) => {
      if (!option.type) return 'el-checkbox';
      if (option.type === 'checkbox' || option.type === 'checkbox-button')
        return `el-${option.type}`;
      return 'el-checkbox';
    };

    return () => {
      return (
        <el-checkbox-group
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
        </el-checkbox-group>
      );
    };
  },
});
