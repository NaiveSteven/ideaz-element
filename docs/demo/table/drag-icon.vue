<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

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
    type: 'sort',
    label: '排序',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'time',
    label: '出生日期',
  },
])

function handleSortEnd(data: RowData[]) {
  console.log(data, 'data')
}
</script>

<template>
  <z-table
    :data="tableData"
    :columns="columns"
    :draggable="true"
    @drag-sort-end="handleSortEnd"
  >
    <template #sort>
      <el-icon size="16" class="cursor-pointer">
        <i-setting />
      </el-icon>
    </template>
  </z-table>
</template>
