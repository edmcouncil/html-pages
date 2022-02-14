import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue';
import VueGtag  from 'vue-gtag';
import Clipboard from 'v-clipboard';
import App from './App.vue';
import router from './router';
import store from './store';
import ModuleTree from './components/ModuleTree.vue';
import LangFlag from 'vue-lang-code-flags';

LangFlag.props.squared = {type: Boolean, default: false};

Vue.config.productionTip = false;
Vue.component('module-tree', ModuleTree);
Vue.component('lang-flag', LangFlag);
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
