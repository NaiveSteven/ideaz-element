<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeCollapse = ref(['bbb', 'labelSlot'])
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
    label: () => h('span', {}, '文本a'),
    key: 'bbb',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
        onInput: (val: string) => {
          console.log(val, 'input event')
        },
        onChange: (val: string) => {
          console.log(val, 'change event')
        },
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    label: 'labelSlot',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: '性别',
        md: 12,
        onChange: (val: string) => {
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
        md: 12,
        fieldProps: {
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
        },
        onChange: (val: string) => {
          console.log(val, 'change event')
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
    <template #labelSlot>
      <span>label自定义</span>
    </template>
    <template #operate>
      <div class="mt-4 w-full flex">
        <el-button class="w-full" type="primary" @click="submit">
          提交
        </el-button>
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
      </div>
    </template>
  </z-form>
</template>
