<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const val = ref('')
const value = ref('')

const setAppend = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-search')))
}

const setPrepend = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-calendar')))
}
</script>

<template>
  <z-input v-model="val" clearable placeholder="请输入" prepend="Http://" append=".com" class="mb-2" />
  <z-input v-model="value" clearable placeholder="请输入" :append="setAppend" :prepend="setPrepend" class="mb-2" />
  <z-input v-model="value" clearable placeholder="请输入">
    <template #append>
      <span>.com</span>
    </template>
    <template #prepend>
      <span>Http://</span>
    </template>
  </z-input>
</template>
