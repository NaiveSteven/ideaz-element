export default defineComponent({
  name: 'ZTableCustomColumnContainer',
  props: {
    modelValue: {
      type: [String, Number, Array] as PropType<any>,
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
  setup(props) {
    const { attrsAll, onAll } = useFormComponentAttrs(props)

    return () => {
      return h(resolveComponent(props.componentName), {
        ...attrsAll.value,
        on: onAll,
      })
    }
  },
})
