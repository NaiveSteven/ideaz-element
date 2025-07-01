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

const tableData = ref<RowData[]>(generateLargeData(1500))
const tableRef = ref()

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
    sortable: true,
  },
  {
    prop: 'time',
    label: '出生日期',
    width: 200,
  },
])

// 表格方法测试
function setCurrentRow() {
  const row = tableData.value[10]
  tableRef.value?.setCurrentRow(row)
  console.log('设置当前行:', row)
}

function toggleRowSelection() {
  const row = tableData.value[5]
  tableRef.value?.toggleRowSelection(row, true)
  console.log('切换行选择:', row)
}

function clearSelection() {
  tableRef.value?.clearSelection()
  console.log('清空选择')
}

function toggleAllSelection() {
  tableRef.value?.toggleAllSelection()
  console.log('切换全选')
}

function clearSort() {
  tableRef.value?.clearSort()
  console.log('清空排序')
}

function scrollToTop() {
  tableRef.value?.scrollTo({ scrollTop: 0 })
  console.log('滚动到顶部')
}

function scrollToBottom() {
  tableRef.value?.scrollTo({ scrollTop: 999999 })
  console.log('滚动到底部')
}

function scrollToRow() {
  const index = 500
  tableRef.value?.scrollToRow(index)
  console.log(`滚动到第 ${index + 1} 行`)
}

// 事件处理
function handleCurrentChange(currentRow: RowData, oldCurrentRow: RowData) {
  console.log('当前行改变:', currentRow, oldCurrentRow)
}

function handleSelectionChange(selection: RowData[]) {
  console.log('选择改变:', selection.length, '行')
}

function handleSortChange({ column, prop, order }: any) {
  console.log('排序改变:', { column, prop, order })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h4>虚拟表格方法测试</h4>
      <el-button @click="setCurrentRow">设置当前行(第11行)</el-button>
      <el-button @click="toggleRowSelection">选择第6行</el-button>
      <el-button @click="clearSelection">清空选择</el-button>
      <el-button @click="toggleAllSelection">切换全选</el-button>
      <el-button @click="clearSort">清空排序</el-button>
    </div>

    <div style="margin-bottom: 16px;">
      <h4>虚拟滚动专用方法测试</h4>
      <el-button @click="scrollToTop">滚动到顶部</el-button>
      <el-button @click="scrollToBottom">滚动到底部</el-button>
      <el-button @click="scrollToRow">滚动到第501行</el-button>
    </div>

    <z-table
      ref="tableRef"
      v-model:data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      row-key="id"
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    />
  </div>
</template>
