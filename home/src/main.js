import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import { createGtm } from '@gtm-support/vue-gtm';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.use(
  createGtm({
    id: 'GTM-N7GL2D5',

    defer: false,
    compatibility: false,
    enabled: true,
    debug: false,
    loadScript: true,
    vueRouter: router,
  }),
);

app.mount('#app');
