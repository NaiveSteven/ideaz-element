<script lang="ts" setup>
import { ref } from 'vue'

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
    detail: {
      field: 'name',
      label: '姓名',
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
    detail: {
      field: 'gender',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    detail: {
      field: 'time',
      label: '出生日期',
    },
    search: {
      component: 'input',
      label: '年龄',
      field: 'age',
    },
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
  align: 'center',
})
const request = ref({
  searchApi: mockApi,
})
const alignOptions = [
  { label: 'left pagination', value: 'left' },
  { label: 'center pagination', value: 'center' },
  { label: 'right pagination', value: 'right' },
]

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
</script>

<template>
  <z-radio v-model="pagination.align" :options="alignOptions" type="radio-button" />
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
  >
    <template #formTop>
      <div class="slot-demo">
        formTop
      </div>
    </template>
    <template #formBottom>
      <div class="slot-demo">
        formBottom
      </div>
    </template>
    <template #toolBarTop>
      <div class="slot-demo">
        toolBarTop
      </div>
    </template>
    <template #toolBarBottom>
      <div class="slot-demo">
        toolBarBottom
      </div>
    </template>
    <template #toolBarRight>
      <div class="slot-demo">
        toolBarRight
      </div>
    </template>
    <template #toolBarLeft>
      <div class="slot-demo">
        toolBarLeft
      </div>
    </template>
    <template #tableTitle>
      <div class="slot-demo">
        tableTitle
      </div>
    </template>
    <template #crudMiddle>
      <div class="mb-4">
        <el-card>crudMiddle</el-card>
      </div>
    </template>
    <template #paginationTop>
      <div class="mb-4">
        <el-card>paginationTop</el-card>
      </div>
    </template>
    <template #paginationBottom>
      <div class="mb-4">
        <el-card>paginationBottom</el-card>
      </div>
    </template>
    <template #paginationLeft>
      <div class="mb-4">
        <el-card>paginationLeft</el-card>
      </div>
    </template>
    <template #paginationRight>
      <div class="mb-4">
        <el-card>paginationRight</el-card>
      </div>
    </template>
  </z-crud>
</template>

<style lang="scss">
.slot-demo {
  padding: 10px;
  border: 1px solid var(--el-card-border-color);
  border-radius: var(--el-card-border-radius);
  box-shadow: var(--el-box-shadow-light);
}
</style>
