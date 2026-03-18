import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    defaults: {
      global: {
        ripple: false
      },
      VCard: {
        rounded: 'xl',
        elevation: 0
      },
      VBtn: {
        rounded: 'lg',
        elevation: 0
      },
      VTextField: {
        variant: 'solo-filled',
        rounded: 'xl',
        flat: true,
        hideDetails: true
      }
    },
    theme: {
      defaultTheme: 'marketTheme',
      themes: {
        marketTheme: {
          dark: false,
          colors: {
            background: '#f4f7fb',
            surface: '#ffffff',
            primary: '#0f8a6c',
            secondary: '#0f172a',
            accent: '#f59e0b',
            success: '#16a34a',
            error: '#dc2626',
            info: '#0284c7'
          }
        }
      }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
