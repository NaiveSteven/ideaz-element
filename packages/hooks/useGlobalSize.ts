export function useGlobalSize() {
  const injectedSize = inject('size', {})

  return computed<any>(() => {
    return unref(injectedSize.size) || ''
  })
}
