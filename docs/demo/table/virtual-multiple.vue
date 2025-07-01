<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
}

// 生成大量测试数据
function generateLargeData(count: number): RowData[] {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['male', 'female']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateLargeData(2000))
const selectedRows = ref<RowData[]>([])

const columns = ref([
  {
    type: 'selection',
    width: 80,
  },
  {
    type: 'index',
    width: 80,
  },
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 150,
  },
  {
    prop: 'gender',
    label: '性别',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 120,
  },
  {
    prop: 'time',
    label: '出生日期',
    width: 200,
  },
])

// 表格事件处理
function handleSelectionChange(selection: RowData[]) {
  selectedRows.value = selection
  console.log('选中的行:', selection.length, selection)
}

function selectAll() {
  // 这里应该调用表格的 toggleAllSelection 方法
  console.log('全选操作')
}

function clearSelection() {
  selectedRows.value = []
  // 这里应该调用表格的 clearSelection 方法
  console.log('清空选择')
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <el-button @click="selectAll">全选</el-button>
      <el-button @click="clearSelection">清空选择</el-button>
      <span style="margin-left: 16px;">已选中 {{ selectedRows.length }} 行</span>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      row-key="id"
      @selection-change="handleSelectionChange"
    />

    <div style="margin-top: 16px;">
      <h4>选中的数据:</h4>
      <pre>{{ selectedRows.map(row => `${row.id}: ${row.name}`).join('\n') }}</pre>
    </div>
  </div>
</template>
