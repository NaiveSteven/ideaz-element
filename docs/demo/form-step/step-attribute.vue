<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'

const activeStep = ref(0)
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
    label: 'Step 1',
    description: 'Description',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: 'Name',
        required: true,
      },
    ],
  },
  {
    label: () => h('span', {}, 'Step 2'),
    description: () => h('span', {}, 'Description'),
    children: [
      {
        component: 'select',
        field: 'gender',
        label: 'Gender',
      },
      {
        component: 'el-date-picker',
        field: 'time',
        label: 'Date of Birth',
        fieldProps: {
          type: 'daterange',
          startPlaceholder: 'Start date',
          endPlaceholder: 'End date',
        },
      },
    ],
  },
]

// function reset() {
//   formRef.value.resetFields()
// }

function submit() {
  console.log(formData.value, 'success')
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    v-model:activeStep="activeStep"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="step"
    process-status="error"
    finish-status="success"
    @submit="submit"
  />
</template>
