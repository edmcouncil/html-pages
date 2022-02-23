import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import VueGtag  from 'vue-gtag';
import Clipboard from 'v-clipboard';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Clipboard);

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: "G-WM9XRFEHTR" }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
