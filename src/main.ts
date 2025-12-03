import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// 1. 引入 Vue 组件
import Particles from "@tsparticles/vue3";

// 2. ✅✅✅ 必须改用 loadFull (从 'tsparticles' 引入)
// 只有这个完整版引擎才能支持"发射器"和"浪花"效果！
import { loadFull } from "tsparticles"; 

const app = createApp(App)

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    next(to.path.slice(0, -1))
  } else {
    next()
  }
})

app.use(router)

app.use(Particles, {
  init: async (engine) => {
    // 3. ✅✅✅ 初始化完整版引擎
    await loadFull(engine);
  },
});

app.mount('#app')