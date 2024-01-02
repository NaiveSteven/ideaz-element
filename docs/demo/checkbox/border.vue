<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1, border: true },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" :options="options" />
  <z-checkbox v-model="checkboxVal" :border="true" :options="options" class="mt-4" />
</template>
