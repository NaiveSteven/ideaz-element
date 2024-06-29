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

const zTableRef = ref()
const radioData = ref({})
const selectionData = ref<RowData[]>([])
const tableData = ref([
  {
    id: 1,
    name: 'Steven',
    gender: 'male',
    age: 22,
    time: '2020-01-01',
  },
  {
    id: 2,
    name: 'Helen',
    gender: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    id: 3,
    name: 'Nancy',
    gender: 'female',
    age: 18,
    time: '2018-01-01',
  },
  {
    id: 4,
    name: 'Jack',
    gender: 'male',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    type: 'radio',
  },
  {
    type: 'selection',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'time',
    label: '出生日期',
  },
])

function handleRadioChange(row: RowData) {
  radioData.value = row
  console.log(row, 'radio data')
}

function handleSelectionChange(selection: RowData[]) {
  selectionData.value = selection
  console.log(selection, 'selection data')
}

function handleClear() {
  zTableRef.value.clearSelection()
}
</script>

<template>
  <el-button @click="handleClear">
    清空选中
  </el-button>
  <z-crud
    ref="zTableRef"
    :data="tableData"
    :columns="columns"
    :action="false"
    @radio-change="handleRadioChange"
    @selection-change="handleSelectionChange"
  />
</template>
