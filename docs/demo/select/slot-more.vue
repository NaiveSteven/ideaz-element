<script lang="ts" setup>
import { ref } from 'vue'
import type { OptionsItem } from 'ideaz-element'

const options = ref([
  { label: 'Option 1', value: 1, render: ({ option }: { option: OptionsItem }) => h('span', `${option.label}${option.value}`) },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const selectVal = ref()
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" class="mt-4">
      <template #header>
        <span>Header</span>
      </template>
      <template #footer>
        <span>Custom Content</span>
      </template>
      <template #label="{ label, value }">
        <span>{{ label }}: </span>
        <span style="font-weight: bold">{{ value }}</span>
      </template>
    </z-select>
  </div>
</template>
