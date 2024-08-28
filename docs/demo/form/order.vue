<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'

const formRef = ref()
const formData = ref({
  name: '',
  gender: '',
  time: [],
})

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'el-input',
    field: 'name',
    label: '地址',
  },
  {
    component: ElInput,
    field: 'name',
    label: '姓名',
    order: 2,
  },
  {
    component: 'select',
    field: 'gender',
    label: '性别',
    order: 3,
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: '出生日期',
    order: 1,
  },
  {
    slot: 'button',
  },
]

function reset() {
  formRef.value.resetFields()
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid)
      console.log(formData.value, 'config.formData')

    else
      console.log('error')
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="small"
  >
    <template #button>
      <div class="w-full flex">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
