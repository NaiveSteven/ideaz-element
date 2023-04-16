import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import './styles/index.css';
import Button from '../../../src/components/Button.vue';
import '../../../src/styles/index.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    useComponents(ctx.app);
    ctx.app.component(Button.name, Button);
  },
};
