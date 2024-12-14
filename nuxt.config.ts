// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light', // 設定主題為 light
        themes: {
          light: {
            colors: {
              primary: '#d23f57',
              secondary: '#FAFAFA',
              third: '#616161', 

            }
          }
        }
      }
    }
  }
})