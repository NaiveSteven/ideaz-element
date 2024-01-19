<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = [
  {
    title: () => h(resolveComponent('el-tag'), { }, () => 'Tag 1'),
    description: '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念',
    value: 'A',
  },
  {
    title: '标题内容过长会自动进行省略，标题内容过长会自动进行省略',
    description: '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念',
    value: 'B',
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
