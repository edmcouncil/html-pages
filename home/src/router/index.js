import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: () => import('../views/Documentation.vue')
    },
    {
      path: '/okgl',
      name: 'OKGL',
      component: () => import('../views/OKGL.vue')
    },
    {
      path: '/courses',
      name: 'Courses',
      component: () => import('../views/Courses.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default router;
