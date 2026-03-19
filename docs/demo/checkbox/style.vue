<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, type: 'checkbox-button' },
])

const checkboxVal = ref([1])
</script>

<template>
  <z-checkbox v-model="checkboxVal" type="checkbox-button" :options="options" />
  <z-checkbox v-model="checkboxVal" :options="options" class="mt-4" />
</template>
