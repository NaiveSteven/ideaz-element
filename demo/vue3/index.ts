import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './index.vue';
import 'element-plus/dist/index.css';
import zhCn from '@ideaz/locale/lang/zh-cn';
import ideazui from '@ideaz/element';

const app = createApp(App);

app.use(ElementPlus).use(ideazui, { locale: zhCn });

app.mount('#app');
