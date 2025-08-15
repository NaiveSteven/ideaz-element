<script lang="ts" setup>
import { ref } from 'vue'
import type { OptionsItem } from 'ideaz-element'

const options = ref([
  {
    label: 'Option 1',
    value: 1,
    render: ({ option }: OptionsItem) => {
      return h('span', {}, `Custom ${option.value}`)
    },
  },
  {
    label: 'Option 2',
    value: 2,
    render: 'optionSlot',
  },
  { label: 'Option 3', value: 3 },
])

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :options="options">
    <template #optionSlot="{ option }">
      <span>Custom {{ option.label }}</span>
    </template>
  </z-select>
</template>
