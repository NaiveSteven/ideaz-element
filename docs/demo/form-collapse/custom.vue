<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput, ElMessage } from 'element-plus'

const activeCollapse = ref(['Text', 'Title'])
const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  address: '',
  input: '',
  time: [],
})

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    label: 'Text',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: 'Name',
        required: true,
      },
    ],
  },
  {
    label: 'Title',
    render: () => h('span', 'custom content'),
    children: [],
  },
  {
    label: 'Address',
    slot: 'addressSlot',
  },
  {
    label: 'Input',
    slot: 'input',
    required: true,
    message: 'Please enter text',
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
      ElMessage.success('Success')
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
      <div>Custom address</div>
    </template>
    <template #input>
      <ElInput v-model="formData.input" />
    </template>
    <template #operate>
      <div class="mt-4 w-full flex">
        <el-button class="w-full" @click="reset">
          Reset
        </el-button>
        <el-button class="w-full" type="primary" @click="submit">
          Submit
        </el-button>
      </div>
    </template>
  </z-form>
</template>
