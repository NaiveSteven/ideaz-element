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
    name: 'Steven',
    gender: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    id: 3,
    name: 'female',
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

</script>

<template>
  <z-table
    v-model:data="tableData"
    :columns="columns"
    :draggable="true"
    :merge-cells="{
      direction: 'both',
    }"
    border
  />
</template>
