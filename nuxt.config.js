import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    ssr: {
      noExternal: ['vuetify']
    },
    vue: {
      template: {
        transformAssetUrls
      }
    },
    plugins: [
      vuetify({
        autoImport: true,
        styles: {
          configFile: 'assets/css/settings.scss'
        }
      }),
      Components({
        dts: 'types/components.d.ts',
        dirs: ['app/components'],
        resolvers: [VuetifyResolver()]
      }),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        dirs: ['app/composables', 'app/stores', 'app/utils'],
        imports: [
          {
            axios: [['default', 'axios']],
            dayjs: [['default', 'dayjs']]
          },
          {
            pinia: ['storeToRefs']
          }
        ],
        vueTemplate: true
      })
    ]
  },
  runtimeConfig: {
    twseBase: 'https://openapi.twse.com.tw/v1',
    public: {
      appName: 'TW Market Pulse',
      apiBase: '/api'
    }
  },
  app: {
    head: {
      title: 'TW Market Pulse',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Taiwan market dashboard starter built with Nuxt, Vuetify, Tailwind, and Nitro.' }
      ]
    }
  }
})
