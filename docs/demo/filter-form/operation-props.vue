<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const searchButtonLoading = ref(false)
const resetButtonLoading = ref(false)

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
    required: true,
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
    required: true,
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: '出生日期',
    required: true,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
]

async function handleSearch() {
  searchButtonLoading.value = true
  await delay(200)
  searchButtonLoading.value = false
  console.log(formData.value, 'formData')
}

async function handleReset() {
  resetButtonLoading.value = true
  await delay(200)
  resetButtonLoading.value = false
  console.log(formData.value, 'formData')
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    search-button-label="点击查询"
    reset-button-label="点击重置"
    :search-button-loading="searchButtonLoading"
    :reset-button-loading="resetButtonLoading"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
