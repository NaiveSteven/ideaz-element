import { provide } from 'vue-demi'
import { useNamespace } from '@ideaz/hooks'
import { get } from 'lodash-unified'
import { isValid } from '@ideaz/utils'
import ZCheckCardItem from './CheckCardItem'
import { checkCardGroupProps } from './props'
import type { CheckCardItemProps, CheckCardValueType } from './props'

export default defineComponent({
  name: 'ZCheckCard',
  components: { ZCheckCardItem },
  props: checkCardGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, expose, emit }) {
    const ns = useNamespace('check-card')
    const size = useFormSize()

    const stateValue = computed({
      get() {
        return props.modelValue || props.value
      },
      set(val) {
        emit('update:modelValue', val)
        emit('change', val)
      },
    })

    const getOptions = () => {
      return (props.options as CheckCardItemProps[])?.map(
        (option) => {
          if (typeof option === 'string') {
            return {
              title: option,
              value: option,
            }
          }
          return option
        },
      )
    }

    const toggleOption = (option: CheckCardItemProps) => {
      if (!props.multiple) {
        let changeValue

        changeValue = stateValue.value

        if (changeValue === option.value)
          changeValue = undefined

        else
          changeValue = option.value

        stateValue.value = changeValue
      }

      if (props.multiple) {
        let changeValue = []
        const stateValues = stateValue.value as CheckCardValueType[]
        const hasOption = stateValues.includes(option.value!)
        changeValue = [...(stateValues || [])]
        if (!hasOption)
          changeValue.push(option.value!)

        if (hasOption) {
          changeValue = changeValue.filter(
            itemValue => itemValue !== option.value,
          )
        }
        const newOptions = getOptions()
        const newValue = changeValue
          // ?.filter((val) => registerValueMap.current.has(val))
          ?.sort((a, b) => {
            const indexA = newOptions.findIndex((opt: { title: string; value: any } | CheckCardItemProps) => opt.value === a || get(opt, props.alias?.value || 'value', '') === a)
            const indexB = newOptions.findIndex((opt: { title: string; value: any } | CheckCardItemProps) => opt.value === b || get(opt, props.alias?.value || 'value', '') === b)
            return indexA - indexB
          })

        stateValue.value = newValue
      }
    }

    const children = () => {
      const { loading, multiple, options } = props
      if (loading) {
        return new Array(options?.length || slots.default?.()?.length || 1)
          .fill(0)
          .map((_, index) => <ZCheckCardItem key={index} loading />)
      }

      if (options && options.length > 0) {
        const optionValue = stateValue.value
        return (getOptions() as CheckCardItemProps[]).map((option) => {
          const value = get(option, props.alias?.value || 'value', '')
          return <ZCheckCardItem
            key={value.toString()}
            {...option}
            disabled={get(option, props.alias?.disabled || 'disabled', false)}
            size={option.size || size.value}
            value={value}
            bordered={isValid(option.bordered) ? option.bordered : props.bordered}
            checked={
              multiple
                ? (optionValue as CheckCardValueType[])?.includes(value)
                : (optionValue as CheckCardValueType) === value
            }
            title={get(option, props.alias?.title || 'title', '')}
          />
        })
      }

      return slots.default?.()
    }

    provide(
      'check-card-group',
      computed(() => {
        return {
          toggleOption,
          bordered: props.bordered,
          value: stateValue.value,
          disabled: props.disabled,
          size: size.value,
          loading: props.loading,
          multiple: props.multiple,
        }
      }),
    )

    expose({
      toggleOption,
    })

    return () => {
      return <div class={ns.b('group')}>{children()}</div>
    }
  },
})
