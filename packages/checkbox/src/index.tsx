import { resolveDynamicComponent, setFormAlias } from '@ideaz/shared';
import type { CheckboxOptionsItem, OptionsItem } from '~/types';

export default defineComponent({
  name: 'ZCheckbox',
  inheritAttrs: false,
  props: {
    value: {
      type: Array as PropType<any>,
      default: () => [],
    },
    modelValue: {
      type: Array as PropType<any>,
      default: () => [],
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
    const { getLabelKey, getValueKey, getDisabledKey } = setFormAlias(props);
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
                label: option[getValueKey()],
                disabled: option[getDisabledKey()],
                key: index,
              },
              content: option[getLabelKey()],
            });
          })}
        </el-checkbox-group>
      );
    };
  },
});
