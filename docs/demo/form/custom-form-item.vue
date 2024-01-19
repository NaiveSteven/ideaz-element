<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    slot: 'sex',
    label: '性别',
  },
  {
    label: '年龄',
    render: () => h('span', {}, '年龄内容'),
  },
]
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :columns="columns"
    label-width="90px"
    size="small"
  >
    <template #sex>
      <z-select v-model="formData.sex" :options="options.sex" clearable filterable placeholder="请选择性别" />
    </template>
  </z-form>
</template>
