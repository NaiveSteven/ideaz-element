<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { EditableTableEventParams } from '@ideaz/element'

interface RowData {
  name: string
  sex: string
  age: number
  time: string
  __isEdit?: boolean
}

const tableData = ref<RowData[]>([
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
    component: 'datepicker',
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

const editable = {
  type: 'single',
  maxLength: 5,
  onCancel: ({ row, $index, column, formRef }: EditableTableEventParams<RowData>) => {
    console.log(row, $index, column, formRef, 'row onCancel')
  },
  onSave: ({ row, $index, column, formRef }: EditableTableEventParams<RowData>) => {
    console.log(row, $index, column, formRef, 'row onSave')
  },
  onDelete: ({ row, $index, column, formRef }: EditableTableEventParams<RowData>) => {
    console.log(row, $index, column, formRef, 'row onDelete')
  },
  onEdit: ({ row, $index, column, formRef }: EditableTableEventParams<RowData>) => {
    row.__isEdit = true
    console.log(row, $index, column, formRef, 'row onEdit')
  },
}
</script>

<template>
  <z-table
    v-model:data="tableData"
    :columns="columns"
    :options="options"
    :editable="editable"
  />
</template>
