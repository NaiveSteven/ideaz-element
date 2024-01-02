<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  age: '',
  height: '身高自定义',
})

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
  },
  {
    slot: 'ageSlot',
    label: '年龄',
  },
  {
    render: () => h('span', {}, formData.value.height),
    label: '身高',
  },
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #ageSlot>
      <el-input v-model="formData.age" placeholder="请输入年龄" clearable />
    </template>
  </z-filter-form>
</template>
