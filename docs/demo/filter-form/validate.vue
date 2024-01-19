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

const rules = {
  time: [{ required: true, message: '出生日期必选' }],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
    required: true,
    message: '请将姓名填写完整',
  },
  {
    component: 'select',
    field: 'sex',
    formItemProps: {
      required: true,
      label: '性别',
    },
  },
  {
    component: 'datepicker',
    field: 'time',
    label: '出生日期',
    rules: {
      required: true,
      message: '出生日期必选',
    },
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :rules="rules"
    size="small"
    label-width="80px"
  />
</template>
