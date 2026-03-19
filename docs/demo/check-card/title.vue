<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = [
  {
    title: () => h(resolveComponent('el-tag'), { }, () => 'Tag 1'),
    description: 'Choose a typical user case provided by workflow orchestration to learn many design concepts',
    value: 'A',
  },
  {
    title: 'Long title content will be automatically truncated; long title content will be automatically truncated',
    description: 'Choose a typical user case provided by workflow orchestration to learn many design concepts',
    value: 'B',
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
