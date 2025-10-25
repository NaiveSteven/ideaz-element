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
    label: 'Name',
    hide: () => isHide.value,
  },
  {
    prop: 'gender',
    label: 'Gender',
    hide: true,
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

function changeVisible() {
  isHide.value = !isHide.value
}
</script>

<template>
  <el-button @click="changeVisible">
    Toggle column visibility
  </el-button>
  <z-crud
    v-model:data="tableData"
    :columns="columns"
    :action="false"
  />
</template>
