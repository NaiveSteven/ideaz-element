<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
])

const checkboxVal = ref([1])

const click = () => {
  options.value.push({ label: '选项四', value: 4 })
}
</script>

<template>
  <el-button @click="click">
    点击
  </el-button>
  <z-checkbox v-model="checkboxVal" :options="options" />
</template>
