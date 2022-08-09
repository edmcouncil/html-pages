import { getPageElementsStrapiData } from "../api/strapi"

const productName = process.env.productName.toLowerCase();

export default {
  state: () => ({
    searchDefaultDomain: `/${ productName }/ontology/{version}api/find`,
    ontologyDefaultDomain: `/${ productName }/ontology/{version}api/entity`,
    modulesDefaultDomain: `/${ productName }/ontology/{version}api/module`,
    statsDefaultDomain: `/${ productName }/ontology/api/stats`,
    missingImportsDefaultDomain: `/${ productName }/ontology/api/missingImports`,

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