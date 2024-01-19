<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: 'Steven',
    sex: '1',
    age: 22,
    time: '2020-01-01',
  },
  {
    id: 2,
    name: 'Helen',
    sex: '1',
    age: 12,
    time: '2012-01-01',
  },
  {
    id: 3,
    name: 'Nancy',
    sex: '2',
    age: 18,
    time: '2018-01-01',
  },
  {
    id: 4,
    name: 'Jack',
    sex: '1',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    type: 'sort',
  },
  {
    type: 'expand',
  },
  {
    type: 'index',
  },
  {
    type: 'radio',
  },
  {
    type: 'selection',
    reserveSelection: true,
  },
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
  },
  {
    type: 'select',
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

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    :columns="columns"
    :options="options"
    :action="true"
    row-key="id"
  >
    <template #expand>
      <span>展开内容</span>
    </template>
  </z-crud>
</template>
