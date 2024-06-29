<!-- eslint-disable unused-imports/no-unused-vars -->
<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
}

const tableData = ref([
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
    component: 'input',
    prop: 'name',
    label: '姓名',
    onChange: ({ row }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, val)
    },
    onInput: ({ row }: TableColumnScopeData<RowData>, val: string) => {
      console.log('input event', row, val)
    },
    fieldProps: {
      clearable: true,
      disabled: ({ row, column, $index }: TableColumnScopeData<RowData>) => {
        return row.id === 1
      },
    },
  },
  {
    component: 'select',
    prop: 'gender',
    label: '性别',
    onChange: ({ row }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, val)
    },
    fieldProps: {
      placeholder: ({ row, column, $index }: TableColumnScopeData<RowData>) => {
        return `${row.name}性别${$index}`
      },
      clearable: true,
    },
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
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}
</script>

<template>
  <z-table v-model:data="tableData" :columns="columns" :options="options" />
</template>
