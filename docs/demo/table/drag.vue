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

const tableData = ref<RowData[]>([
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
    type: 'sort',
    label: '排序',
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
function handleClick() {
  console.log(tableData.value, 'handleClick')
}

function handleSortEnd(data: RowData[]) {
  console.log(data, 'data')
}
</script>

<template>
  <el-button @click="handleClick">
    click
  </el-button>
  <z-table
    v-model:data="tableData"
    :columns="columns"
    :draggable="true"
    row-key="id"
    @drag-sort-end="handleSortEnd"
  />
</template>
