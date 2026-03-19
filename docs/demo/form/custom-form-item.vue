<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  age: '',
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
    required: true,
  },
  {
    slot: 'gender',
    field: 'gender',
    label: 'Gender',
  },
  {
    label: 'Age',
    render: () => h('span', {}, 'Age details'),
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
    <template #gender>
      <z-select v-model="formData.gender" :options="options.gender" clearable filterable placeholder="Please select a gender" />
    </template>
  </z-form>
</template>
