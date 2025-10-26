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
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
}

const columns = [
  {
    component: 'el-input',
    field: 'name',
    label: 'Address',
  },
  {
    component: ElInput,
    field: 'name',
    label: 'Name',
    order: 2,
  },
  {
    component: 'select',
    field: 'gender',
    label: 'Gender',
    order: 3,
  },
  {
    component: 'el-date-picker',
    field: 'time',
    label: 'Date',
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
          Reset
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          Submit
        </el-button>
      </div>
    </template>
  </z-form>
</template>
