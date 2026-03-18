import Axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = Axios.create({
    baseURL: config.public.apiBase,
    timeout: 10000,
    headers: {
      Accept: 'application/json'
    }
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response?.data?.statusMessage || error.message || 'Request failed'
      return Promise.reject(new Error(message))
    }
  )

  return {
    provide: {
      axios: api
    }
  }
})
