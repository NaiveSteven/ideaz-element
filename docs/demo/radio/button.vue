<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3, type: 'radio-button' },
])

const radioVal = ref(1)
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="radioVal" type="radio-button" :options="options" />
    <z-radio v-model="radioVal" :options="options" class="mt-4" />
  </div>
</template>
