import { defineStore } from 'pinia';
import { getPageElementsStrapiData } from '@/api/strapi';

export const useContentStore = defineStore({
  id: 'content-store',
  state: () => {
    return {
      headerData: {
        menuDropdown: null,
        menuTop: null,
        carousel: null,
      },
      footerData: {
        copyright: null,
        contacts: null,
        socials: null,
        links: null,
        useCustomFooterData: null,
      },
    }
  },
  actions: {
    setContentData(data: any) {
      this.headerData.menuDropdown = data.menuDropdown;
      this.headerData.menuTop = data.menuTop;
      this.headerData.carousel = data.carousel;

      this.footerData.copyright = data.copyright;
      this.footerData.socials = data.footerSocials;
      this.footerData.links = data.footerLinks;
      this.footerData.contacts = data.footerContacts;
      this.footerData.useCustomFooterData = data.useCustomFooterData;
    },
    async initialize() {
      const runtimeConfig = useRuntimeConfig();
      const pageData = await getPageElementsStrapiData(runtimeConfig);
      this.setContentData(pageData);
    }
  },
})