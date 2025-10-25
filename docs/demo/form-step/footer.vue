<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

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
    label: 'Step 2',
    description: 'Description',
    children: [
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
        required: true,
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
        onChange: (val: string[]) => {
          console.log(val, 'change event')
        },
      },
    ],
  },
]

function handlePrevious() {
  activeStep.value--
}

function handleNext() {
  formRef.value.validate((val: boolean) => {
    if (val)
      activeStep.value++
  })
}

function submit() {
  formRef.value.validate((val: boolean) => {
    if (val) {
      ElMessage.success('success')
      console.log(formData.value, 'success')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef" v-model="formData" v-model:activeStep="activeStep" :options="options" :columns="columns"
    label-width="80px" size="default" type="step"
  >
    <template #footer>
      <el-button :disabled="activeStep === 0" @click="handlePrevious">
        Previous
      </el-button>
      <el-button :disabled="activeStep === 1" @click="handleNext">
        Next
      </el-button>
      <el-button v-if="activeStep === 1" @click="submit">
        Submit
      </el-button>
    </template>
  </z-form>
</template>
