/* eslint-disable global-require */
/* eslint-disable key-spacing */
export default {
  data: () => ({

  }),
  mutations: {

  },
  actions: {

  },
  namespaced: true,
  methods: {
    router(product) {
      const s = [];
      if (typeof product === 'string') s.push(product);
      return `/${s.join('/')}${typeof this.$route.query.branch === 'string' ? `?branch=${this.$route.query.branch}` : ''}`;
    },
  },
};
