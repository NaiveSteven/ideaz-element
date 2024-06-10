<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput, ElMessage } from 'element-plus'

const activeCollapse = ref(['文本', '标题'])
const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  address: '',
  input: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    label: '文本',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
        required: true,
      },
    ],
  },
  {
    label: '标题',
    render: () => h('span', 'custom content'),
    children: [],
  },
  {
    label: '地址',
    slot: 'addressSlot',
  },
  {
    label: '输入框',
    slot: 'input',
    required: true,
    message: '请输入文案',
  },
  {
    slot: 'operate',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('成功')
      console.log(formData.value, 'config.formData')
    }
    else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    v-model:activeCollapse="activeCollapse"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="collapse"
  >
    <template #addressSlot>
      <div>自定义地址</div>
    </template>
    <template #input>
      <ElInput v-model="formData.input" />
    </template>
    <template #operate>
      <div class="mt-4 w-full flex">
        <el-button class="w-full" type="primary" @click="submit">
          提交
        </el-button>
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
      </div>
    </template>
  </z-form>
</template>
