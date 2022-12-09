import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import Clipboard from 'v-clipboard';
import VueGtm from '@gtm-support/vue2-gtm';
import router from './router';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Clipboard);

Vue.config.productionTip = false;

Vue.use(VueGtm, {
  id: 'GTM-N7GL2D5',

  defer: false,
  compatibility: false,
  enabled: true,
  debug: false,
  loadScript: true,
  vueRouter: router,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
