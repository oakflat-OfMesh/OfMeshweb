import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"; 

const app = createApp(App)

// ✅ 1. 初始化 Pinia
const pinia = createPinia()

// ✅ 2. Pinia 必须在 Router 之前
app.use(pinia)

// 路由尾斜杠修正
router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    next(to.path.slice(0, -1))
  } else {
    next()
  }
})

// ✅ 3. 再注册 Router
app.use(router)

// 4. 第三方插件（顺序无所谓）
app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine)
  },
})

app.mount('#app')
