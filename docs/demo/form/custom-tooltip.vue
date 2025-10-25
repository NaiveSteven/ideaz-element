<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  age: '',
})

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'Name',
    tooltip: {
      reference: () => h('span', {}, '?'),
      content: 'Name hint',
    },
    extra: 'extraSlot',
    required: true,
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
    colon: false,
    tooltip: () => h('span', {}, 'Gender hint'),
    required: true,
  },
  {
    component: 'input',
    label: 'Age',
    field: 'age',
    formItemProps: {
      tooltip: {
        reference: 'tooltipSlot',
        content: () => h('span', {}, 'Custom age hint'),
      },
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
    <template #tooltipSlot>
      <el-icon class="cursor-pointer">
        <i-delete />
      </el-icon>
    </template>
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        Submit
      </el-button>
    </template>
  </z-form>
</template>
