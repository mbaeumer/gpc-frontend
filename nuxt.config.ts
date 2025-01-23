// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // For server-side rendering
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [],
  plugins: ['~/plugins/axios.js'],
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || 'http://accessible-places-be-gca7bdgphcgcbzaf.germanywestcentral-01.azurewebsites.net',//'http://localhost:8080',
      //apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080', // Fallback to localhost if not defined
    },
  }
})


