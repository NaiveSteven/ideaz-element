<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
})
const searchButtonProps = reactive({
  loading: false,
  label: '点击查询',
  type: 'primary',
})
const resetButtonProps = reactive({
  loading: false,
  label: '点击重置',
  type: 'danger',
})

const options = {
  gender: [
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
    field: 'gender',
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
  searchButtonProps.loading = true
  await delay(200)
  searchButtonProps.loading = false
  console.log(formData.value, 'formData')
}

async function handleReset() {
  resetButtonProps.loading = true
  await delay(200)
  resetButtonProps.loading = false
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
    :search-button-props="searchButtonProps"
    :reset-button-props="resetButtonProps"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
