<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ValidateField } from '@ideaz/element'

const formRef = ref()
const form = ref({
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
      address: '',
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
        onInput: (val: string) => {
          console.log(val, 'input event')
        },
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
        required: true,
      },
    ],
  },
  {
    label: '文本2',
    field: 'b',
    extra: 'asdfsdf',
    tooltip: '提示',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: '性别',
        onChange: (val: string) => {
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
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
      },
      {
        slot: 'test',
        field: 'address',
        label: '地址',
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

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean, fields: ValidateField) => {
    console.log(form.value, fields, 'config.formData')
    if (valid)
      ElMessage.success('success')

    else
      console.log('error')
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="form"
    :options="options"
    :columns="columns"
    :max="3"
    label-width="80px"
    size="default"
    type="array"
  >
    <template #test="{ formData }">
      <el-input v-model="formData.address" />
    </template>
    <template #operate>
      <div class="w-full flex">
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
