<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    label: 'Option 1',
    options: [
      { label: 'Option 1-1', value: 11 },
      { label: 'Option 1-2', value: 12 },
    ],
  },
  {
    label: 'Option 2',
    options: [
      { label: 'Option 2-1', value: 21 },
      { label: 'Option 2-2', value: 22 },
    ],
  },
  {
    label: 'Option 3',
    disabled: true,
    options: [
      { label: 'Option 3-1', value: 31 },
      { label: 'Option 3-2', value: 32 },
    ],
  },
])

const selectVal = ref(11)
</script>

<template>
  <z-select v-model="selectVal" :options="options" />
</template>
