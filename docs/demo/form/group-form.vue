<script lang="ts" setup>
import { h, ref } from 'vue'

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
    borderStyle: 'dashed',
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
        rules: {
          required: true,
        },
      },
    ],
  },
  {
    label: () => h('span', '文本2'),
    contentPosition: 'center',
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
    slot: 'operate',
  },
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
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
    content-position="left"
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
