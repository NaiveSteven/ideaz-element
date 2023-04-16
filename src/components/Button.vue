<template>
  <button :class="['xl-button', type ? 'xl-button--' + type : '']">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "XlButton",
  props: {
    type: { type: String, default: 'default' }
  }
}
</script>

<style scoped>

</style>
