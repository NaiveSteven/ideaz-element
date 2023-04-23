import { isFunction, isObject, isString } from '@ideaz/utils';
import { vueRef as ref } from '@ideaz/directives';
import {
  useFormItemComponent,
  useFormItemProps,
  useFormItemSlots,
} from '../hooks';

export default defineComponent({
  name: 'ZFormItem',
  directives: { ref },
  props: {
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    formModel: {
      type: Object,
      default: () => { },
    },
    options: {
      type: Object,
      default: () => { },
    },
    col: {
      type: Object,
      default: () => { },
    },
  },
  emits: ['change'],
  setup(props, { slots }) {
    const { componentName: ComponentName } = useFormItemComponent(props);
    const { formItemProps } = useFormItemProps(props);
    const { vSlots } = useFormItemSlots(props, slots);

    const modify = (val: any) => {
      const { col, formModel } = props;
      if (col.modifier) {
        if (isFunction(col.modifier)) {
          formModel[col.prop!] = col.modifier(val);
        }
        if (col.modifier === 'trim') {
          formModel[col.prop!] = isString(val) ? val.trim() : val;
        }
      } else {
        formModel[col.prop!] = val;
      }
    };

    return () => {
      const { col, options } = props;

      return (
        <el-form-item
          ref="formItem"
          prop={col.prop}
          class="c-form-item"
          {...formItemProps.value}
          v-slots={vSlots.value}
        >
          {col.type === 'txt' ? null : (
            <>
              {h(resolveComponent(ComponentName.value), {
                modelValue: isFunction(col.attrs && col.attrs.format)
                  ? col.attrs.format(props.formModel[col.prop])
                  : props.formModel[col.prop],
                prop: col.prop,
                options: options
                  ? options[col.prop] || (col.attrs && col.attrs.options)
                  : {},
                ...col.attrs,
                directives: {
                  ref: isObject(col.attrs)
                    ? col.attrs.ref || (() => { })
                    : () => { },
                },
                'onUpdate:modelValue': (val: any) => modify(val),
              })}
            </>
          )}
          {formItemProps.value.extra && (
            <div class="c-form-item__extra">
              {isFunction(formItemProps.value.extra)
                ? formItemProps.value.extra(h)
                : formItemProps.value.extra}
            </div>
          )}
        </el-form-item>
      );
    };
  },
});
