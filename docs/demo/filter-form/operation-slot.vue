<!-- eslint-disable no-console -->
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
    component: 'input',
    field: 'name',
    label: '姓名',
    required: true,
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
    required: true,
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: '出生日期',
    required: true,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
]

function handleSearch() {
  formRef.value.validate((val: string) => {
    if (val)
      console.log(formData.value, 'formData')
  })
}

function handleReset() {
  formRef.value.resetFields()
}

function renderOperation() {
  return h('span', {}, '查询')
}
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #formOperation>
      <el-button type="primary" @click="handleSearch">
        搜索
      </el-button>
      <el-button type="warning" @click="handleReset">
        重置
      </el-button>
    </template>
  </z-filter-form>

  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    :render-operation="renderOperation"
  />
</template>
