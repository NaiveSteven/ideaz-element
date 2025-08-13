<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, type: 'radio-button' },
])

const radioVal = ref(1)
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="radioVal" type="radio-button" :options="options" />
    <z-radio v-model="radioVal" :options="options" class="mt-4" />
  </div>
</template>
