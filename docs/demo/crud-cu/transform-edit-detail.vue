<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { EditRequestApiParams } from '@ideaz/element'

interface RowData {
  id: number
  name: string
  sex: string
  age: number
  time: string[]
  date: string
}

interface FormData {
  name: string
  sex: string
  age: string
}

interface GetTableDataRes { data: { page: number, pageSize: number, list: RowData[], total: number } }

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  age: '',
})
const tableData = ref<RowData[]>([])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    form: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false,
  },
  {
    prop: 'date',
    label: '出生日期',
  },
])

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 4,
})
const request = ref({
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi,
  detailApi,
  alias: {
    detail: (res: GetTableDataRes) => {
      console.log(res, 'res')
      return {
        ...res.data,
        time: [],
      }
    },
  },
})

function mockApi(): Promise<GetTableDataRes> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
      ]

      resolve({
        data: {
          page: 1,
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        },
      })
    }, 100)
  })
}

function commonApi(params: EditRequestApiParams<FormData, RowData>) {
  console.log(params, 'commonApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: 'success',
        code: 200,
      })
    }, 100)
  })
}

function detailApi(params: { id: number }) {
  console.log(params, 'commonApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: ['2020-01-01', '2020-01-03'],
        },
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    v-model:columns="columns"
    :options="options"
    :detail="false"
    :request="request"
  />
</template>
