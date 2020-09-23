import Vue from 'vue';
import Vuex from 'vuex';
import OWL from './OWL';
import helpers from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ontologyDefaultDomain: '/auto/ontology/api/search',
    modulesDefaultDomain: '/auto/ontology/api/module',
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    OWL,
    helpers,
  },
});
