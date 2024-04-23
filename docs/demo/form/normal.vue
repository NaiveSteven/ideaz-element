<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'

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
    component: ElInput,
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
    onChange: (val: string[]) => {
      console.log(val, 'change event')
    },
  },
  {
    slot: 'button',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid)
      console.log(formData.value, 'config.formData')

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
  >
    <template #button>
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
