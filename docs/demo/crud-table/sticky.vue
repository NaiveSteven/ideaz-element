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

const searchFormData = ref({
  name: '',
})

const columns = ref([
  {
    type: 'selection',
    reserveSelection: true,
  },
  {
    label: '姓名',
    prop: 'name',
    search: {
      component: 'el-input',
    },
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
const request = ref({
  searchApi: getTableData,
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
})
const loading = ref(false)
const selectionData = ref<RowData[]>([])

function getTableData(params: any) {
  console.log(params, 'getTableData params')
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
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    v-model:selectionData="selectionData"
    v-model:formData="searchFormData"
    :columns="columns"
    :request="request"
    :action="false"
    :sticky="{ parent: 'document' }"
    row-key="id"
    stripe
  />
</template>
