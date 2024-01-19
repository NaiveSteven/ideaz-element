<script lang="ts" setup>
import { h, ref } from 'vue'

const tableData = ref([
  {
    name: 'Steven',
    sex: 'male',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    sex: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    sex: 'female',
    age: 18,
    time: '2018-01-01',
  },
  {
    name: 'Jack',
    sex: 'male',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    tooltip: () => h('span', '姓名提示'),
  },
  {
    prop: 'sex',
    label: '性别',
    tooltip: '性别提示',
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
  <z-crud
    v-model:data="tableData"
    :columns="columns"
    :action="false"
  />
</template>
