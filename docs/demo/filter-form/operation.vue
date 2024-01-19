<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

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
    component: 'datepicker',
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

const handleSearch = () => {
  console.log(formData.value, 'formData')
}

const handleReset = () => {
  console.log(formData.value, 'formData')
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
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
