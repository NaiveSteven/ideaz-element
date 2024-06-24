<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    name: 'Steven',
    sex: '1',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    sex: '1',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    sex: '2',
    age: 18,
    time: '2018-01-01',
  },
  {
    name: 'Jack',
    sex: '1',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    component: 'input',
    prop: 'name',
    label: '姓名',
  },
  {
    component: 'select',
    prop: 'sex',
    label: '性别',
  },
  {
    component: 'input',
    prop: 'age',
    label: '年龄',
  },
  {
    component: 'el-date-picker',
    prop: 'time',
    label: '出生日期',
    fieldProps: {
      valueFormat: 'YYYY-MM-DD',
    },
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
  <z-table
    v-model:data="tableData"
    :columns="columns"
    :options="options"
    :editable="{ type: 'multiple', maxLength: 10, deleteConfirm: true }"
  />
</template>
