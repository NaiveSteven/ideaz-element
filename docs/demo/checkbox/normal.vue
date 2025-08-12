<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const checkboxVal = ref([1])

function click() {
  options.value.push({ label: '选项四', value: 4 })
}

function handleCheckboxChange(val: number[]) {
  console.log(val)
}
</script>

<template>
  <el-button @click="click">
    Click
  </el-button>
  <z-checkbox v-model="checkboxVal" :options="options" @change="handleCheckboxChange" />
</template>
