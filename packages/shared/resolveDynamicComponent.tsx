import { getCurrentInstance, isVue2, isVue3 } from 'vue-demi';
import { toCamelCase } from '@ideaz/utils';

interface IndexType {
  [propName: string]: any;
}

interface ResolveOptions {
  name: string;
  attrs: IndexType;
  content: any;
}

export const resolveDynamicComponent = (options: ResolveOptions) => {
  const cop = isVue2
    ? options.name
    : getCurrentInstance()!.appContext!.components[toCamelCase(options.name)];
  if (isVue3) {
    return h(
      // resolveComponent(options.name),
      cop,
      {
        ...(options.attrs || {}),
      },
      () => options.content || {}
    );
  }
  // return
  // <name {...{ props: options.attrs || {} }} {...{ on: options.events || {} }}>
  //   {options.content || null}
  // </name>
  return h(
    options.name,
    {
      props: { ...(options.attrs || {}) },
      ...(options.attrs || {}),
    },
    options.content || {}
  );
};
