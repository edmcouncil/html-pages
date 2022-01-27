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
//import CountryFlag from 'vue-country-flag';
import LangFlag from 'vue-lang-code-flags';

LangFlag.props.squared = {type: Boolean, default: false};

Vue.config.productionTip = false;
Vue.component('module-tree', ModuleTree);
//Vue.component('country-flag', CountryFlag);
Vue.component('lang-flag', LangFlag);
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
