<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { CrudDeleteDialogConfirmParams } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        },
      })
    }, 100)
  })
}

function deleteMockApi(params: { id: number }) {
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

function handleDelete({ row, getTableData }: { row: RowData, getTableData: () => void }) {
  window.ZDialogTip({
    type: 'warning',
    title: '提示',
    message: '确定删除吗？',
    onConfirm: async ({ confirmButtonLoading, done }: CrudDeleteDialogConfirmParams<RowData>) => {
      confirmButtonLoading.value = true
      try {
        await deleteMockApi({ id: row.id })
        confirmButtonLoading.value = false
        done()
        getTableData()
      }
      catch {}
      confirmButtonLoading.value = false
    },
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
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    :delete="handleDelete"
  />
</template>
