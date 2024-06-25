<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { Pagination } from '@ideaz/element'

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
      required: true,
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
const dialog = ref({
  confirmButtonLoading: false,
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
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: 'success',
        code: 200,
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
    const res = await getData(params)
    tableData.value = res.data.list
    pagination.value.total = res.data.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

function handleRefresh(val: Pagination) {
  pagination.value.page = val.page!
  pagination.value.pageSize = val.pageSize!
  getTableData()
}

function handleSearch() {
  pagination.value.page = 1
  getTableData()
}

function handleDelete() {
  window.ZDialogTip({
    type: 'warning',
    message: '确定删除该条数据吗？',
    title: '警告',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
      confirmButtonLoading.value = false
    },
  })
}

async function handleSubmit({ formData, type, rowData, formRef, done, isValid }: { formData: any, type: 'add' | 'edit', rowData: RowData, formRef: any, done: () => void, isValid: boolean }) {
  if (isValid) {
    dialog.value.confirmButtonLoading = true
    try {
      const params = {
        ...formData,
      }
      console.log(params, rowData, formRef, 'params')
      if (type === 'edit')
        await commonApi({ ...params, id: rowData.id })
      else
        await commonApi(params)
      dialog.value.confirmButtonLoading = false
      done()
      getTableData()
    }
    catch {

    }
    dialog.value.confirmButtonLoading = false
  }
}

getTableData()
</script>

<template>
  <z-crud
    v-model:formData="formData"
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :dialog="dialog"
    @refresh="handleRefresh"
    @reset="handleSearch"
    @search="handleSearch"
    @submit="handleSubmit"
    @delete="handleDelete"
  />
</template>
