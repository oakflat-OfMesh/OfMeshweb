import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // 👈 确保引入了 HomeView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView // 👈 这一行很关键，把根路径绑定到 HomeView
    }
  ]
})

export default router