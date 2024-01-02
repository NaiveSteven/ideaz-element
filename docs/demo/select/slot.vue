<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = ref([])

const selectVal = ref()

const setHeader = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-search')))
}

const setEmpty = () => {
  return h('div', {}, '自定义内容')
}
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" :prefix="setHeader" :empty="setEmpty" />
    <z-select v-model="selectVal" :options="options" prefix="header" empty="自定义内容" class="mt-4" />
    <z-select v-model="selectVal" :options="options" class="mt-4">
      <template #prefix>
        <span>头部</span>
      </template>
      <template #empty>
        <span>自定义内容</span>
      </template>
    </z-select>
  </div>
</template>
