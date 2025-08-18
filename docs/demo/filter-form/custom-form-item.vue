<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: 'Jack',
  age: '',
  height: 'Custom Height',
})

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'Name',
  },
  {
    slot: 'ageSlot',
    label: 'Age',
    hide: () => !formData.value.name
  },
  {
    render: () => h('span', {}, formData.value.height),
    label: 'Height',
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
      <el-input v-model="formData.age" placeholder="Please enter age" clearable />
    </template>
  </z-filter-form>
</template>
