<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    title: '示例',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    description: '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。',
    value: 'A',
    extra: () => h(
      'div',
      {},
      h('a', { onClick: e => console.log('查看详情') }, '查看详情'),
    ),
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
