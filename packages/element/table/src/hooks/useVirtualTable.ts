import { reactiveOmit } from '@vueuse/core'
import type { ITableProps, VirtualScrollConfig } from '../props'

export function useVirtualTable(props: ITableProps) {
  const attrs = useAttrs()

  // 虚拟滚动配置
  const virtualConfig = computed((): Required<VirtualScrollConfig> => {
    const defaultConfig: Required<VirtualScrollConfig> = {
      enabled: false,
      itemHeight: 48,
      estimatedRowHeight: 48,
      buffer: 5,
      threshold: 100,
      cache: 2,
      footerHeight: 0,
      // Element Plus TableV2 默认值
      headerClass: '',
      headerProps: {},
      headerCellProps: {},
      headerHeight: 50,
      rowClass: '',
      rowProps: {},
      rowEventHandlers: {},
      cellProps: {},
      dataGetter: undefined as any,
      fixedData: {},
      defaultExpandedRowKeys: [],
      fixed: false,
      indentSize: 12,
      hScrollbarSize: 6,
      vScrollbarSize: 6,
      sortBy: {},
      sortState: undefined as any,
    }

    if (!props.virtual) return defaultConfig
    if (props.virtual === true) {
      return {
        ...defaultConfig,
        enabled: true,
      }
    }
    return {
      ...defaultConfig,
      enabled: true,
      ...props.virtual,
    }
  })

  // 是否启用虚拟滚动
  const isVirtualEnabled = computed(() => {
    return virtualConfig.value.enabled &&
           props.data && props.data.length > virtualConfig.value.threshold
  })

        // 虚拟表格的属性，只包含虚拟表格需要的属性
  const virtualTableAttributes = computed(() => {
    // 处理虚拟表格专用属性
    const virtualSpecificAttrs = {
      cache: virtualConfig.value.cache,
      estimatedRowHeight: virtualConfig.value.estimatedRowHeight,
      headerClass: virtualConfig.value.headerClass,
      headerProps: virtualConfig.value.headerProps,
      headerCellProps: virtualConfig.value.headerCellProps,
      headerHeight: virtualConfig.value.headerHeight,
      footerHeight: virtualConfig.value.footerHeight,
      rowClass: virtualConfig.value.rowClass,
      rowProps: virtualConfig.value.rowProps,
      rowEventHandlers: virtualConfig.value.rowEventHandlers,
      cellProps: virtualConfig.value.cellProps,
      dataGetter: virtualConfig.value.dataGetter,
      fixedData: virtualConfig.value.fixedData,
      defaultExpandedRowKeys: virtualConfig.value.defaultExpandedRowKeys,
      fixed: virtualConfig.value.fixed,
      indentSize: virtualConfig.value.indentSize,
      hScrollbarSize: virtualConfig.value.hScrollbarSize,
      vScrollbarSize: virtualConfig.value.vScrollbarSize,
      scrollbarAlwaysOn: props.scrollbarAlwaysOn,
      sortBy: virtualConfig.value.sortBy,
      sortState: virtualConfig.value.sortState,
      rowHeight: virtualConfig.value.itemHeight, // itemHeight 映射到 rowHeight
      // 兼容的基础属性
      rowKey: props.rowKey,
      maxHeight: props.maxHeight,
      className: props.className,
      style: props.style,
    }

    // 过滤掉 undefined 值的属性
    const filteredVirtualAttrs = Object.fromEntries(
      Object.entries(virtualSpecificAttrs).filter(([_, value]) => value !== undefined)
    )

    return {
      ...attrs,
      ...filteredVirtualAttrs,
    }
  })

  return {
    virtualConfig,
    isVirtualEnabled,
    virtualTableAttributes,
  }
}
