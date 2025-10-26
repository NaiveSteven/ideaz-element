<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
})

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: () => h('span', {}, 'Name'),
    required: true,
    error: 'error message',
  },
  {
    component: 'select',
    field: 'gender',
    label: 'labelSlot',
    required: true,
    error: h('span', {}, 'errorSlot'),
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date',
    required: true,
    error: 'errorSlot',
    fieldProps: {
      type: 'daterange',
      startPlaceholder: 'Start Date',
      endPlaceholder: 'End Date',
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
      <span>Gender</span>
    </template>
    <template #errorSlot>
      <span>Date is required</span>
    </template>
  </z-filter-form>
</template>
