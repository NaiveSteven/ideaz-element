<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
}

const loading = ref(false)
const tableData = ref([
  {
    name: 'Steven',
    gender: 'male',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    gender: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    gender: 'female',
    age: 18,
    time: '2018-01-01',
  },
  {
    name: 'Jack',
    gender: 'male',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'gender',
    label: 'Gender',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'time',
    label: 'Date of Birth',
  },
  {
    type: 'button',
    label: 'Actions',
    width: '200px',
    buttons: [
      {
        type: 'primary',
        link: true,
        label: 'Edit',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log(row, 'edit')
        },
      },
      {
        type: 'danger',
        link: true,
        label: 'Delete',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log(row, 'delete')
        },
      },
      {
        type: 'dropdown',
        reference: 'Delete',
        children: [
          {
            type: 'primary',
            link: true,
            label: 'Copy',
            onClick: ({ row }: TableColumnScopeData<RowData>) => {
              console.log(row, 'copy')
            },
          },
          {
            type: 'danger',
            link: true,
            label: 'Actions',
            onClick: ({ row }: TableColumnScopeData<RowData>) => {
              console.log(row, 'operate')
            },
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <z-table
    :data="tableData"
    :loading="loading"
    :columns="columns"
  />
</template>
