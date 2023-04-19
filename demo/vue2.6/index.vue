<script lang="ts" setup>
import VueCompositionAPI from '@vue/composition-api';
// export default {
//   components: { ZCheckbox },
//   data() {
//     return {
//       checkboxVal: [1],
//     };
//   },
//   methods: {
//     handleChange(val) {
//       console.log(val, 'val');
//     },
//   },
// };

Vue.use(VueCompositionAPI);

const checkbox = ref([1]);

const handleChange = (val: string[] | number[]) => {
  console.log(val, 'val');
};
</script>

<template>
  <div>
    vue2.6
    <!-- <AA /> -->
    <ZCheckbox
      v-model="checkbox"
      style="width: 300px"
      class="my-checkbox"
      :options="[
        {
          label: '1',
          value: 1,
          class: 'my-checkbox-test',
          id: 'my-checkbox-id',
        },
        { label: '2', value: 2 },
      ]"
      @change="handleChange"
    />
    <el-checkbox id="test-id" class="test-class">asd</el-checkbox>
    <el-button>asdfsadf</el-button>
    <!-- <p>
      <button @click="data.value = '123'">
        设值为 string
      </button>
      <button @click="data.value = { abc: '123' }">
        设值为 JSON
      </button>
      <button @click="data.value = undefined">
        清空
      </button>
      <button @click="data.mode = data.mode === 'text' ? 'tree' : 'text'">
        切换模式
      </button>
      <button @click="data.readOnly = !data.readOnly">
        切换只读状态
      </button>
    </p>

    <br>
    <JsonEditorVue ref="jsonEditorVueRef" v-model="data.value" :mode.sync="data.mode"
      :readOnly="data.readOnly" />

    <br>
    <p>Mode</p>
    {{ data.mode }}
    <p>Value</p>
    {{ data.value }}
    <p>Type</p>
    {{ typeof data.value }} -->
  </div>
</template>
