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
      path: '/members',
      name: 'Members',
      component: () => import(/* webpackChunkName: "Members" */ './views/Members.vue'),
    },
    {
      path: '/applications',
      name: 'Applications',
      component: () => import(/* webpackChunkName: "Applications" */ './views/Applications.vue'),
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import(/* webpackChunkName: "Community" */ './views/Community.vue'),
    },
    {
      path: '/ontology/:1?/:2?/:3?/:4?/:5?',
      name: 'ontology',
      component: () => import(/* webpackChunkName: "Schema" */ './views/Ontology.vue'),
      meta: {
        plainLayout: false, // Layout without banner
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
