<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableFormConfig } from '@ideaz/element'

const columns = ref([
  {
    label: '姓名',
    prop: 'name',
  },
  {
    prop: 'sex',
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
const detailConfig = ref<TableFormConfig | boolean>(true)
const deleteConfig = ref<TableFormConfig | boolean>(true)
const editConfig = ref<TableFormConfig | boolean>(true)

function getTableData(params: any) {
  console.log(params, 'getTableData params')
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

function handleChangeViewVisible() {
  detailConfig.value = !detailConfig.value
}

function handleChangeDeleteVisible() {
  deleteConfig.value = !deleteConfig.value
}

function handleChangeEditVisible() {
  editConfig.value = !editConfig.value
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :columns="columns"
    :request="request"
    :detail="detailConfig"
    :edit="editConfig"
    :delete="deleteConfig"
  >
    <template #toolBarLeft>
      <el-button type="primary" size="small" @click="handleChangeViewVisible">
        查看按钮显隐
      </el-button>
      <el-button type="primary" size="small" @click="handleChangeDeleteVisible">
        删除按钮显隐
      </el-button>
      <el-button type="primary" size="small" @click="handleChangeEditVisible">
        编辑按钮显隐
      </el-button>
    </template>
  </z-crud>
</template>
