<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  address: '',
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
    component: 'input',
    field: 'name',
    label: '姓名',
  },
  {
    component: 'select',
    field: 'gender',
    label: '性别',
  },
  {
    slot: 'addressSlot',
    label: '地址',
    field: 'address', // 传入field字段，隐藏时过滤
    hide: () => !formData.value.name
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: '出生日期',
    hide: () => !formData.value.gender,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
]

function handleSearch (data: any) {
  console.log(data)
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
    @search="handleSearch"
  >
    <template #addressSlot>
      <el-input v-model="formData.address" placeholder="请输入地址" clearable />
    </template>
  </z-filter-form>
</template>
