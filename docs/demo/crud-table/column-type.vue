<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: 'Steven',
    gender: '1',
    age: 22,
    time: '2020-01-01',
  },
  {
    id: 2,
    name: 'Helen',
    gender: '1',
    age: 12,
    time: '2012-01-01',
  },
  {
    id: 3,
    name: 'Nancy',
    gender: '2',
    age: 18,
    time: '2018-01-01',
  },
  {
    id: 4,
    name: 'Jack',
    gender: '1',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    type: 'sort',
  },
  {
    type: 'expand',
  },
  {
    type: 'index',
  },
  {
    type: 'radio',
  },
  {
    type: 'selection',
    reserveSelection: true,
  },
  {
    component: 'input',
    prop: 'name',
    label: 'Name',
  },
  {
    component: 'select',
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
    :columns="columns"
    :options="options"
    :action="false"
    row-key="id"
  >
    <template #expand>
      <span>Expanded content</span>
    </template>
  </z-crud>
</template>
