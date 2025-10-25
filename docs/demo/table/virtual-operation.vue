<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, h, ref, resolveComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface RowData {
  id: number
  name: string
  email: string
  department: string
  salary: number
  status: string
}

// Generate mock data
function generateData(count: number): RowData[] {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
  const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing']
  const statuses = ['Active', 'Departed', 'Probation']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      salary: Math.floor(Math.random() * 50000) + 8000,
      status: statuses[i % statuses.length],
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(1000))

const columns = ref([
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
    prop: 'salary',
    label: 'Salary',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`,
  },
  {
    prop: 'status',
    label: 'Status',
  },
  {
    prop: 'operation',
    label: 'Actions',
    render: (scope: any) => [
      h(resolveComponent('el-button'), {
        type: 'primary',
        onClick: () => handleEdit(scope.row)
      }, () => 'Edit'),
      h(resolveComponent('el-button'), {
        type: 'danger',
        onClick: () => handleDelete(scope.row)
      }, () => 'Delete')
    ],
  },
])

// Virtual scrolling config
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

function handleEdit(row: RowData) {
  console.log('Edit action:', row)
  ElMessage.success(`Editing: ${row.name}`)
}

function handleDelete(row: RowData) {
  console.log('Delete action:', row)
  ElMessageBox.confirm(`Delete ${row.name}?`, 'Confirm delete', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(() => {
    const index = tableData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      tableData.value.splice(index, 1)
      ElMessage.success('Deleted successfully')
    }
  }).catch(() => {
    ElMessage.info('Deletion cancelled')
  })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>Virtual table actions demo</h3>
      <p style="margin: 8px 0; color: #666;">
        Demonstrates action buttons inside a virtual table, including click handlers and styling.
      </p>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      height="500px"
      border
      stripe
    />
  </div>
</template>
