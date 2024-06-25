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
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    label: '第一步',
    description: '描述内容',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
        required: true,
      },
    ],
  },
  {
    label: () => h('span', {}, '第二部'),
    description: () => h('span', {}, '描述内容'),
    children: [
      {
        component: 'select',
        field: 'gender',
        label: '性别',
      },
      {
        component: 'el-date-picker',
        field: 'time',
        label: '出生日期',
        fieldProps: {
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
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
