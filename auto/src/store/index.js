import Vue from 'vue';
import Vuex from 'vuex';
import OWL from './OWL';
import helpers from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ontologyDefaultDomain: "/auto/ontology/api/entity",
    searchDefaultDomain: "/auto/ontology/api/find",
    modulesDefaultDomain: "/auto/ontology/api/module",
    statsDefaultDomain: "/fibo/ontology/api/stats",
    missingImportsDefaultDomain: "/fibo/ontology/api/missingImports"
  },
  mutations: {},
  actions: {},
  modules: {
    OWL,
    helpers
  }
});
