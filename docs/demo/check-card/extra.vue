<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    title: 'Example',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    description: 'Choose a typical user case provided by workflow orchestration to learn many design concepts.',
    value: 'A',
    extra: () => h(
      'div',
      {},
      h('a', { onClick: e => console.log('View details') }, 'View details'),
    ),
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
