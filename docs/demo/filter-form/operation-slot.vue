<!-- eslint-disable no-console -->
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
    label: 'Date of Birth',
    required: true,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: 'Start Date',
      endPlaceholder: 'End Date',
    },
  },
]

function handleSearch() {
  formRef.value.validate((val: string) => {
    if (val)
      console.log(formData.value, 'formData')
  })
}

function handleReset() {
  formRef.value.resetFields()
}

function renderOperation() {
  return h('span', {}, 'Search')
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
  >
    <template #formOperation>
      <el-button type="primary" @click="handleSearch">
        Search
      </el-button>
      <el-button type="warning" @click="handleReset">
        Reset
      </el-button>
    </template>
  </z-filter-form>

  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    :render-operation="renderOperation"
  />
</template>
