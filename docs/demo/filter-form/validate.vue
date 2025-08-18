<script lang="ts" setup>
import { ref } from 'vue'

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

const rules = {
  time: [{ required: true, message: 'Date of birth is required' }],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'Name',
    required: true,
    message: 'Please enter full name',
  },
  {
    component: 'select',
    field: 'gender',
    formItemProps: {
      required: true,
      label: 'Gender',
    },
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date of Birth',
    rules: {
      required: true,
      message: 'Date of birth is required',
    },
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
    :rules="rules"
    size="small"
    label-width="80px"
  />
</template>
