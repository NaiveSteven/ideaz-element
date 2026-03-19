<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1, border: true },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" :options="options" />
  <z-checkbox v-model="checkboxVal" :border="true" :options="options" class="mt-4" />
</template>
