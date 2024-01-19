<script lang="ts" setup>
import { ref } from 'vue'

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
    type: 'sort',
    label: '排序',
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
const handleClick = () => {
  console.log(tableData.value, 'handleClick')
}

const handleSortEnd = (data) => {
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
