import { reactive, toRefs } from 'vue'

type State<T> = {
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  data: T | null
}

export const useFetch = async <T>(
  url: string,
  options?: Record<string, unknown>
) => {
  const state = reactive<State<T>>({
    isLoading: true,
    hasError: false,
    errorMessage: '',
    data: null,
  })

  const fetchData = async () => {
    state.isLoading = true

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      state.data = await response.json()
    } catch (error: unknown) {
      const typeError = error as Error
      state.hasError = true
      state.errorMessage = typeError.message
    } finally {
      state.isLoading = false
    }
  }

  await fetchData()

  return {
    ...toRefs(state)
  }
}