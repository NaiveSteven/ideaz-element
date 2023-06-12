import { provide } from 'vue-demi'
import { useNamespace } from '@ideaz/hooks'
import { get } from 'lodash-unified'
import ZCheckCard from './CheckCard'
import { checkCardGroupProps } from './props'
import type { CheckCardProps, CheckCardValueType } from './props'

export default defineComponent({
  name: 'ZCheckCardGroup',
  components: { ZCheckCard },
  props: checkCardGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, expose, emit }) {
    const ns = useNamespace('check-card')

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
      return (props.options as CheckCardProps[])?.map(
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

    const toggleOption = (option: CheckCardProps) => {
      if (!props.multiple) {
        let changeValue

        changeValue = stateValue.value
        // 单选模式
        if (changeValue === option.value)
          changeValue = undefined

        else
          changeValue = option.value

        stateValue.value = changeValue
      }

      if (props.multiple) {
        let changeValue = []
        const stateValues = stateValue.value as CheckCardValueType[]
        const hasOption = stateValues.includes(option.value)
        changeValue = [...(stateValues || [])]
        if (!hasOption)
          changeValue.push(option.value)

        if (hasOption) {
          changeValue = changeValue.filter(
            itemValue => itemValue !== option.value,
          )
        }
        const newOptions = getOptions()
        const newValue = changeValue
          // ?.filter((val) => registerValueMap.current.has(val))
          ?.sort((a, b) => {
            const indexA = newOptions.findIndex((opt: { title: string; value: any } | CheckCardProps) => opt.value === a)
            const indexB = newOptions.findIndex((opt: { title: string; value: any } | CheckCardProps) => opt.value === b)
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
          .map((_, index) => <ZCheckCard key={index} loading />)
      }

      if (options && options.length > 0) {
        const optionValue = stateValue.value
        return (getOptions() as CheckCardProps[]).map(option => (
          <ZCheckCard
            key={option.value.toString()}
            disabled={get(option, props.alias?.disabled || 'disabled', false)}
            size={option.size ?? props.size}
            value={get(option, props.alias?.value || 'value', '')}
            checked={
              multiple
                ? (optionValue as CheckCardValueType[])?.includes(option.value)
                : (optionValue as CheckCardValueType) === option.value
            }
            title={get(option, props.alias?.title || 'title', '')}
            avatar={option.avatar}
            description={option.description}
            cover={option.cover}
          />
        ))
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
          size: props.size,
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
