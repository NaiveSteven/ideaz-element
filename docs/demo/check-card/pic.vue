<script lang="ts" setup>
import { h, ref } from 'vue'

const options = [
  {
    value: '1',
    cover: () => h('img', {
      alt: 'example',
      src: 'https://gw.alipayobjects.com/mdn/rms_66ee3f/afts/img/A*FyH5TY53zSwAAAAAAAAAAABkARQnAQ',
    }),
  },
]

const val = ref('')
</script>

<template>
  <z-check-card v-model="val" :options="options" />
</template>
