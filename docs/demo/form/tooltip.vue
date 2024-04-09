<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
    tooltip: '这是姓名',
    extra: 'extraSlot',
    required: true,
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
    colon: false,
    tooltip: () => h('span', {}, '性别提示'),
    // extra: () => h('span', {}, '性别额外信息'),
  },
  {
    component: 'input',
    label: '年龄',
    field: 'age',
    formItemProps: {
      tooltip: '这是年龄',
      extra: () => h('span', {}, '这是额外信息'),
      colon: false,
    },
  },
  {
    slot: 'button',
  },
]

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
    :column="2"
    colon
  >
    <template #extraSlot>
      <span>提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示提示</span>
    </template>
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
