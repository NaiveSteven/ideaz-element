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
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
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
    :collapsed="false"
  />
</template>
