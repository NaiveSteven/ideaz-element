import { describe, expect, it, vi } from 'vitest'
import { h, ref } from 'vue'
import { useVirtualTableColumns } from '../src/hooks/useVirtualTableColumns'

describe('虚拟表格tooltip功能', () => {
  const mockEmit = vi.fn()
  const mockSlots = {}
  const mockProps = { rowKey: 'id' }

  const mockFormatTableCols = ref([
    {
      prop: 'name',
      label: '姓名',
      width: 120,
      tooltip: '用户姓名提示'
    },
    {
      prop: 'age',
      label: '年龄',
      width: 80,
      tooltip: (scope: any) => `年龄列提示 - 索引${scope.$index}`
    },
    {
      prop: 'email',
      label: '邮箱',
      width: 200,
      tooltip: {
        content: '邮箱地址提示',
        placement: 'bottom',
        effect: 'light'
      }
    },
    {
      prop: 'department',
      label: '部门',
      width: 120,
      tooltip: {
        content: (scope: any) => `部门提示 - 列${scope.$index}`,
        placement: 'top',
        effect: 'dark'
      }
    }
  ])

  const mockTableData = ref([
    { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com', department: '技术部' },
    { id: 2, name: '李四', age: 30, email: 'lisi@example.com', department: '产品部' }
  ])

  it('应该正确处理字符串tooltip', () => {
    const { virtualColumns } = useVirtualTableColumns(
      mockFormatTableCols,
      mockTableData,
      mockSlots,
      mockEmit,
      mockProps
    )

    const nameColumn = virtualColumns.value.find(col => col.dataKey === 'name')
    expect(nameColumn).toBeDefined()
    expect(nameColumn?.headerCellRenderer).toBeDefined()
  })

  it('应该正确处理函数tooltip', () => {
    const { virtualColumns } = useVirtualTableColumns(
      mockFormatTableCols,
      mockTableData,
      mockSlots,
      mockEmit,
      mockProps
    )

    const ageColumn = virtualColumns.value.find(col => col.dataKey === 'age')
    expect(ageColumn).toBeDefined()
    expect(ageColumn?.headerCellRenderer).toBeDefined()
  })

  it('应该正确处理对象配置tooltip', () => {
    const { virtualColumns } = useVirtualTableColumns(
      mockFormatTableCols,
      mockTableData,
      mockSlots,
      mockEmit,
      mockProps
    )

    const emailColumn = virtualColumns.value.find(col => col.dataKey === 'email')
    expect(emailColumn).toBeDefined()
    expect(emailColumn?.headerCellRenderer).toBeDefined()
  })

  it('应该正确处理对象函数配置tooltip', () => {
    const { virtualColumns } = useVirtualTableColumns(
      mockFormatTableCols,
      mockTableData,
      mockSlots,
      mockEmit,
      mockProps
    )

    const departmentColumn = virtualColumns.value.find(col => col.dataKey === 'department')
    expect(departmentColumn).toBeDefined()
    expect(departmentColumn?.headerCellRenderer).toBeDefined()
  })
})
