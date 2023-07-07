import {
  getPageElementsStrapiData,
  getAppConfigurationData,
} from '../api/strapi';

export default {
  state: () => ({
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
    SET_HEADER_DATA(state, { menuDropdown, menuTop, carousel }) {
      state.headerData.menuDropdown = menuDropdown;
      state.headerData.menuTop = menuTop;
      state.headerData.carousel = carousel;
    },
    SET_FOOTER_DATA(state, { copyright }) {
      state.footerData.copyright = copyright;
    },
  },
  actions: {
    async nuxtServerInit({ commit }) {
      const pageData = await getPageElementsStrapiData();
      commit('SET_HEADER_DATA', pageData);
      commit('SET_FOOTER_DATA', pageData);

      const configData = await getAppConfigurationData();
      commit('configuration/SET_CONFIG_DATA', configData);
    },
  },
};
