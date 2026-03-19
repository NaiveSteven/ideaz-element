<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = ref([])

const selectVal = ref()

const setHeader = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-search')))
}

const setEmpty = () => {
  return h('div', {}, 'Custom Content')
}
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" :prefix="setHeader" :empty="setEmpty" />
    <z-select v-model="selectVal" :options="options" prefix="header" empty="Custom Content" class="mt-4" />
    <z-select v-model="selectVal" :options="options" class="mt-4">
      <template #prefix>
        <span>Header</span>
      </template>
      <template #empty>
        <span>Custom Content</span>
      </template>
    </z-select>
  </div>
</template>
