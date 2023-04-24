<script lang="ts" setup>
// import JsonEditorVue from '../../src'

// const data = reactive({
//   value: undefined,
//   mode: undefined,
//   readOnly: false,
// })

// const jsonEditorVueRef = ref()
// onMounted(() => {
//   console.log('expand: ', jsonEditorVueRef.value.jsonEditor.expand)
// })
const checkbox = ref([1]);

const val = ref('');

const handleChange = (val: any) => {
  console.log(val, 'val');
};
</script>

<template>
  <div>
    vue2.7
    <ZInput v-model="val" :prepend="() => 'asdf'" />
    <ZCheckbox
      v-model="checkbox"
      style="width: 300px"
      class="my-checkbox"
      size="small"
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
