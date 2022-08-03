import { getPageElementsStrapiData } from "../api/strapi"

export default {
  state: () => ({
    searchDefaultDomain: "/idmp/ontology/{version}api/find",
    ontologyDefaultDomain: "/idmp/ontology/{version}api/entity",
    modulesDefaultDomain: "/idmp/ontology/{version}api/module",
    statsDefaultDomain: "/idmp/ontology/api/stats",
    missingImportsDefaultDomain: "/idmp/ontology/api/missingImports",

    headerData: {
      menuDropdown: null,
      menuTop: null,
      carousel: null,
    },
    footerData: {
      copyright: null,
    },
  }),
  mutations: {
    SET_HEADER_DATA (state, { menuDropdown, menuTop, carousel }) {
      state.headerData.menuDropdown = menuDropdown;
      state.headerData.menuTop = menuTop;
      state.headerData.carousel = carousel;
    },
    SET_FOOTER_DATA (state, { copyright }) {
      state.footerData.copyright = copyright;
    },
  },
  actions: {
    async nuxtServerInit ({ commit }) {
      const pageData = await getPageElementsStrapiData();
      commit('SET_HEADER_DATA', pageData);
      commit('SET_FOOTER_DATA', pageData);
    }
  },
};
