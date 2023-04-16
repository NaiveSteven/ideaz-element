<!-- <demo> -->
<!-- 示例代码 -->
<!-- </demo> -->
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputDemo',
  setup() {
    const input = ref();
    const content = ref();

    function onSubmit() {
      content.value = input.value;
    }

    return { input, content, onSubmit };
  },
});
</script>

<template>
  <input v-model="input" class="input" type="text" >
  <xl-button type="primary" @click="onSubmit">提交</xl-button>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>

<style>
.input {
  margin-right: 16px;
  padding: 14px;
  width: 300px;
  font-size: 16px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}
</style>
