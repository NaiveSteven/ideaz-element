<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
}

interface GetTableDataRes { result: { page: number, pageSize: number, list: RowData[], total: number } }

const loading = ref(false)
const formData = ref({
  name: '',
  gender: '',
  age: '',
})
const tableData = ref<RowData[]>([])

const columns = ref([
  {
    // 仅配置了search
    search: {
      component: 'input',
      label: '姓名',
      field: 'name',
    },
  },
  {
    prop: 'gender',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'gender',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age',
    },
  },
  {
    prop: 'time',
    label: '出生日期',
  },
])

const options = {
  gender: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 4,
})

function mockApi(params: any): Promise<GetTableDataRes> {
  console.log(params, 'params')
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
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        },
      })
    }, 100)
  })
}

async function getTableData() {
  loading.value = true
  try {
    const params = {
      ...pagination.value,
      ...formData.value,
    }
    const res = await mockApi(params)
    tableData.value = res.result.list
    pagination.value.total = res.result.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

function handleSearch() {
  pagination.value.page = 1
  getTableData()
}

getTableData()
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    :columns="columns"
    :options="options"
    :loading="loading"
    :action="false"
    @refresh="getTableData"
    @search="handleSearch"
    @reset="handleSearch"
  />
</template>
