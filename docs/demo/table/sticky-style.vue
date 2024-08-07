<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
}

const loading = ref(false)
const tableData = ref<RowData[]>([])
const columns = ref([
  {
    prop: 'id',
    label: 'id',
  },
  {
    prop: 'name',
    label: '姓名',
    width: 300,
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
    width: 300,
  },
  {
    prop: 'time',
    label: () => h('span', {}, 'customLabel'),
    width: 300,
  },
])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
})

function mockApi(params: { page: number, pageSize: number }): Promise<{ result: { page: number, pageSize: number, total: number, list: RowData[] } }> {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFirstPage = [
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
          name: 'Mike',
          gender: 'male',
          age: 23,
          time: '2020-01-01',
        },
        {
          id: 4,
          name: 'Jack',
          gender: 'female',
          age: 16,
          time: '2012-01-01',
        },
      ]
      const dataSecondPage = [
        {
          id: 5,
          name: 'Nancy',
          gender: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
          id: 6,
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
    :sticky="{ parent: 'document', style: { border: '1px solid black' } }"
    @refresh="getTableData"
  >
    <template #expand="row">
      {{ row.$index }}
    </template>
  </z-table>
</template>
