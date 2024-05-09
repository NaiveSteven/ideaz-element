import { getDynamicAttributes } from '@ideaz/shared'

export default defineComponent({
  name: 'ZTableCustomColumnContainer',
  props: {
    modelValue: {
      type: [String, Number, Array, Boolean] as PropType<any>,
    },
    prop: {
      type: String,
    },
    componentName: {
      type: String,
      default: 'unknown',
    },
    options: {
      type: Object,
    },
    evts: {
      type: Object,
    },
    scope: {
      type: Object,
    },
    size: {
      type: String,
    },
    fieldProps: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { attrsAll, onAll } = useFormComponentAttrs(props)
    const size = useFormSize()
    const dynamicAttributes = getDynamicAttributes(props.fieldProps, props.scope)

    return () => {
      return h(resolveComponent(props.componentName), {
        ...attrsAll.value,
        ...onAll.value,
        ...props.fieldProps,
        ...dynamicAttributes,
        'size': size.value,
        'modelValue': props.modelValue,
        'onUpdate:modelValue': (val: any) => {
          emit('update:modelValue', val)
        },
      })
    }
  },
})
