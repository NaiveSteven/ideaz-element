<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
}

const loading = ref(false)
const tableData = ref([])
const totalData = ref<RowData[]>([])
const pagination = ref({
  type: 'front',
  page: 1,
  pageSize: 2,
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper',
})

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
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
])

function mockApi(params: { page: number, pageSize: number }): Promise<{ result: { page: number, pageSize: number, total: number, list: RowData[] } }> {
  console.log(params, 'pagination front params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
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
      ]

      resolve({
        result: {
          page: 1,
          pageSize: 10,
          total: 4,
          list: data,
        },
      })
    }, 100)
  })
}

async function getTableData() {
  loading.value = true
  try {
    const res = await mockApi({ ...pagination.value })
    totalData.value = res.result.list
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
  {{ tableData }}
  <z-table
    v-model:pagination="pagination"
    v-model:data="tableData"
    :loading="loading"
    :columns="columns"
    :total-data="totalData"
    @refresh="getTableData"
  />
</template>
