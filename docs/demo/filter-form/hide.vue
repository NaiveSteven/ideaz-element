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
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'Name',
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
  },
  {
    slot: 'addressSlot',
    label: 'Address',
    field: 'address', // 传入field字段，隐藏时过滤
    hide: () => !formData.value.name
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date',
    hide: () => !formData.value.gender,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: 'Start Date',
      endPlaceholder: 'End Date',
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
      <el-input v-model="formData.address" placeholder="Please enter address" clearable />
    </template>
  </z-filter-form>
</template>
