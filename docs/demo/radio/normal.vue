<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const radioVal = ref(1)

function handleRadioChange(val: number) {
  console.log('radio change:', val)
}
</script>

<template>
  <z-radio v-model="radioVal" :options="options" @change="handleRadioChange" />
</template>
