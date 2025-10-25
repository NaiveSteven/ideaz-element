<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
}

const tableData = ref<RowData[]>([
  {
    name: 'Steven',
    gender: 'male',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    gender: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    gender: 'female',
    age: 18,
    time: '2018-01-01',
  },
  {
    name: 'Jack',
    gender: 'male',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    prop: 'name',
    label: 'Name',
    render: ({ row }: TableColumnScopeData<RowData>) => h('span', row.name),
  },
  {
    prop: 'gender',
    label: 'Gender',
    slot: 'gender',
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
</script>

<template>
  <z-table
    :data="tableData"
    :columns="columns"
  >
    <template #gender="{ row }">
      <el-input :model-value="row.gender" />
    </template>
  </z-table>
</template>
