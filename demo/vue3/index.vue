<script setup lang="ts">
// import { parse, stringify } from 'lossless-json'
// import JsonEditorVue from '../../src'
// import type { Mode } from '../../src'

// const console = window.console
// console.log('111')

// const LosslessJSONParser = {
//   parse, /* : (json) => {    return JSON.parse(json, (k, v, { source }) =>
//       (typeof source === 'number' && source > Number.MAX_SAFE_INTEGER)
//         ? BigInt(source)
//         : val,
//     )
//   } */
//   stringify,
// }

// const data = reactive<{
//   value: any
//   mode?: Mode
//   readOnly?: boolean
//   parser?: { parse: Function; stringify: Function }
// }>({
//   value: undefined,
//   mode: undefined,
//   readOnly: false,
//   parser: LosslessJSONParser,
// })

// const jsonEditorVueRef = ref()
// onMounted(() => {
//   console.log('expand: ', jsonEditorVueRef.value.jsonEditor.expand)
// })

const checkbox = ref([1])
const val = ref('123')

const handleChange = (val: any) => {
  console.log(val, 'val')
}
</script>

<template>
  <div>
    vue3sf
    <ZInput v-model="val" :prepend="() => 'asdf'" append="asdf" clearable @clear="handleChange" @change="handleChange" />
    <ZCheckbox v-model="checkbox" style="width: 300px" class="my-checkbox" size="small" :options="[
      {
        label: '1',
        value: 1,
        class: 'my-checkbox-test',
        id: 'my-checkbox-id',
      },
      { label: '2', value: 2 },
    ]" @change="handleChange" />
    <el-checkbox id="test-id" class="test-class">
      asd
    </el-checkbox>
    <el-button>asdfsadf</el-button>
    <el-card style="width: 640px">
      <z-text type="primary">
        aaaaaaaaaaaaaaaaaaaaaaaa啊手动阀手动阀手动阀手动阀手动阀手动阀aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </z-text>
    </el-card>
    <!-- <p>
      <button @click="data.value = '123'">
        设值为 string
      </button>
      <button @click="data.value = { abc: 124124124124124124124n }">
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
    <JsonEditorVue
      ref="jsonEditorVueRef" v-model="data.value" v-model:mode="data.mode"
      :readOnly="data.readOnly" :parser="data.parser"
    />

    <br>
    <p>Mode</p>
    {{ data.mode }}
    <p>Value</p>
    {{ LosslessJSONParser.stringify(data.value) }}
    <p>Type</p>
    {{ typeof data.value }} -->
  </div>
</template>

<style>
body {
  line-height: 1.5;
}
</style>
