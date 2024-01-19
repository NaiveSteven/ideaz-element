<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  time: [],
  a: [
    {
      name: '',
      sex: '',
      time: [],
    },
  ],
  b: [
    {
      name: '',
      sex: '',
      time: [],
    },
  ],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    label: '文本1',
    field: 'a',
    max: 2,
    children: [
      {
        component: 'input',
        field: 'name',
        label: '姓名',
        onInput: (val) => {
          console.log(val, 'input event')
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
        required: true,
      },
    ],
  },
  {
    label: '文本2',
    field: 'b',
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
        rules: {
          required: true,
        },
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
  {
    label: 'input',
    component: 'input',
    field: 'input',
  },
  {
    slot: 'operate',
  },
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
    if (valid)
      alert('success')

    else
      console.log('error')
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :max="3"
    label-width="80px"
    size="default"
    type="array"
  >
    <template #operate>
      <div class="flex w-full">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
