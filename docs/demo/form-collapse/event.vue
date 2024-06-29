<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeCollapse = ref(['文本', '标题'])
const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
})

const options = {
  gender: [
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
    label: '标题',
    children: [
      {
        component: 'select',
        field: 'gender',
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
        component: 'el-date-picker',
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

function handleCollapseChange(val: string) {
  console.log(val, 'val')
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
    @collapse-change="handleCollapseChange"
  >
    <template #operate>
      <div class="mt-4 w-full flex">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button class="w-full" type="primary" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
