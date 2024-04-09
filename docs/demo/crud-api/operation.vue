<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

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
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      label: '性别',
      field: 'sex',
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
const tableData = ref([])
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
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}

function getData() {
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
          pageSize: 2,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        },
      })
    }, 100)
  })
}

function commonApi() {
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

function handleRefresh(val) {
  pagination.value.page = val.page
  pagination.value.pageSize = val.pageSize
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

async function handleSubmit({ formData, type, rowData, form, done, isValid }) {
  if (isValid) {
    dialog.value.confirmButtonLoading = true
    try {
      const params = {
        ...formData,
      }
      console.log(params, rowData, 'params')
      if (type === 'edit')
        await commonApi({ ...params, id: rowData.id })
      else
        await commonApi(params, form)
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
