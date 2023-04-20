import ZCheckbox from './checkbox';
import ZRadio from './radio';
import ZSelect from './select';
import ZRow from './row';
import ZCol from './col';
import { makeInstaller } from './makeInstaller';

const components = [ZCheckbox, ZRadio, ZSelect, ZRow, ZCol];

// const install = function (Vue: App) {
//   components.forEach((component) => {
//     Vue.component(component.name, component);
//   });
// };

const installer = makeInstaller([...components]);

export default installer;
export * from './types';

export { ZRadio, ZSelect, ZCheckbox, ZRow, ZCol };
