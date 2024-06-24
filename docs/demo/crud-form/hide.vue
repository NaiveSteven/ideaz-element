<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const tableData = ref([])
const visible = ref(false)

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: '姓名',
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'el-date-picker',
      field: 'time',
      label: '出生日期',
      hide: () => !visible.value,
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
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
})

function mockApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: '2020-01-01',
        },
        {
          name: 'Helen',
          sex: 'male',
          age: 12,
          time: '2012-01-01',
        },
        {
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
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

function handleClick() {
  visible.value = !visible.value
}
</script>

<template>
  <el-button @click="handleClick">
    点击
  </el-button>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="{ labelWidth: '80px' }"
    :action="false"
    :request="request"
  />
</template>
