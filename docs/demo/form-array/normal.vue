<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const formData = ref([{
  name: '',
  sex: '',
  time: [],
}])

const options = {
  sex: [
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
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
    required: true,
  },
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
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
    if (valid)
      ElMessage.success('提交成功')

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
