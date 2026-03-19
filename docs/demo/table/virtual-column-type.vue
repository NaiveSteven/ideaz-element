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

// Generate mock data
function generateData(count: number): RowData[] {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
  const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing']
  const positions = ['Engineer', 'Product Manager', 'Designer', 'Operations Specialist', 'Marketing Specialist']
  const statuses = ['Active', 'Departed', 'Probation']
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
    label: 'Selection',
  },
  {
    type: 'index',
    label: 'Index',
    index: 1,
  },
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'email',
    label: 'Email',
  },
  {
    prop: 'department',
    label: 'Department',
  },
  {
    prop: 'position',
    label: 'Position',
  },
  {
    prop: 'salary',
    label: 'Salary',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`,
  },
  {
    prop: 'status',
    label: 'Status',
    render: ({ row }: any) => {
      const type = row.status === 'Active' ? 'success' : row.status === 'Probation' ? 'warning' : 'danger'
      return h('el-tag', { type, size: 'small' }, row.status)
    },
  },
])

// Virtual scrolling config
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

const selectedRows = ref<RowData[]>([])

function handleSelectionChange(selection: RowData[]) {
  selectedRows.value = selection
  console.log('Selection changed:', selection)
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>Virtual Table Column Type Demo</h3>
      <p style="margin: 8px 0; color: #666;">
        Demonstrates compatibility of various column types in a virtual table: selection columns, index columns, form components, and more.
      </p>
      <p style="margin: 8px 0; color: #666;">Selected: {{ selectedRows.length }} items</p>
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
