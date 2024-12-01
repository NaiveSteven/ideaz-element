<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ValidateField } from 'ideaz-element'

const formRef = ref()
const formData = ref([{
  name: '',
  gender: '',
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
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean, fields: ValidateField) => {
    console.log(formData.value, fields, 'config.formData')
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
    v-model="formData"
    :options="options"
    :columns="columns"
    :min="1"
    label-width="80px"
    size="small"
    type="array"
  />
  <div class="mt-4 w-full flex">
    <el-button class="w-full" @click="reset">
      重置
    </el-button>
    <el-button type="primary" class="w-full" @click="submit">
      提交
    </el-button>
  </div>
</template>
