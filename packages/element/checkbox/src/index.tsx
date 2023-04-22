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
    const { t } = useLocale();
    const size = useFormSize();
    const attrs = useAttrs();

    const getChildComponentName = (option: CheckboxOptionsItem) => {
      if (!option.type) return 'el-checkbox';
      if (option.type === 'checkbox' || option.type === 'checkbox-button')
        return `el-${option.type}`;
      return 'el-checkbox';
    };

    return () => {
      console.log(size.value, 'size');
      return (
        <div>
          <el-button size={size.value}>{size.value}</el-button>
          <el-checkbox-group
            value={vModelVal.value}
            modelValue={vModelVal.value}
            {...{ props: attrsAll.value }}
            {...{ on: { ...onAll.value, ...listeners } }}
            {...attrs}
            size={size.value}
            onInput={handleInput}
            onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
          >
            {props.options
              .concat({ label: t('el.form.reset'), value: '3' })
              .map((option, index) => {
                const ChildName = getChildComponentName(option);
                return resolveDynamicComponent({
                  name: ChildName,
                  attrs: {
                    ...option,
                    label: option[setFormAlias(props).keys.value],
                    disabled: option[setFormAlias(props).keys.disabled],
                    key: index,
                  },
                  content: () => option[setFormAlias(props).keys.label],
                });
              })}
          </el-checkbox-group>
          <div>
            <el-button size="small">small</el-button>
            <el-button size="default">default</el-button>
            <el-button size="large">large</el-button>
          </div>
        </div>
      );
    };
  },
});
