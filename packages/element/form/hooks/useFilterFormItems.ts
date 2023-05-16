import { useWindowReactiveSize } from '@ideaz/hooks'
import type { FormColumn } from '~/types'

export const useFilterFormItem = (props: Record<any, any>) => {
  const toggleButtonType = ref(props.collapsed ? 'up' : 'expand')

  const { windowReactiveSize } = useWindowReactiveSize()

  const virtualColumns = computed(() => {
    return props.columns.map((cur: FormColumn, index: number) => ({
      ...cur,
      hideUseVShow: () => judgeIsHideFormItem(index),
    }))
  })

  const btnLayout = computed(() => {
    const arrLength = virtualColumns.value.length + 1
    return {
      class:
        toggleButtonType.value === 'expand'
          ? 'c-button-col__container c-table-pro-btn__col'
          : 'c-table-pro-btn__col',
      xs: {
        span: 24,
        offset: computedOffset(24, arrLength),
      },
      sm: {
        span: 12,
        offset: computedOffset(12, arrLength),
      },
      md: {
        span: 8,
        offset: computedOffset(8, arrLength),
      },
      lg: {
        span: 8,
        offset: computedOffset(8, arrLength),
      },
      xl: {
        span: 6,
        offset: computedOffset(6, arrLength),
      },
    }
  })

  const columns = computed(() => {
    return virtualColumns.value.concat([
      {
        slot: 'button',
        colGrid: btnLayout.value,
      },
    ])
  })

  const isShowToggleButton = computed(() => {
    if (windowReactiveSize.value === 'xl')
      return virtualColumns.value.length + 1 > 4

    if (windowReactiveSize.value === 'md' || windowReactiveSize.value === 'lg')
      return virtualColumns.value.length + 1 > 3

    if (
      windowReactiveSize.value === 'sm'
      || windowReactiveSize.value === 'xs'
    )
      return virtualColumns.value.length + 1 > 2

    return true
  })

  function computedOffset(span: number, length: number) {
    if (toggleButtonType.value === 'expand') {
      if (
        length === 3
        && (windowReactiveSize.value === 'xl')
      )
        return 6
      if (length === 2 && windowReactiveSize.value === 'lg')
        return 8

      return 0
    }
    // 一行几个
    const num = 24 / span
    // 余数
    const remainder = length % num
    if (remainder === 0)
      return 0

    else
      return (num - remainder) * span
  }

  function judgeIsHideFormItem(index: number) {
    if (windowReactiveSize.value === 'xl')
      return index > 2 && toggleButtonType.value === 'expand'

    if (windowReactiveSize.value === 'lg' || windowReactiveSize.value === 'md')
      return index > 1 && toggleButtonType.value === 'expand'

    if (
      windowReactiveSize.value === 'sm'
      || windowReactiveSize.value === 'xs'
    )
      return index > 0 && toggleButtonType.value === 'expand'

    return false
  }

  const layout = computed(() => {
    return {
      colLayout: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6,
      },
    }
  })

  return { isShowToggleButton, columns, toggleButtonType, layout }
}
