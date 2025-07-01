<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import { ElInput } from 'element-plus'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
}

// 生成大量测试数据
function generateLargeData(count: number): RowData[] {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['1', '2']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateLargeData(1000))

const columns = ref([
  {
    type: 'expand',
    width: 80,
  },
  {
    type: 'index',
    width: 80,
  },
  {
    type: 'radio',
    width: 80,
  },
  {
    type: 'selection',
    width: 80,
  },
  {
    component: 'input',
    prop: 'name',
    label: '姓名',
    width: 200,
    onChange: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, column, $index, val)
    },
    onInput: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('input event', row, column, $index, val)
    },
    fieldProps: {
      clearable: true,
    },
  },
  {
    component: 'select',
    prop: 'gender',
    label: '性别',
    width: 150,
    fieldProps: {
      clearable: true,
    },
    onChange: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, column, $index, val)
    },
  },
  {
    prop: 'age',
    label: '年龄',
    width: 150,
    component: markRaw(ElInput),
    fieldProps: {
      clearable: true,
    },
    onChange: ({ row, column, $index }: TableColumnScopeData<RowData>, val: string) => {
      console.log('change event', row, column, $index, val)
    },
    onInput: ({ row }: TableColumnScopeData<RowData>, val: string) => {
      console.log('input event', row, val)
    },
  },
  {
    prop: 'time',
    label: '出生日期',
    width: 200,
  },
])

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}
</script>

<template>
  <z-table
    v-model:data="tableData"
    :columns="columns"
    :options="options"
    :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
    height="500px"
  >
    <template #expand>
      <span>展开内容</span>
    </template>
  </z-table>
</template>
