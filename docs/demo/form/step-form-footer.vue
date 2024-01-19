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
    label: '第一步',
    description: '描述内容',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
        onInput: (val) => {
          console.log(val, 'input event')
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
        required: true,
        error: '姓名必填',
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
        onChange: (val) => {
          console.log(val, 'change event')
        },
        onFocus: () => {
          console.log('focus event')
        },
        required: true,
      },
      {
        component: 'datepicker',
        field: 'time',
        label: '出生日期',
        fieldProps: {
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
      },
    ],
  },
]

const handlePrevious = () => {
  activeStep.value--
}

const handleNext = () => {
  formRef.value.validate((val) => {
    if (val) activeStep.value++
  })
}

const submit = () => {
  formRef.value.validate((val) => {
    if (val) {
      alert('success')
      console.log(formData.value, 'success')
    }
  })
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
  >
    <template #footer>
      <el-button :disabled="activeStep === 0" @click="handlePrevious">
        上一步
      </el-button>
      <el-button :disabled="activeStep === 1" @click="handleNext">
        下一步
      </el-button>
      <el-button v-if="activeStep === 1" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
