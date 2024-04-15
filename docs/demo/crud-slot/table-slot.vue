<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
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
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex',
    },
    detail: {
      field: 'sex',
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
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }],
}
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
          sex: 'male',
          age: 22,
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02'],
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
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
          list: data,
        },
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :tool-bar="false"
  >
    <template #tableTop>
      <div class="slot-demo">
        tableTop
      </div>
    </template>
    <template #tableBottom>
      <div class="slot-demo">
        tableBottom
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
