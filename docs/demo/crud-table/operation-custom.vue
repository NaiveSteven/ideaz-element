<!-- eslint-disable unused-imports/no-unused-vars -->
<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnScopeData } from '@ideaz/element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
}

const columns = ref([
  {
    label: '姓名',
    prop: 'name',
  },
  {
    prop: 'gender',
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
  {
    type: 'button',
    label: '操作',
    buttons: [
      {
        label: '查看',
        link: true,
        type: 'primary',
        disabled: ({ row, column, $index }: TableColumnScopeData<RowData>) => row.name === 'Steven',
        onClick: ({ row }: TableColumnScopeData<RowData>) => console.log(row, 'row'),
      },
      {
        label: '删除',
        link: true,
        type: 'danger',
        disabled: ({ row, column, $index }: TableColumnScopeData<RowData>) => row.age === 18,
        onClick: ({ row }: TableColumnScopeData<RowData>) => console.log(row, 'row'),
      },
    ],
  },
])
const request = ref({
  searchApi: getTableData,
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
})
const loading = ref(false)

function getTableData(params: any) {
  console.log(params, 'getTableData params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: 'Steven',
          gender: 'male',
          age: 22,
          time: '2020-01-01',
        },
        {
          id: 2,
          name: 'Helen',
          gender: 'male',
          age: 12,
          time: '2012-01-01',
        },
        {
          id: 3,
          name: 'Nancy',
          gender: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
          id: 4,
          name: 'Jack',
          gender: 'male',
          age: 28,
          time: '2028-01-01',
        },
      ]

      resolve({
        data: {
          page: 1,
          pageSize: 2,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        },
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :columns="columns"
    :request="request"
    :action="false"
  />
</template>
