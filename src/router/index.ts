import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    
    // === Mod 工坊 ===
    { path: '/workshop', name: 'workshop', component: () => import('../views/ModWorkshopView.vue') },
    { path: '/mod/:id', name: 'mod-detail', component: () => import('../views/ModDetailView.vue'), props: true },

    // === 整合包工坊 ===
    { 
      path: '/modpacks', 
      name: 'modpacks', 
      component: () => import('../views/ModpackWorkshopView.vue') 
    },

    // === 创作者社区 ===
    { 
      path: '/community', 
      name: 'community', 
      component: () => import('../views/CommunityView.vue') 
    },
    // ✅ 新增：发布创作页
    { 
      path: '/community/create', 
      name: 'create-post', 
      component: () => import('../views/CreatePostView.vue') 
    },

    // === 🔒 身份认证 (不显示官网导航) ===
    { 
      path: '/login', 
      name: 'login', 
      component: () => import('../views/auth/LoginView.vue'),
      // ✅ 关键点：添加 meta 标记
      meta: { hideNavbar: true }
    },
    { 
      path: '/register', 
      name: 'register', 
      component: () => import('../views/auth/RegisterView.vue'),
      // ✅ 关键点：添加 meta 标记
      meta: { hideNavbar: true }
    },

    // === 📊 控制台 (独立布局，不显示官网导航) ===
    { 
      path: '/dashboard', 
      component: () => import('../layouts/DashboardLayout.vue'),
      // ✅ 关键点：给父路由添加标记，所有子路由都会继承效果
      meta: { hideNavbar: true },
      children: [
        { path: '', name: 'dashboard', component: () => import('../views/dashboard/OverviewView.vue') }
        // 未来可以在这里添加 'mods', 'settings' 等子路由
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/static/AboutView.vue'),
      meta: { showProgressBar: true }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/static/PrivacyView.vue'),
      meta: { showProgressBar: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;