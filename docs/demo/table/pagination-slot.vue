<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { Pagination } from '@ideaz/element'

const loading = ref(false)
const tableData = ref<any>([])
const pagination = ref({
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
    prop: 'sex',
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

function mockApi(pagination: Pagination): Promise<{ result: { page: number, pageSize: number, total: number, list: any[] } }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFirstPage = [
        {
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: '2020-01-01',
        },
        {
          name: 'Helen',
          sex: 'male',
          age: 12,
          time: '2012-01-01',
        },
      ]
      const dataSecondPage = [
        {
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
          name: 'Jack',
          sex: 'male',
          age: 28,
          time: '2028-01-01',
        },
      ]
      resolve({
        result: {
          page: 1,
          pageSize: 10,
          total: 4,
          list: pagination.page === 1 ? dataFirstPage : dataSecondPage,
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
    :data="tableData"
    :loading="loading"
    :columns="columns"
    @refresh="getTableData"
  >
    <template #paginationTop>
      <div class="mb-4">
        <el-card>paginationTop</el-card>
      </div>
    </template>
    <template #paginationBottom>
      <div class="mb-4">
        <el-card>paginationBottom</el-card>
      </div>
    </template>
    <template #paginationLeft>
      <div class="mb-4">
        <el-card>paginationLeft</el-card>
      </div>
    </template>
    <template #paginationRight>
      <div class="mb-4">
        <el-card>paginationRight</el-card>
      </div>
    </template>
  </z-table>
</template>
