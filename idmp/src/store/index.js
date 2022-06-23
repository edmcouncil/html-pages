import Vue from 'vue';
import Vuex from 'vuex';
import OWL from './OWL';
import Vocabulary from './Vocabulary';
import DataDictionary from './DataDictionary';
import helpers from './helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchDefaultDomain: "/idmp/ontology/{version}api/find",
    ontologyDefaultDomain: "/idmp/ontology/{version}api/entity",
    modulesDefaultDomain: "/idmp/ontology/{version}api/module",
    statsDefaultDomain: '/idmp/ontology/{version}api/stats',
    missingImportsDefaultDomain: '/idmp/ontology/api/missingImports',
  },
  mutations: {},
  actions: {},
  modules: {
    OWL,
    Vocabulary,
    DataDictionary,
    helpers,
  },
});
