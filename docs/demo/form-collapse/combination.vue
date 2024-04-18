<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeCollapse = ref(['文本', '标题'])
const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  address: '',
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
    label: '文本',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
        required: true,
      },
    ],
  },
  {
    label: '标题',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: '性别',
      },
    ],
  },
  {
    component: 'input',
    field: 'address',
    label: '地址',
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
    slot: 'operate',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('成功')
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
    v-model:activeCollapse="activeCollapse"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="collapse"
  >
    <template #operate>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </template>
  </z-form>
</template>
