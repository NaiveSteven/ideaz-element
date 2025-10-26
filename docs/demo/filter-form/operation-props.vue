<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
})
const searchButtonLoading = ref(false)
const resetButtonLoading = ref(false)

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
    required: true,
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
    required: true,
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date',
    required: true,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: 'Start Date',
      endPlaceholder: 'End Date',
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
    search-button-label="Search"
    reset-button-label="Reset"
    :search-button-loading="searchButtonLoading"
    :reset-button-loading="resetButtonLoading"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
