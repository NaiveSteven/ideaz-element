<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, h, ref } from 'vue'

interface RowData {
  id: number
  name: string
  email: string
  department: string
  position: string
  salary: number
  status: string
}

// 生成测试数据
function generateData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const positions = ['工程师', '产品经理', '设计师', '运营专员', '市场专员']
  const statuses = ['在职', '离职', '试用期']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      salary: Math.floor(Math.random() * 50000) + 8000,
      status: statuses[i % statuses.length],
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(1000))

const columns = ref([
  {
    type: 'selection',
    label: '选择',
  },
  {
    type: 'index',
    label: '序号',
    index: 1,
  },
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'department',
    label: '部门',
  },
  {
    prop: 'position',
    label: '职位',
  },
  {
    prop: 'salary',
    label: '薪资',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`,
  },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }: any) => {
      const type = row.status === '在职' ? 'success' : row.status === '试用期' ? 'warning' : 'danger'
      return h('el-tag', { type, size: 'small' }, row.status)
    },
  },
])

// 虚拟滚动配置
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

const selectedRows = ref<RowData[]>([])

function handleSelectionChange(selection: RowData[]) {
  selectedRows.value = selection
  console.log('选择变化:', selection)
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>虚拟表格列类型演示</h3>
      <p style="margin: 8px 0; color: #666;">
        测试各种列类型在虚拟表格中的兼容性：选择列、索引列、表单组件等。
      </p>
      <p style="margin: 8px 0; color: #666;">已选择: {{ selectedRows.length }} 项</p>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      height="500px"
      border
      stripe
      @selection-change="handleSelectionChange"
    />
  </div>
</template>
