import { cloneDeep } from 'lodash-unified'
import { isObject } from '@ideaz/utils'
import type { CrudProps } from '../props'

export function useFormStorage(mergedProps: ComputedRef<CrudProps>, emit: any) {
  const originFormData = ref(cloneDeep(mergedProps.value.formData || {}))

  const middleFormData = computed({
    get() {
      return mergedProps.value.formData
    },
    set(val) {
      emit('update:formData', val)
    },
  })

  const isUseFormDataStorage = computed(() => {
    return mergedProps.value.name && mergedProps.value.formStorage !== false
  })

  onMounted(() => {
    if (isObject(mergedProps.value.formData) && window.sessionStorage.getItem('zCrudFormData') && JSON.parse(window.sessionStorage.getItem('zCrudFormData')!)[mergedProps.value.name])
      emit('update:formData', (JSON.parse(window.sessionStorage.getItem('zCrudFormData')!)[mergedProps.value.name]))
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
