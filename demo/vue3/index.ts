import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './index.vue';
import 'element-plus/dist/index.css';
import ideazui from '@ideaz/element';

const app = createApp(App);

app.use(ElementPlus).use(ideazui);

app.mount('#app');
