import { extractEvents, isFunction, isObject, isString } from '@ideaz/utils'
import { resolveDynamicComponent } from '@ideaz/shared'
import { vueRef as ref } from '@ideaz/directives'
import {
  useFormItemComponent,
  useFormItemProps,
  useFormItemSlots,
} from '../hooks'
import { formItemProps, formItemProvideKey } from './props'

export default defineComponent({
  name: 'ZFormItem',
  directives: { ref },
  props: formItemProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('form-item')
    const { componentName: ComponentName } = useFormItemComponent(props)
    const { formItemProps } = useFormItemProps(props)
    const { vSlots } = useFormItemSlots(props, slots)

    provide(formItemProvideKey, {
      props,
    })

    const modify = (val: any) => {
      const { col } = props
      if (col.modifier) {
        if (isFunction(col.modifier))
          emit('update:modelValue', col.modifier(val), col.field)

        if (col.modifier === 'trim')
          emit('update:modelValue', isString(val) ? val.trim() : val, col.field)
      }
      else {
        emit('update:modelValue', val, col.field)
      }
    }

    return () => {
      const { col, options } = props

      return (
        <el-form-item
          ref="formItem"
          prop={col.field}
          class={ns.b()}
          {...formItemProps.value}
          v-slots={vSlots.value}
        >
          {(isFunction(col.render) || col.slot)
            ? slots.default?.()
            : h(resolveDynamicComponent({
              name: ComponentName.value,
              attrs: {
                'modelValue': isFunction(col.fieldProps && col.fieldProps.format)
                  ? col.fieldProps?.format(props.modelValue[col.field!])
                  : props.modelValue[col.field!],
                'prop': col.field,
                'options': options
                  ? (options[col.field!] || (col.fieldProps && col.fieldProps.options))
                  : {},
                ...col.fieldProps,
                'directives': {
                  ref: isObject(col.fieldProps)
                    ? (col.fieldProps.ref || (() => { }))
                    : () => { },
                },
                'onUpdate:modelValue': (val: any) => modify(val),
                ...extractEvents(col),
              },
            }))}
          {formItemProps.value.extra && (
            <div class={ns.e('extra')}>
              {isFunction(formItemProps.value.extra)
                ? formItemProps.value.extra()
                : formItemProps.value.extra}
            </div>
          )}
        </el-form-item>
      )
    }
  },
})
