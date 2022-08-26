import { getPageElementsStrapiData } from "../api/strapi"

const ontologyName = process.env.ontologyName.toLowerCase();

export default {
  state: () => ({
    searchDefaultDomain: `/${ ontologyName }/ontology/{version}api/find`,
    ontologyDefaultDomain: `/${ ontologyName }/ontology/{version}api/entity`,
    modulesDefaultDomain: `/${ ontologyName }/ontology/{version}api/module`,
    statsDefaultDomain: `/${ ontologyName }/ontology/{version}api/stats`,
    missingImportsDefaultDomain: `/${ ontologyName }/ontology/{version}api/missingImports`,

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
