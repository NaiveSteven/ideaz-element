<!-- eslint-disable no-console -->
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

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'Name',
    onInput: (val: string) => {
      console.log(val, 'input event')
    },
    onChange: (val: string) => {
      console.log(val, 'change event')
    },
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
    onChange: (val: string) => {
      console.log(val, 'change event')
    },
    onFocus: () => {
      console.log('focus event')
    },
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date',
    fieldProps: {
      type: 'daterange',
      startPlaceholder: 'Start Date',
      endPlaceholder: 'End Date',
    },
    onChange: (val: string) => {
      console.log(val, 'change event')
    },
  },
]

function handleSearch() {
  console.log(formData.value, 'search')
}

function handleReset() {
  console.log(formData.value, 'reset')
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
