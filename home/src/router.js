import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: () => import(/* webpackChunkName: "Documentation" */ './views/Documentation.vue'),
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import(/* webpackChunkName: "Products" */ './views/Products.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
