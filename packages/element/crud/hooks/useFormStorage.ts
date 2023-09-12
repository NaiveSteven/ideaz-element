import { cloneDeep } from 'lodash-unified'
import { isObject } from '@ideaz/utils'
import type { CrudProps } from '../src/props'

export const useFormStorage = (props: CrudProps, emit: any) => {
  const originFormData = ref(cloneDeep(props.formData || {}))

  const middleFormData = computed({
    get() {
      return props.formData
    },
    set(val) {
      emit('update:formData', val)
    },
  })

  const isUseFormDataStorage = computed(() => {
    return props.name && props.formStorage !== false
  })

  onMounted(() => {
    if (isObject(props.formData) && window.sessionStorage.getItem('zCrudFormData') && JSON.parse(window.sessionStorage.getItem('zCrudFormData')!)[props.name])
      emit('update:formData', (JSON.parse(window.sessionStorage.getItem('zCrudFormData')!)[props.name]))
  })

  // console.log('sadf')

  // watch(
  //   () => middleFormData.value,
  //   () => {
  //     if (isObject(props.formData) && isUseFormDataStorage.value) {
  //       const formData: any = {}
  //       Object.keys(props.formData).forEach((key) => {
  //         formData[key] = middleFormData.value[key]
  //       })
  //       emit('update:formData', formData)
  //     }
  //   },
  //   { deep: true, immediate: true },
  // )

  // watch(
  //   () => props.formData,
  //   () => {
  //     if (isObject(props.formData) && isUseFormDataStorage.value) {
  //       Object.keys(props.formData).forEach((key) => {
  //         middleFormData.value[key] = props.formData[key]
  //       })
  //     }
  //   },
  //   { deep: true },
  // )

  return { middleFormData, originFormData, isUseFormDataStorage }
}
