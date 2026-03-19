<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref([1])
const options = [
  {
    label: 'Tag 1',
    value: 1,
    onClick: (option) => { console.log(option, 'click') },
    closable: true,
    onClose: (option) => { console.log(option, 'close') },
  },
  { label: 'Tag 2', value: 2 },
  { label: 'Tag 3', value: 3 },
  { label: 'Tag 4', value: 4 },
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
