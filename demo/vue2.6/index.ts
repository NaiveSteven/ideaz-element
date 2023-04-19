import Vue from 'vue';
import ElementUI from 'element-ui';
import compositionApi from '@vue/composition-api';
import App from './index.vue';
import 'element-ui/lib/theme-chalk/index.css';
import zhCn from '@ideaz/locale/lang/zh-cn';
import ideazui from '@ideaz/element';

Vue.use(compositionApi);
Vue.use(ElementUI).use(ideazui, { locale: zhCn });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
