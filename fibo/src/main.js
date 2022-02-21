import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueGtag from 'vue-gtag';
import Clipboard from 'v-clipboard';
import App from './App.vue';
import router from './router';
import store from './store';
import ModuleTree from './components/ModuleTree.vue';

Vue.config.productionTip = false;
Vue.component('module-tree', ModuleTree);
Vue.use(Clipboard);

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-124531442-2',
  router,
});

Vue.use(VueGtag, {
  config: { id: 'G-CBM9M64EMC' },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
