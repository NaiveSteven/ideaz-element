<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { DefaultButtonOperation, TableColumnScopeData } from 'ideaz-element'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
  __isEdit: boolean
}

const tableData = ref([
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
  {
    type: 'button',
    label: 'Actions',
    buttons: ({ renderEdit, renderCancel, renderDelete, renderSave }: DefaultButtonOperation, tableData: Ref<RowData[]>) => {
      return [
        {
          type: 'primary',
          link: true,
          label: 'Copy',
          hide: ({ row }: TableColumnScopeData<RowData>) => row.__isEdit,
          onClick: ({ row }: TableColumnScopeData<RowData>) => {
            tableData.value.push({ ...row })
          },
        },
        renderEdit,
        renderCancel,
        renderDelete,
        renderSave,
      ]
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
}
</script>

<template>
  <z-table
    :data="tableData"
    :columns="columns"
    :options="options"
    :editable="editable"
  />
</template>
