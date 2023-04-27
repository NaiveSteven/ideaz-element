export const useWindowReactiveSize = () => {
  const width = ref(0);

  const windowReactiveSize = computed(() => {
    if (width.value >= 1920) {
      return 'xl';
    }
    if (width.value >= 1200) {
      return 'lg';
    }
    if (width.value >= 992) {
      return 'md';
    }
    if (width.value >= 768) {
      return 'sm';
    }
    if (width.value < 768) {
      return 'xs';
    }
    return 'xs';
  });

  const update = () => {
    if (window) {
      width.value = window.innerWidth;
    }
  };

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });

  return { windowReactiveSize };
};
