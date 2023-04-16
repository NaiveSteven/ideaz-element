import { setFormAlias } from '@ideaz/shared';
import type { OptionsItem, RadioOptionsItem } from '~/types';

export default defineComponent({
  name: 'ZRadio',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { bindVal, attrsAll, onAll } = useFormComponentAttrs(props, emit);
    const { getLabelKey, getValueKey, getDisabledKey } = setFormAlias(props);

    const getChildComponentName = (option: RadioOptionsItem) => {
      if (!option.type) return 'el-radio';
      if (option.type === 'radio' || option.type === 'radio-button')
        return `el-${option.type}`;
      return 'el-radio';
    };

    return () => {
      return (
        <el-radio-group
          value={bindVal.value}
          {...{ props: attrsAll.value }}
          {...{ on: onAll.value }}
          onInput={(val: any) => (bindVal.value = val)}
        >
          {props.options.map((option: OptionsItem, index) => {
            const ChildName = getChildComponentName(option);
            return (
              <ChildName
                key={index}
                {...option}
                label={option[getValueKey()]}
                disabled={option[getDisabledKey()]}
              >
                {option[getLabelKey()]}
              </ChildName>
            );
          })}
        </el-radio-group>
      );
    };
  },
});
