<script lang="ts" setup>
import { ref } from 'vue'

const isHide = ref(false)
const tableData = ref([
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
    label: '姓名',
    hide: () => isHide.value,
  },
  {
    prop: 'gender',
    label: '性别',
    hide: true,
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

function changeVisible() {
  isHide.value = !isHide.value
}
</script>

<template>
  <el-button @click="changeVisible">
    点击修改列显隐
  </el-button>
  <z-table
    :data="tableData"
    :columns="columns"
  />
</template>
