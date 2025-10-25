<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    name: 'Steven',
    gender: '1',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    gender: '1',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    gender: '2',
    age: 18,
    time: '2018-01-01',
  },
  {
    name: 'Jack',
    gender: '1',
    age: 28,
    time: '2028-01-01',
  },
])
const formData = ref({})

const columns = ref([
  {
    prop: 'name',
    label: 'Name',
    form: {
      component: 'input',
      field: 'name',
    },
  },
  {
    prop: 'gender',
    label: 'Gender',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'time',
    label: 'Date of Birth',
  },
])

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:formData="formData"
    :columns="columns"
    :options="options"
    :action="false"
    watermark="watermark"
  />
</template>
