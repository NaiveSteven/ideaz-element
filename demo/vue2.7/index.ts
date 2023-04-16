import Vue from 'vue';
import ElementUI from 'element-ui';
// import compositionApi from '@vue/composition-api';
import App from './index.vue';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(compositionApi);
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
