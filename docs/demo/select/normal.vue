<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
])

const selectVal = ref(1)

const handleSelectChange = (val) => {
  console.log(val, 'handleSelectChange')
}
</script>

<template>
  <z-select v-model="selectVal" :options="options" @change="handleSelectChange" />
</template>
