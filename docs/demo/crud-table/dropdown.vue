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
    width: '200px',
    buttons: [
      {
        type: 'primary',
        link: true,
        label: '编辑',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log(row, 'edit')
        },
      },
      {
        type: 'danger',
        link: true,
        label: '删除',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log(row, 'delete')
        },
      },
      {
        type: 'dropdown',
        reference: '其他',
        children: [
          {
            type: 'primary',
            link: true,
            label: '复制',
            onClick: ({ row }: TableColumnScopeData<RowData>) => {
              console.log(row, 'copy')
            },
          },
          {
            type: 'danger',
            link: true,
            label: '操作',
            onClick: ({ row }: TableColumnScopeData<RowData>) => {
              console.log(row, 'operate')
            },
          },
        ],
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
