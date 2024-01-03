<script lang="ts" setup>
import { ref } from 'vue'

const zTableRef = ref()
const radioData = ref({})
const selectionData = ref([])
const tableData = ref([
  {
    id: 1,
    name: 'Steven',
    sex: 'male',
    age: 22,
    time: '2020-01-01',
  },
  {
    id: 2,
    name: 'Helen',
    sex: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    id: 3,
    name: 'Nancy',
    sex: 'female',
    age: 18,
    time: '2018-01-01',
  },
  {
    id: 4,
    name: 'Jack',
    sex: 'male',
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
    prop: 'sex',
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

const handleRadioChange = (row) => {
  radioData.value = row
  console.log(row, 'radio data')
}

const handleSelectionChange = (selection) => {
  selectionData.value = selection
  console.log(selection, 'selection data')
}

const handleClear = () => {
  zTableRef.value.clearSelection()
}
</script>

<template>
  <el-button @click="handleClear">
    清空选中
  </el-button>
  <z-table
    ref="zTableRef"
    :data="tableData"
    :columns="columns"
    @radio-change="handleRadioChange"
    @selection-change="handleSelectionChange"
  />
</template>
