import Vue from 'vue';
import Vuex from 'vuex';
import OWL from './OWL';
import helpers from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchDefaultDomain: '/fibo/ontology/{version}api/find',
    ontologyDefaultDomain: '/fibo/ontology/{version}api/search',
    modulesDefaultDomain: '/fibo/ontology/{version}api/module',
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
