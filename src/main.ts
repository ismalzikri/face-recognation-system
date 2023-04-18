import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { createPinia } from 'pinia'
import { router as setupRouter } from './router'
import './assets/main.css'

const init = async () => {
  const app = createApp(App)
  const pinia = createPinia()
  const router = await setupRouter
  app.use(router)
  app.use(pinia)
  await router.isReady()
  app.mount('#app')
}

init().then()
