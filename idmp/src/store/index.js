import Vue from 'vue';
import Vuex from 'vuex';
import OWL from './OWL';
import helpers from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchDefaultDomain: "/idmp/ontology/{version}api/find",
    ontologyDefaultDomain: "/idmp/ontology/{version}api/entity",
    modulesDefaultDomain: "/idmp/ontology/{version}api/module",
    statsDefaultDomain: '/idmp/ontology/api/stats',
    missingImportsDefaultDomain: '/idmp/ontology/api/missingImports',
  },
  mutations: {},
  actions: {},
  modules: {
    OWL,
    helpers,
  },
});
