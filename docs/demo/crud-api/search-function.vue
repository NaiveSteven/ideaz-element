<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
}

interface GetTableDataRes { data: { page: number, pageSize: number, list: RowData[], total: number } }

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    form: {
      component: 'input',
      label: '姓名',
      field: 'name',
    },
  },
  {
    prop: 'gender',
    label: '性别',
    form: {
      component: 'select',
      label: '性别',
      field: 'gender',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
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
const tableData = ref<RowData[]>([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
})
const loading = ref(false)
const formData = ref({})
const request = ref({
  deleteApi: commonApi,
  submitApi: commonApi,
  searchFunc: async ({ params }: any) => {
    loading.value = true
    try {
      console.log(params, 'searchFunc params')
      const res = await getData(params)
      tableData.value = res.data.list
      pagination.value.total = res.data.total
    }
    catch {

    }
    loading.value = false
  },
})
const options = {
  gender: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}

function getData(params: any): Promise<GetTableDataRes> {
  console.log(params, 'params')
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

function commonApi(params: any) {
  console.log(JSON.stringify(params), 'commonApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: 'success',
        code: 200,
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:formData="formData"
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
  />
</template>
