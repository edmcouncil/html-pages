import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import VueGtag  from 'vue-gtag';
import Clipboard from 'v-clipboard';
import App from './App.vue';
import router from './router';
import store from './store';
import ModuleTree from './components/ModuleTree.vue';

Vue.config.productionTip = false;
Vue.component('module-tree', ModuleTree);
Vue.use(Clipboard);

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: "G-V3S2FY7ZQ2" }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
