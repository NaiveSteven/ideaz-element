<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const selectVal = ref(1)

const handleSelectChange = (val) => {
  console.log(val, 'handleSelectChange')
}
</script>

<template>
  <z-select v-model="selectVal" :options="options" @change="handleSelectChange" />
</template>
