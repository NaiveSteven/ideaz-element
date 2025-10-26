<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  gender: '',
  time: [],
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: 'Name',
    search: {
      component: 'input',
      field: 'name',
      label: () => h('span', {}, 'Name'),
      required: true,
      error: 'error message',
    },
  },
  {
    prop: 'gender',
    label: 'Gender',
    search: {
      component: 'select',
      field: 'gender',
      label: 'labelSlot',
      required: true,
      error: h('span', {}, 'errorSlot'),
    },
  },
  {
    prop: 'age',
    label: 'Age',
    search: {
      component: 'el-date-picker',
      field: 'time',
      label: 'Date',
      required: true,
      error: 'errorSlot',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: 'Start date',
        endPlaceholder: 'End date',
      },
    },
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :columns="columns"
    :options="options"
    :action="false"
    :search="{ labelWidth: '80px' }"
    :request="request"
  >
    <template #labelSlot>
      <span>Gender</span>
    </template>
    <template #errorSlot>
      <span>Date is required</span>
    </template>
  </z-crud>
</template>
