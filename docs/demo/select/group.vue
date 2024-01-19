<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    label: '选项一',
    options: [
      { label: '选项一-1', value: 11 },
      { label: '选项一-2', value: 12 },
    ],
  },
  {
    label: '选项二',
    options: [
      { label: '选项二-1', value: 21 },
      { label: '选项二-2', value: 22 },
    ],
  },
  {
    label: '选项三',
    disabled: true,
    options: [
      { label: '选项三-1', value: 31 },
      { label: '选项三-2', value: 32 },
    ],
  },
])

const selectVal = ref(11)
</script>

<template>
  <z-select v-model="selectVal" :options="options" />
</template>
