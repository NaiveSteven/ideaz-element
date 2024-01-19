<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    title: '默认描述区域不会进行折行',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    value: 'A',
    description: () => h(
      'div',
      {},
      h(
        'span',
        {},
        '选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。',
        h('a', { onClick: e => e.stopPropagation() }, '查看详情'),
      ),
    ),
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
