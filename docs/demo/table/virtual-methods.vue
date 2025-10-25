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

// Generate a large dataset
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
  },
  {
    type: 'index',
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
    prop: 'gender',
    label: 'Gender',
  },
  {
    prop: 'age',
    label: 'Age',
    sortable: true,
  },
  {
    prop: 'time',
    label: 'Date of Birth',
  },
])

// Table method demos
function setCurrentRow() {
  const row = tableData.value[10]
  tableRef.value?.setCurrentRow(row)
  console.log('Set current row:', row)
}

function toggleRowSelection() {
  const row = tableData.value[5]
  tableRef.value?.toggleRowSelection(row, true)
  console.log('Toggle row selection:', row)
}

function clearSelection() {
  tableRef.value?.clearSelection()
  console.log('Clear selection')
}

function toggleAllSelection() {
  tableRef.value?.toggleAllSelection()
  console.log('Toggle select all')
}

function clearSort() {
  tableRef.value?.clearSort()
  console.log('Clear sort')
}

function scrollToTop() {
  tableRef.value?.scrollTo({ scrollTop: 0 })
  console.log('Scroll to top')
}

function scrollToBottom() {
  tableRef.value?.scrollTo({ scrollTop: 999999 })
  console.log('Scroll to bottom')
}

function scrollToRow() {
  const index = 500
  tableRef.value?.scrollToRow(index)
  console.log(`Scroll to row ${index + 1}`)
}

// Event handlers
function handleCurrentChange(currentRow: RowData, oldCurrentRow: RowData) {
  console.log('Current row changed:', currentRow, oldCurrentRow)
}

function handleSelectionChange(selection: RowData[]) {
  console.log('Selection changed:', selection.length, 'rows')
}

function handleSortChange({ column, prop, order }: any) {
  console.log('Sort changed:', { column, prop, order })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h4>Virtual table method tests</h4>
      <el-button @click="setCurrentRow">Set current row (row 11)</el-button>
      <el-button @click="toggleRowSelection">Select row 6</el-button>
      <el-button @click="clearSelection">Clear selection</el-button>
      <el-button @click="toggleAllSelection">Toggle select all</el-button>
      <el-button @click="clearSort">Clear sorting</el-button>
    </div>

    <div style="margin-bottom: 16px;">
      <h4>Virtual-scroll specific methods</h4>
      <el-button @click="scrollToTop">Scroll to top</el-button>
      <el-button @click="scrollToBottom">Scroll to bottom</el-button>
      <el-button @click="scrollToRow">Scroll to row 501</el-button>
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
