import customLink from '../components/Resource/chunks/customLink.vue';
import VRuntimeTemplate from "vue3-runtime-template";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('VRuntimeTemplate', VRuntimeTemplate);
  nuxtApp.vueApp.component('customLink', customLink);
})