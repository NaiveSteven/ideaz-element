import { getCurrentInstance } from 'vue-demi'
import type { ComponentInternalInstance } from 'vue-demi'
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
}

export const useTableMethods = () => {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const ctx = instance.proxy

  const clearSelection = () => {
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
    if (ctx?.$refs.zTableRef && (ctx?.$refs.zTableRef as ElTable).toggleRadioSelection)
      (ctx?.$refs.zTableRef as ElTable).toggleRadioSelection?.(row)
  }

  const setCurrentRow = (row: any) => {
    return (ctx?.$refs.zTableRef as ElTable).setCurrentRow?.(row)
  }

  const toggleRowSelection = (...args: any) => {
    return (ctx?.$refs.zTableRef as ElTable).toggleRowSelection?.(...args)
  }

  const clearFilter = (...args: any) => {
    return (ctx?.$refs.zTableRef as ElTable).clearFilter?.(...args)
  }

  const toggleAllSelection = () => {
    return (ctx?.$refs.zTableRef as ElTable).toggleAllSelection?.()
  }

  const toggleRowExpansion = (...args: any) => {
    return (ctx?.$refs.zTableRef as ElTable).toggleRowExpansion?.(...args)
  }

  const clearSort = () => {
    return (ctx?.$refs.zTableRef as ElTable).clearSort?.()
  }

  const sort = (...args: any) => {
    return (ctx?.$refs.zTableRef as ElTable).sort?.(...args)
  }

  const doLayout = () => {
    return (ctx?.$refs.zTableRef as ElTable).doLayout?.()
  }

  return {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    toggleRadioSelection,
    sort,
    doLayout,
  }
}
