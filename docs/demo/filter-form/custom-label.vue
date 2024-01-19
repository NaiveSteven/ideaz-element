<script lang="ts" setup>
import { h, ref } from 'vue'

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
    label: () => h('span', {}, '姓名'),
    required: true,
    error: 'error message',
  },
  {
    component: 'select',
    field: 'sex',
    label: 'labelSlot',
    required: true,
    error: h('span', {}, 'errorSlot'),
  },
  {
    component: 'datepicker',
    field: 'time',
    label: '出生日期',
    required: true,
    error: 'errorSlot',
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
    size="small"
    label-width="80px"
  >
    <template #labelSlot>
      <span>性别</span>
    </template>
    <template #errorSlot>
      <span>出生日期必填</span>
    </template>
  </z-filter-form>
</template>
