<script lang="ts" setup>
import { h, ref } from 'vue'

const activeCollapse = ref('bbb')
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
    label: 'aaa',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: '性别',
        md: 12,
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
        md: 12,
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

const handleCollapseChange = (val: string) => {
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
    accordion
    @collapse-change="handleCollapseChange"
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
