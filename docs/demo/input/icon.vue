<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const val = ref('')
const value = ref('')

const setPrefixIcon = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-search')))
}

const setSuffixIcon = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-calendar')))
}
</script>

<template>
  <z-input v-model="val" clearable placeholder="请输入" prefix-icon="i-search" suffix-icon="i-calendar" class="mb-2" />
  <z-input v-model="value" clearable placeholder="请输入" :prefix="setPrefixIcon" :suffix="setSuffixIcon" class="mb-2" />
  <z-input v-model="value" clearable placeholder="请输入">
    <template #prefix>
      <el-icon>
        <i-search />
      </el-icon>
    </template>
    <template #suffix>
      <el-icon>
        <i-calendar />
      </el-icon>
    </template>
  </z-input>
</template>
