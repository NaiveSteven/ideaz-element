<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { DialogFormCancelParams } from 'ideaz-element'

interface FormData {
  name?: string
  gender?: string
  age?: string
}

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  date: string
  time: string[]
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
    label: '姓名',
    form: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'gender',
    label: '性别',
    form: {
      component: 'select',
      field: 'gender',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'el-date-picker',
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
  gender: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 4,
})
const request = ref({
  searchApi: mockApi,
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

function handleCancel({ done, formRef, formData, type, confirmButtonLoading, row }: DialogFormCancelParams<FormData, RowData>) {
  confirmButtonLoading.value = true
  console.log(formRef, formData, type, row)
  done()
  confirmButtonLoading.value = false
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
    @operate-cancel="handleCancel"
  />
</template>
