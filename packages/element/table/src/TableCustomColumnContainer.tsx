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
    attrs: {
      type: Object,
    },
    options: {
      type: Object,
    },
    on: {
      type: Object,
    },
    rowData: {
      type: Object,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { attrsAll, onAll } = useFormComponentAttrs(props)
    const size = useFormSize()

    return () => {
      return h(resolveComponent(props.componentName), {
        ...attrsAll.value,
        ...onAll.value,
        'size': size.value,
        'modelValue': props.modelValue,
        'onUpdate:modelValue': (val: any) => {
          emit('update:modelValue', val)
        },
      })
    }
  },
})
