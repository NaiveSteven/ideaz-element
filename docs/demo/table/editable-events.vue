<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { EditableTableEventParams } from 'ideaz-element'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
  __isEdit?: boolean
}

const tableData = ref<RowData[]>([
  {
    name: 'Steven',
    gender: '1',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    gender: '1',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    gender: '2',
    age: 18,
    time: '2018-01-01',
  },
  {
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
    label: 'Name',
  },
  {
    component: 'select',
    prop: 'gender',
    label: 'Gender',
  },
  {
    component: 'input',
    prop: 'age',
    label: 'Age',
  },
  {
    component: 'el-date-picker',
    prop: 'time',
    label: 'Date of Birth',
    fieldProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
])

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
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
