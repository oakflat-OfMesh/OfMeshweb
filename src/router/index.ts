import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/workshop', name: 'workshop', component: () => import('../views/ModWorkshopView.vue') },
    
    // ✅ 新增：动态详情页路由
    // :id 是一个占位符，比如 /mod/confluence 或 /mod/create
    {
      path: '/mod/:id',
      name: 'mod-detail',
      component: () => import('../views/ModDetailView.vue'),
      props: true // 允许将路由参数作为 props 传给组件
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;