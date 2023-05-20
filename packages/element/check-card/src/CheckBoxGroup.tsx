import type { ExtractPropTypes, PropType } from 'vue-demi'
import { provide } from 'vue-demi'
import ZCheckCard from './index.tsx'

export type CheckCardValueType = string | number | boolean

export type CheckGroupValueType =
  | CheckCardValueType[]
  | CheckCardValueType
  | undefined

const groupProps = {
  title: {
    type: String,
  },
  value: {
    type: Object as PropType<CheckCardValueType>,
  },
  description: {
    type: String,
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
  },
  avatar: {
    type: String,
  },
  cover: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
}

export interface AbstractCheckCardGroupProps {
  /** 指定可选项 */
  options?: (ExtractPropTypes<typeof groupProps> | string)[]
  /** 整组失效 */
  disabled?: boolean
  /**
   * 组件尺寸，支持大，中，小三种默认尺寸，用户可以自定义宽高
   *
   * @default default
   */
  size?: 'large' | 'default' | 'small'
}

const checkCardGroupProps = {
  /** 指定可选项 */
  options: {
    type: Object as PropType<(ExtractPropTypes<typeof groupProps> | string)[]>,
  },
  disabled: {
    type: Boolean,
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
  },
  multiple: {
    type: Boolean,
  },
  defaultValue: {
    type: Object as PropType<CheckGroupValueType>,
  },
  value: {
    type: Object as PropType<CheckGroupValueType>,
  },
  loading: {
    type: Boolean,
  },
  bordered: {
    type: Boolean,
  },
}

export interface CheckCardGroupState {
  value: CheckGroupValueType
  registeredValues: CheckCardValueType[]
}

export interface CheckCardGroupConnextType {
  toggleOption?: (option: ExtractPropTypes<typeof groupProps>) => void
  value?: any
  disabled?: boolean
  size?: any
  loading?: any
  bordered?: any
  multiple?: any
  registerValue?: (value: any) => void
  cancelValue?: (value: any) => void
}

export default defineComponent({
  name: 'ZCheckCardGroup',
  components: { ZCheckCard },
  props: checkCardGroupProps,
  emits: ['change'],
  setup(props, { slots, expose, emit }) {
    const prefixCls = 'z-pro-checkcard'
    const groupPrefixCls = `${prefixCls}-group`

    const stateValue = ref(props.defaultValue)

    const {
      options = [],
      loading = false,
      multiple = false,
      bordered = true,
      ...restProps
    } = props

    const getOptions = () => {
      return (options as ExtractPropTypes<typeof groupProps>[])?.map(
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

    const toggleOption = (option: ExtractPropTypes<typeof groupProps>) => {
      if (!multiple) {
        let changeValue

        changeValue = stateValue.value
        // 单选模式
        if (changeValue === option.value)
          changeValue = undefined

        else
          changeValue = option.value

        stateValue.value = changeValue
        console.log(stateValue.value, 'stateValue.value')
      }

      if (multiple) {
        let changeValue = []
        const stateValues = stateValue.value as any
        const hasOption = stateValues?.includes(option.value)
        changeValue = [...(stateValues || [])]
        if (!hasOption)
          changeValue.push(option.value)

        if (hasOption) {
          changeValue = changeValue.filter(
            itemValue => itemValue !== option.value,
          )
        }
        const newOptions = getOptions() as any
        const newValue = changeValue
          // ?.filter((val) => registerValueMap.current.has(val))
          ?.sort((a, b) => {
            const indexA = newOptions.findIndex((opt: any) => opt.value === a)
            const indexB = newOptions.findIndex((opt: any) => opt.value === b)
            return indexA - indexB
          })

        stateValue.value = newValue
      }
    }

    const children = () => {
      if (loading) {
        return new Array(options.length || slots.default?.()?.length || 1)
          .fill(0)
          .map((_, index) => <ZCheckCard key={index} loading />)
      }

      if (options && options.length > 0) {
        const optionValue = stateValue.value as
          | ExtractPropTypes<typeof groupProps>[]
          | CheckCardValueType
        return getOptions().map((option: any) => (
          <ZCheckCard
            key={option.value.toString()}
            disabled={option.disabled}
            size={option.size ?? props.size}
            value={option.value}
            checked={
              multiple
                ? (optionValue as any[])?.includes(option.value)
                : (optionValue as CheckCardValueType) === option.value
            }
            onChange={() => emit('change', stateValue.value)}
            title={option.title}
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
          bordered,
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
      return <div class={groupPrefixCls}>{children()}</div>
    }
  },
})
