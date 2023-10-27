import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior: () => {
    return { top: 0 }
  },
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue').then(r => r.default || r)
    },
    {
      name: 'asd',
      path: '/asd',
      component: () => import('~/pages/index.vue').then(r => r.default || r)
    },
    {
      name: 'ontology',
      path: '/ontology',
      component: () => import('~/pages/ontology/[...resource].vue').then(r => r.default || r)
    },
    {
      name: 'ontology',
      path: '/ontology/:resource(.*)*',
      component: () => import('~/pages/ontology/[...resource].vue').then(r => r.default || r)
    },
    {
      name: 'page',
      path: '/page/:slug',
      component: () => import('~/pages/page/[slug].vue').then(r => r.default || r)
    },
    {
      name: 'release-notes',
      path: '/release-notes',
      component: () => import('~/pages/release-notes.vue').then(r => r.default || r)
    },
  ],
}
