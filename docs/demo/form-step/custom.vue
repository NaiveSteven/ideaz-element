<script lang="ts" setup>
import { h, ref } from 'vue'

const activeStep = ref(0)
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
    label: 'firstLabelSlot',
    description: 'firstDescSlot',
    children: [
      {
        component: 'input',
        field: 'name',
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
        field: 'sex',
        label: '性别',
        required: true,
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
  >
    <template #firstLabelSlot>
      <span>custom label</span>
    </template>
    <template #firstDescSlot>
      <span>custom description</span>
    </template>
  </z-form>
</template>
