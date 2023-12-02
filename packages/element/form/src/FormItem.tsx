import { extractEvents, isFunction, isObject, isString } from '@ideaz/utils'
import { getContentByRenderAndSlot, resolveDynamicComponent } from '@ideaz/shared'
import { get } from 'lodash-unified'
import { vueRef as ref } from '@ideaz/directives'
import { ElFormItem } from 'element-plus'
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
    const size = useFormSize()

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
        <ElFormItem
          ref="formItem"
          prop={col.field}
          class={ns.b()}
          {...{ size: size.value, ...formItemProps.value }}
          v-slots={vSlots.value}
        >
          {(isFunction(col.render) || col.slot)
            ? slots.default?.()
            : h(resolveDynamicComponent({
              name: ComponentName.value,
              attrs: {
                'modelValue': isFunction(col.fieldProps && col.fieldProps.format)
                  ? col.fieldProps?.format(get(props.modelValue, col.field!))
                  : get(props.modelValue, col.field!),
                'prop': col.field,
                'options': options
                  ? (options[col.field!] || (col.fieldProps && col.fieldProps.options))
                  : {},
                'size': size.value,
                'class': col.class,
                'style': col.style,
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
              {getContentByRenderAndSlot(formItemProps.value.extra, slots)}
            </div>
          )}
        </ElFormItem>
      )
    }
  },
})
