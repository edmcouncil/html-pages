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
      path: '/okgl',
      name: 'OKGL',
      component: () => import(/* webpackChunkName: "OKGL" */ './views/OKGL.vue'),
    },
    {
      path: '/courses',
      name: 'Courses',
      component: () => import(/* webpackChunkName: "Courses" */ './views/Courses.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import(/* webpackChunkName: "Contact" */ './views/Contact.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
