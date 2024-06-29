<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import { ElInput } from 'element-plus'
import type { TableColumnScopeData } from '@ideaz/element'

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
    gender: '1',
    age: 22,
    time: '2020-01-01',
  },
  {
    id: 2,
    name: 'Helen',
    gender: '1',
    age: 12,
    time: '2012-01-01',
  },
  {
    id: 3,
    name: 'Nancy',
    gender: '2',
    age: 18,
    time: '2018-01-01',
  },
  {
    id: 4,
    name: 'Jack',
    gender: '1',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
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
  },
  {
    component: 'input',
    prop: 'name',
    label: '姓名',
    onChange: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, column, $index, val)
    },
    onInput: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('input event', row, column, $index, val)
    },
    fieldProps: {
      clearable: true,
    },
  },
  {
    component: 'select',
    prop: 'gender',
    label: '性别',
    fieldProps: {
      clearable: true,
    },
    onChange: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, column, $index, val)
    },
  },
  {
    prop: 'age',
    label: '年龄',
    component: markRaw(ElInput),
    fieldProps: {
      clearable: true,
    },
    onChange: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, column, $index, val)
    },
    onInput: ({ row }: TableColumnScopeData<RowData>, val: string) => {
      console.log('input event', row, val)
    },
  },
  {
    prop: 'time',
    label: '出生日期',
  },
])

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}
</script>

<template>
  <z-table v-model:data="tableData" :columns="columns" :options="options">
    <template #expand>
      <span>展开内容</span>
    </template>
  </z-table>
</template>
