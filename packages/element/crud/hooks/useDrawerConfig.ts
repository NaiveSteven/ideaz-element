import type { CrudProps } from '../src/props'

export const useDrawerConfig = (props: CrudProps) => {
  const drawerProps = computed(() => {
    return {
      title: '查看',
      size: 520,
      ...props.drawer,
    }
  })

  return { drawerProps }
}
