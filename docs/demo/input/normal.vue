<script lang="ts" setup>
import { ref } from 'vue'

const val = ref('')
</script>

<template>
  <z-input v-model="val" clearable placeholder="请输入" />
</template>
