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
}

// Generate mock data
function generateData(count: number): RowData[] {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
  const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing']
  const positions = ['Engineer', 'Product Manager', 'Designer', 'Operations Specialist', 'Marketing Specialist']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      salary: Math.floor(Math.random() * 50000) + 8000,
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(2000))
const indexType = ref('number')

const columns = computed(() => [
  {
    type: 'index',
    label: 'Index',
    index: indexType.value === 'number' ? 1 :
           indexType.value === 'function' ? (index: number) => `No.${index + 1}` :
           undefined,
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
])

// Virtual scrolling config
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

function changeIndexType(type: string) {
  indexType.value = type
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>Virtual Table Index Column Demo</h3>
      <p style="margin: 8px 0; color: #666;">
        The virtual table fully supports index columns, including numeric indexes and custom index functions.
      </p>

      <el-space wrap>
        <span>Index type:</span>
        <el-radio-group v-model="indexType" @change="changeIndexType">
          <el-radio-button value="number">Numeric index</el-radio-button>
          <el-radio-button value="function">Function index</el-radio-button>
          <el-radio-button value="default">Default index</el-radio-button>
        </el-radio-group>
      </el-space>
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

<style scoped>
ul {
  padding-left: 20px;
  margin: 0;
}

li {
  margin: 4px 0;
}
</style>
