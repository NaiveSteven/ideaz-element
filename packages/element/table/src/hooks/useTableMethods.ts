import type { ComponentInternalInstance, Ref } from 'vue'
import { getCurrentInstance } from 'vue'
import { isArray } from '@ideaz/utils'

interface ElTable {
  setCurrentRow?: (row: any) => void
  clearSelection?: () => void
  toggleRadioSelection?: (row: any) => void
  toggleRowSelection?: (...args: any) => void
  clearFilter?: (...args: any) => void
  toggleAllSelection?: () => void
  toggleRowExpansion?: (...args: any) => void
  clearSort?: () => void
  sort?: (...args: any) => void
  doLayout?: () => void
  scrollTo?: (position: { scrollLeft?: number; scrollTop?: number }) => void
  scrollToRow?: (index: number, strategy?: string) => void
}

interface VirtualTableMethods {
  clearSelection: () => void
  toggleRowSelection: (row: any, selected?: boolean) => void
  toggleAllSelection: () => void
  toggleRowExpansion: (row: any, expanded?: boolean) => void
}

interface UseTableMethodsOptions {
  isVirtualEnabled?: Ref<boolean>
  virtualTableRef?: Ref<any>
  virtualMethods?: VirtualTableMethods
}

export function useTableMethods(options?: UseTableMethodsOptions) {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const ctx = instance.proxy

  // 获取表格引用
  const getTableRef = (): ElTable | null => {
    if (options?.isVirtualEnabled?.value && options.virtualTableRef) {
      return options.virtualTableRef.value
    }
    return ctx?.$refs.zTableRef as ElTable || null
  }

  // 普通表格的选择清理方法（保持原有逻辑）
  const clearSelectionFromColumns = () => {
    if (ctx?.$refs.zTableColumn && isArray(ctx?.$refs.zTableColumn)) {
      ctx?.$refs.zTableColumn.forEach((column: any) => {
        column.clearSelection && column.clearSelection()
      })
    }
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.startsWith('zTableColumn')) {
        (ctx?.$refs[key] as ElTable).clearSelection
        && (ctx?.$refs[key] as ElTable).clearSelection?.()
      }
    })
    return (ctx?.$refs.zTableRef as ElTable).clearSelection?.()
  }

  // 清空选择
  const clearSelection = () => {
    if (options?.isVirtualEnabled?.value && options.virtualMethods) {
      return options.virtualMethods.clearSelection()
    } else {
      clearSelectionFromColumns()
      const tableRef = getTableRef()
      return tableRef?.clearSelection?.()
    }
  }

  // 切换行选择
  const toggleRowSelection = (row: any, selected?: boolean) => {
    if (options?.isVirtualEnabled?.value && options.virtualMethods) {
      return options.virtualMethods.toggleRowSelection(row, selected)
    } else {
      const tableRef = getTableRef()
      return tableRef?.toggleRowSelection?.(row, selected)
    }
  }

  // 切换全选
  const toggleAllSelection = () => {
    if (options?.isVirtualEnabled?.value && options.virtualMethods) {
      return options.virtualMethods.toggleAllSelection()
    } else {
      const tableRef = getTableRef()
      return tableRef?.toggleAllSelection?.()
    }
  }

  // 切换行展开
  const toggleRowExpansion = (row: any, expanded?: boolean) => {
    if (options?.isVirtualEnabled?.value && options.virtualMethods) {
      return options.virtualMethods.toggleRowExpansion(row, expanded)
    } else {
      const tableRef = getTableRef()
      return tableRef?.toggleRowExpansion?.(row, expanded)
    }
  }

  // 单选切换（保持原有逻辑，主要用于普通表格）
  const toggleRadioSelection = (row: any) => {
    if (ctx?.$refs.zTableColumn && isArray(ctx?.$refs.zTableColumn)) {
      ctx?.$refs.zTableColumn.forEach((column) => {
        column.toggleRadioSelection && column.toggleRadioSelection(row)
      })
    }
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.startsWith('zTableColumn')) {
        (ctx?.$refs[key] as ElTable).toggleRadioSelection
        && (ctx?.$refs[key] as ElTable).toggleRadioSelection?.(row)
      }
    })
    const tableRef = getTableRef()
    if (tableRef && (tableRef as ElTable).toggleRadioSelection) {
      (tableRef as ElTable).toggleRadioSelection?.(row)
    }
  }

  // 设置当前行
  const setCurrentRow = (row?: any) => {
    const tableRef = getTableRef()
    return tableRef?.setCurrentRow?.(row)
  }

  // 清空筛选
  const clearFilter = (columnKeys?: string[]) => {
    const tableRef = getTableRef()
    return tableRef?.clearFilter?.(columnKeys)
  }

  // 清空排序
  const clearSort = () => {
    const tableRef = getTableRef()
    return tableRef?.clearSort?.()
  }

  // 排序
  const sort = (prop: string, order?: string) => {
    const tableRef = getTableRef()
    return tableRef?.sort?.(prop, order)
  }

  // 重新布局
  const doLayout = () => {
    const tableRef = getTableRef()
    return tableRef?.doLayout?.()
  }

  // 虚拟滚动专用方法 - 滚动到指定位置
  const scrollTo = (position: { scrollLeft?: number; scrollTop?: number }) => {
    if (options?.isVirtualEnabled?.value) {
      const tableRef = getTableRef()
      return tableRef?.scrollTo?.(position)
    }
  }

  // 虚拟滚动专用方法 - 滚动到指定行
  const scrollToRow = (index: number, strategy: string = 'auto') => {
    if (options?.isVirtualEnabled?.value) {
      const tableRef = getTableRef()
      return tableRef?.scrollToRow?.(index, strategy)
    }
  }

  return {
    // 通用方法
    setCurrentRow,
    clearFilter,
    clearSort,
    sort,
    doLayout,

    // 选择相关方法（支持虚拟表格）
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,

    // 单选方法（主要用于普通表格）
    toggleRadioSelection,

    // 虚拟滚动专用方法
    scrollTo,
    scrollToRow,
  }
}
