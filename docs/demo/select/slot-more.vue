<script lang="ts" setup>
import { ref } from 'vue'
import type { OptionsItem } from 'ideaz-element'

const options = ref([
  { label: '选项一', value: 1, render: ({ option }: { option: OptionsItem }) => h('span', `${option.label}${option.value}`) },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
])

const selectVal = ref()
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" class="mt-4">
      <template #header>
        <span>头部</span>
      </template>
      <template #footer>
        <span>自定义内容</span>
      </template>
      <template #label="{ label, value }">
        <span>{{ label }}: </span>
        <span style="font-weight: bold">{{ value }}</span>
      </template>
    </z-select>
  </div>
</template>
