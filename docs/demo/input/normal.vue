<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('')

function handleInputChange(val: string) {
  // eslint-disable-next-line no-console
  console.log(val)
}
</script>

<template>
  <z-input v-model="val" clearable placeholder="请输入" @change="handleInputChange" />
</template>
