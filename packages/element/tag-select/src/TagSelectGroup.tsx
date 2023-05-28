import TagSelect from './index'

export default defineComponent({
  name: 'ZTagSelectGroup',
  components: { TagSelect },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: String,
      default: 'auto',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateModelValue = (val: any, option: any) => {
      emit('update:modelValue', { ...props.modelValue, [option.field]: val })
    }

    return () => {
      return <div>
        {props.options.map((option: any) => {
          return <TagSelect
            modelValue={props.modelValue[option.field]}
            onUpdate:modelValue={val => updateModelValue(val, option)}
            size={props.size}
            labelWidth={props.labelWidth}
            multiple={props.multiple}
            {...option}
          />
        })}
      </div>
    }
  },
})
