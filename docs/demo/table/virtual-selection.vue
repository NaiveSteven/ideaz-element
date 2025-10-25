<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, ref } from 'vue'

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

const tableData = ref<RowData[]>(generateData(2000))
const selectedRows = ref<RowData[]>([])

const columns = ref([
  {
    type: 'selection',
    label: 'Selection',
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
  },
])

// Virtual scrolling config
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

const tableRef = ref()

function handleSelectionChange(selection: RowData[]) {
  console.log('Selection changed:', selection)
  selectedRows.value = selection
}

function selectAll() {
  tableRef.value?.toggleAllSelection()
}

function clearSelection() {
  tableRef.value?.clearSelection()
  selectedRows.value = []
}

function selectFirst10() {
  clearSelection()
  for (let i = 0; i < Math.min(10, tableData.value.length); i++) {
    tableRef.value?.toggleRowSelection(tableData.value[i], true)
  }
}

function selectHighSalary() {
  clearSelection()
  const highSalaryRows = tableData.value.filter(row => row.salary > 30000)
  highSalaryRows.forEach(row => {
    tableRef.value?.toggleRowSelection(row, true)
  })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>Virtual table selection demo</h3>
      <p style="margin: 8px 0; color: #666;">
        The virtual table fully supports multi-select operations including select-all, clearing, and custom actions.
      </p>

      <el-space wrap>
        <el-button @click="selectAll" type="primary">
          Select all
        </el-button>
        <el-button @click="clearSelection" type="warning">
          Clear selection
        </el-button>
        <el-button @click="selectFirst10" type="success">
          Select first 10
        </el-button>
        <el-button @click="selectHighSalary" type="info">
          Select salary > 30k
        </el-button>
        <span style="color: #666;">Selected: {{ selectedRows.length }} rows</span>
      </el-space>
    </div>

    <z-table
      ref="tableRef"
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      height="500px"
      border
      stripe
      @selection-change="handleSelectionChange"
    />

    <div v-if="selectedRows.length > 0" style="padding: 16px; margin-top: 16px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin: 0 0 8px; color: #303133;">Selected rows ({{ selectedRows.length }}):</h4>
      <div style="max-height: 200px; overflow-y: auto;">
        <div
          v-for="row in selectedRows"
           :key="row.id"
           style="
             display: flex;
             align-items: center;
             justify-content: space-between;
             padding: 8px;
             margin-bottom: 4px;
             background: white;
             border: 1px solid #e4e7ed;
             border-radius: 4px;
           "
        >
          <span><strong>{{ row.name }}</strong> ({{ row.email }})</span>
          <span style="color: #67c23a;">¥{{ row.salary.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
