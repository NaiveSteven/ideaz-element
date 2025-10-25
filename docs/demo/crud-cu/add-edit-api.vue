<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { EditRequestApiParams } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  date: string
  time: string[]
}

interface FormData {
  name: string
  gender: string
  age: string
}

const loading = ref(false)
const formData = ref({
  name: '',
  gender: '',
  age: '',
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: 'Name',
    form: {
      component: 'input',
      field: 'name',
      label: 'Name',
      required: true,
    },
  },
  {
    prop: 'gender',
    label: 'Gender',
    form: {
      component: 'select',
      field: 'gender',
      label: 'Gender',
    },
  },
  {
    prop: 'age',
    label: 'Age',
    form: {
      component: 'el-date-picker',
      field: 'time',
      label: 'Date of Birth',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: 'Start date',
        endPlaceholder: 'End date',
      },
    },
    search: false,
  },
  {
    prop: 'date',
    label: 'Date of Birth',
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
const request = ref({
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi,
})

function mockApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: 'Steven',
          gender: 'male',
          age: 22,
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 2,
          name: 'Helen',
          gender: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 3,
          name: 'Nancy',
          gender: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 4,
          name: 'Jack',
          gender: 'male',
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :columns="columns"
    :options="options"
    :detail="false"
    :request="request"
  />
</template>
