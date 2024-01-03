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
    type: 'input',
    prop: 'age',
    label: '年龄',
  },
  {
    type: 'datepicker',
    prop: 'time',
    label: '出生日期',
    attrs: {
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
  onCancel: ({ row, index, column, formRef }) => {
    console.log(row, 'row onCancel')
  },
  onSave: ({ row, index, column, formRef }) => {
    console.log(row, 'row onSave')
  },
  onDelete: ({ row, index, column, formRef }) => {
    console.log(row, 'row onDelete')
  },
  onEdit: ({ row, index, column, formRef }) => {
    row.__isEdit = true
    console.log(row, 'row onEdit')
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
