<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    title: 'The default description area will not wrap',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    value: 'A',
    description: () => h(
      'div',
      {},
      h(
        'span',
        {},
        'Choose a typical user case provided by workflow orchestration to learn many design concepts.',
        h('a', { onClick: e => e.stopPropagation() }, 'View details'),
      ),
    ),
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
