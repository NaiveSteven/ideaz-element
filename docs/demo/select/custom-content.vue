<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    label: '选项一',
    value: 1,
    render: (h, { option }) => {
      return h('span', {}, `自定义${option.value}`)
    },
  },
  {
    label: '选项二',
    value: 2,
    render: 'optionSlot',
  },
  { label: '选项三', value: 3 },
])

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :options="options">
    <template #optionSlot="{ option }">
      <span>自定义{{ option.label }}</span>
    </template>
  </z-select>
</template>
