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
    label: 'firstLabelSlot',
    description: 'firstDescSlot',
    children: [
      {
        component: 'input',
        field: 'name',
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
        required: true,
      },
      {
        component: 'el-date-picker',
        field: 'time',
        label: 'Date',
        fieldProps: {
          type: 'daterange',
          startPlaceholder: 'Start date',
          endPlaceholder: 'End date',
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
