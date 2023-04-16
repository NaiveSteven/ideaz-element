import type { App } from 'vue';
import ZCheckbox from './checkbox';
import ZRadio from './radio';
import ZSelect from './select';

const components = [ZCheckbox, ZRadio, ZSelect];

const install = function (Vue: App) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default install;
export * from './types';

export { ZRadio, ZSelect, ZCheckbox };
