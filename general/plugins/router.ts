import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.$router.options.scrollBehavior = () => {
    return { top: 0 }
  }
})
