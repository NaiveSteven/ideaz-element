<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { DeleteRequestApiParams } from '@ideaz/element'

interface RowData {
  id: number
  name: string
  sex: string
  age: number
  time: string
}

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  age: '',
})
const tableData = ref([])

const columns = ref([
  {
    type: 'selection',
    reserveSelection: true,
  },
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      label: '姓名',
      field: 'name',
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name',
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex',
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
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 4,
})
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi,
})

function mockApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: '2020-01-01',
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          time: '2012-01-01',
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          time: '2028-01-01',
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

function deleteMockApi(params: DeleteRequestApiParams<RowData>) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
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
    v-model:columns="columns"
    :options="options"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    row-key="id"
  />
</template>
