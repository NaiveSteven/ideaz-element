import { setFormAlias } from '@ideaz/shared';
import type { OptionsItem } from '~/types';

export default defineComponent({
  name: 'ZSelect',
  props: {
    options: {
      type: Array as PropType<OptionsItem[]>,
      default: () => [],
    },
  },
  emits: ['input'],
  setup(props, { emit }) {
    const { bindVal, attrsAll, onAll } = useFormComponentAttrs(props, emit);
    const { getLabelKey, getValueKey, getDisabledKey } = setFormAlias(props);

    return () => (
      <el-select
        value={bindVal.value}
        {...{ props: attrsAll.value }}
        {...{ on: onAll.value }}
        onInput={(val: string | number) => (bindVal.value = val)}
      >
        {props.options.map((option, index) => {
          return (
            <el-option
              key={index}
              {...{ props: option }}
              label={option[getValueKey()]}
              disabled={option[getDisabledKey()]}
            >
              {option[getLabelKey()]}
            </el-option>
          );
        })}
      </el-select>
    );
  },
});
