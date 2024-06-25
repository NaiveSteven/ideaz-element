<!-- eslint-disable no-console -->
<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import { ref } from 'vue'

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
    label: '文本1',
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
    label: '文本2',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: '性别',
        extra: '性别选择',
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
  {
    slot: 'operate',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
      console.log(formData.value, 'config.formData')
    }
    else {
      console.log('error submit!!')
      return false
    }
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
    type="group"
  >
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
