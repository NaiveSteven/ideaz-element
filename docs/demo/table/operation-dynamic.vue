<!-- eslint-disable unused-imports/no-unused-vars -->
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
const tableData = ref<RowData[]>([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
})

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
    label: 'Date',
  },
  {
    type: 'button',
    label: 'Actions',
    buttons: [
      {
        type: 'primary',
        link: true,
        label: 'Edit',
        disabled: ({ row, column, $index }: TableColumnScopeData<RowData>) => row.name === 'Steven',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log(row, 'edit')
        },
      },
      {
        type: 'danger',
        link: true,
        label: 'Delete',
        disabled: ({ row, column, $index }: TableColumnScopeData<RowData>) => row.age === 18,
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log(row, 'delete')
        },
      },
    ],
  },
])

function mockApi(params: { page: number, pageSize: number }): Promise<{ result: { page: number, pageSize: number, total: number, list: RowData[] } }> {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFirstPage = [
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
      ]
      const dataSecondPage = [
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
      ]
      resolve({
        result: {
          page: 1,
          pageSize: 10,
          total: 4,
          list: pagination.value.page === 1 ? dataFirstPage : dataSecondPage,
        },
      })
    }, 100)
  })
}

async function getTableData() {
  loading.value = true
  try {
    const res = await mockApi({ ...pagination.value })
    tableData.value = res.result.list
    pagination.value.total = res.result.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

getTableData()
</script>

<template>
  <z-table
    v-model:pagination="pagination"
    v-model:data="tableData"
    :columns="columns"
    :loading="loading"
    @refresh="getTableData"
  />
</template>
