import type { ITableProps } from '../props'
import {
  componentLevelProps,
  tableProps,
  virtualTableProps
} from '../props'

export function useVirtualTable(props: ITableProps) {
  const attrs = useAttrs()

  // 虚拟滚动配置
  const virtualConfig = computed(() => {
    if (!props.virtual) return { enabled: false }
    if (props.virtual === true) {
      return { enabled: true }
    }
    return {
      enabled: true,
      ...props.virtual,
    }
  })

  // 是否启用虚拟滚动
  const isVirtualEnabled = computed(() => {
    return virtualConfig.value.enabled &&
           props.data && props.data.length > (virtualConfig.value.threshold || 100)
  })

  // 虚拟表格属性
  const virtualTableAttributes = computed(() => {
    if (!isVirtualEnabled.value) return {}

    // 从props对象动态获取字段
    const tablePropsKeys = new Set(Object.keys(tableProps))
    const virtualConfigKeys = new Set(Object.keys(virtualTableProps))
    const componentLevelKeys = new Set(Object.keys(componentLevelProps))

    // 计算需要排除的属性
    const excludedProps = new Set([
      ...Array.from(tablePropsKeys).filter(key =>
        !virtualConfigKeys.has(key)
      ),
      ...componentLevelKeys
    ])

    // 过滤props，保留虚拟表格可用的属性
    const baseAttributes = Object.fromEntries(
      Object.entries(props).filter(([key]) => !excludedProps.has(key))
    )

    // 从虚拟配置中提取TableV2属性
    const config = virtualConfig.value
    const virtualConfigAttrs: Record<string, any> = {}

    // 遍历所有virtualTableProps属性
    for (const key of Object.keys(virtualTableProps)) {
      if (key in config) {
        if (key === 'itemHeight') {
          // 特殊映射：itemHeight -> rowHeight
          virtualConfigAttrs.rowHeight = config[key as keyof typeof config]
        } else {
          virtualConfigAttrs[key] = config[key as keyof typeof config]
        }
      }
    }

    return {
      ...attrs,
      ...baseAttributes,
      ...virtualConfigAttrs,
    }
  })

  return {
    virtualConfig,
    isVirtualEnabled,
    virtualTableAttributes,
  }
}
