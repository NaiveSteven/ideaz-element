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
  emits: ['change'],
  setup(props, { slots }) {
    const ns = useNamespace('form-item')
    const { componentName: ComponentName } = useFormItemComponent(props)
    const { formItemProps } = useFormItemProps(props)
    const { vSlots } = useFormItemSlots(props, slots)

    provide(formItemProvideKey, {
      props,
    })

    const modify = (val: any) => {
      const { col, formModel } = props
      if (col.modifier) {
        if (isFunction(col.modifier))
          formModel[col.field!] = col.modifier(val)

        if (col.modifier === 'trim')
          formModel[col.field!] = isString(val) ? val.trim() : val
      }
      else {
        formModel[col.field!] = val
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
                  ? col.fieldProps?.format(props.formModel[col.field!])
                  : props.formModel[col.field!],
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
