import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import './styles/index.css';
import Button from '../../../src/components/Button.vue';
import '../../../src/styles/index.css';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import zhCn from '@ideaz/locale/lang/zh-cn';
import ideazui from '@ideaz/element';
import '@ideaz/theme-chalk/src/index.scss';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    useComponents(ctx.app);
    ctx.app.component(Button.name, Button);
    ctx.app.use(ElementPlus).use(ideazui, { locale: zhCn, size: 'large' });
  },
};
