<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = [
  {
    title: '标题',
    avatar: () => h(resolveComponent('el-avatar'), { icon: 'i-user-filled' }),
    value: 'A',
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
