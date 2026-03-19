<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  gender: '',
  time: [],
})
const tableData = ref([])
const visible = ref(false)

const columns = ref([
  {
    prop: 'name',
    label: 'Name',
    search: {
      component: 'input',
      field: 'name',
      label: 'Name',
    },
  },
  {
    prop: 'gender',
    label: 'Gender',
    search: {
      component: 'select',
      field: 'gender',
      label: 'Gender',
    },
  },
  {
    prop: 'age',
    label: 'Age',
    search: {
      component: 'el-date-picker',
      field: 'time',
      label: 'Date',
      hide: () => !visible.value,
      fieldProps: {
        type: 'daterange',
        startPlaceholder: 'Start date',
        endPlaceholder: 'End date',
      },
    },
  },
  {
    prop: 'time',
    label: 'Date',
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
          name: 'Steven',
          gender: 'male',
          age: 22,
          time: '2020-01-01',
        },
        {
          name: 'Helen',
          gender: 'male',
          age: 12,
          time: '2012-01-01',
        },
        {
          name: 'Nancy',
          gender: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
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

function handleClick() {
  visible.value = !visible.value
}
</script>

<template>
  <el-button @click="handleClick">
    Toggle visibility
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
