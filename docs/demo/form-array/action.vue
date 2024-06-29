<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ValidateField } from 'ideaz-element'

interface FormData {
  name: string
  gender: string
  address: string
  time: string[]
}

const formRef = ref()
const form = ref<FormData[]>([{
  name: '',
  gender: '',
  address: '',
  time: [],
}])

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    modifier: 'trim',
    label: '姓名',
    required: true,
  },
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
  {
    slot: 'address',
    label: '地址',
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

function handleAdd() {
  form.value.push({})
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="form"
    :options="options"
    :columns="columns"
    :action="false"
    label-width="80px"
    size="small"
    type="array"
  >
    <template #address="{ formData }">
      <el-input v-model="formData.address" />
    </template>
  </z-form>
  <el-button class="mt-1 w-full" type="warning" @click="handleAdd">
    添加
  </el-button>
  <div class="mt-4 w-full flex">
    <el-button class="w-full" @click="reset">
      重置
    </el-button>
    <el-button type="primary" class="w-full" @click="submit">
      提交
    </el-button>
  </div>
</template>
