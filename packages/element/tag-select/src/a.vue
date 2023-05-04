<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    options: OptionsItem[]
    multiple?: boolean
    modelValue: number[] | number
  }>(),
  {
    options: () => [],
    modelValue: 0,
    multiple: false,
  },
)

const emits = defineEmits(['update:modelValue', 'change'])

const activeTag = computed<number[] | number>({
  get() {
    return props.modelValue
  },
  set(val: number[] | number) {
    emits('update:modelValue', val)
  },
})

const isActive = (item: OptionsItem) => {
  if (props.multiple)
    return (activeTag.value as number[]).includes(item.value) ? 'dark' : 'light'

  return String(activeTag.value) === String(item.value) ? 'dark' : 'light'
}

const handleClick = (item: OptionsItem) => {
  const effect = isActive(item)
  if (props.multiple) {
    const actives = activeTag.value as number[]
    if (effect === 'dark') {
      const index = actives.indexOf(item.value)
      actives.splice(index, 0)
    }
    else {
      actives.push(item.value)
    }
  }
  else {
    if (effect === 'dark') {
      // activeTag.value = 0;
    }
    else {
      activeTag.value = item.value
      emits('change', item)
    }
  }
}
</script>

<template>
  <div>
        <template v-for="(item, index) in options" :key="item.value">
            <el-tag         :effect="isActive(item)"         :class="index === options.length - 1 ? '' : 'mr-2'"
        class="cursor-pointer" @click="() => handleClick(item)">
                {{ item.label }}
      </el-tag>
    </template>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-tag--light) {
  border: 1px solid transparent;
  color: #515a6e;
  background-color: #fff;
}
</style>
