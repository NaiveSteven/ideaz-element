export const vueRef = {
  bind(el: any, binding: any, vnode: any) {
    binding.value(vnode.componentInstance || el, vnode.key);
  },
  update(el: any, binding: any, vnode: any, oldVnode: any) {
    if (oldVnode.data && oldVnode.data.directives) {
      const oldBinding = oldVnode.data.directives.find(function (
        directive: any
      ) {
        const name = directive.name;
        return name === 'ref';
      });
      if (oldBinding && oldBinding.value !== binding.value) {
        oldBinding && oldBinding.value(null, oldVnode.key);
        binding.value(vnode.componentInstance || el, vnode.key);
        return;
      }
    }
    // Should not have this situation
    if (
      vnode.componentInstance !== oldVnode.componentInstance ||
      vnode.elm !== oldVnode.elm
    ) {
      binding.value(vnode.componentInstance || el, vnode.key);
    }
  },
  unbind({}, binding: any, vnode: any) {
    binding.value(null, vnode.key);
  },
} as any;
