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
      path: '/contact',
      name: 'Contact',
      component: () => import(/* webpackChunkName: "Contact" */ './views/Contact.vue'),
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import(/* webpackChunkName: "Products" */ './views/Products.vue'),
    },
    {
      path: '/OWL',
      name: 'OWL',
      component: () => import(/* webpackChunkName: "OWL" */ './views/OWL.vue'),
    },
    {
      path: '/data-dictionary',
      name: 'DataDictionary',
      component: () => import(/* webpackChunkName: "DataDictionary" */ './views/DataDictionary.vue'),
    },
    {
      path: '/vocabulary',
      name: 'Vocabulary',
      component: () => import(/* webpackChunkName: "Vocabulary" */ './views/Vocabulary.vue'),
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
