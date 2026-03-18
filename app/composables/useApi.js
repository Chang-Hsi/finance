export function useApi() {
  const { $axios } = useNuxtApp()

  const get = async (url, config = {}) => {
    const { data } = await $axios.get(url, config)
    return data
  }

  return {
    get
  }
}
