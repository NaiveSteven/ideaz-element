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

const columns = ref([
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
    component: 'input',
    prop: 'age',
    label: 'Age',
  },
  {
    component: 'el-date-picker',
    prop: 'time',
    label: 'Date of Birth',
    fieldProps: {
      valueFormat: 'YYYY-MM-DD',
    },
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
  <z-table
    :data="tableData"
    :columns="columns"
    :options="options"
    watermark="Table watermark"
  />
</template>
