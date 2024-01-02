<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref([1])
const options = [
  {
    label: '标签一',
    value: 1,
    onClick: (option) => { console.log(option, 'click') },
    closable: true,
    onClose: (option) => { console.log(option, 'close') },
  },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 },
]

const handleChange = (val) => {
  console.log(val, 'change')
}
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
    @change="handleChange"
  />
</template>
