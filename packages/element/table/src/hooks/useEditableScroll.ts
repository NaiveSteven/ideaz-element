import type { Ref } from 'vue'

interface UseEditableScrollOptions {
  isVirtualEnabled: Ref<boolean>
  virtualTableRef: Ref<any>
  tableData: Ref<any[]>
}

/**
 * 虚拟表格编辑模式滚动hook
 * 提供增强的addTableData方法，支持自动滚动到新增行
 */
export function useEditableScroll(
  originalAddTableData: () => void,
  options: UseEditableScrollOptions
) {
  const { isVirtualEnabled, virtualTableRef, tableData } = options

  /**
   * 增强的addTableData方法
   * 在原有基础上添加自动滚动功能
   */
  const enhancedAddTableData = () => {
    // 执行原有的添加逻辑
    originalAddTableData()

    // 虚拟表格模式下自动滚动到最后一行
    if (isVirtualEnabled.value && virtualTableRef.value) {
      nextTick(() => {
        const lastIndex = tableData.value.length - 1
        virtualTableRef.value?.scrollToRow?.(lastIndex, 'end')
      })
    }
  }

  return {
    enhancedAddTableData,
  }
}
