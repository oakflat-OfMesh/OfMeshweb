import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import BadgeConsole from '@/views/admin/BadgeConsole.vue'

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
      component: LoginView,
      // ✅ 2. 标记：仅限游客访问 (已登录不能进)
      meta: { guestOnly: true } 
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      // ✅ 2. 标记：仅限游客访问
      meta: { guestOnly: true }
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
    },
    { 
      path: '/servers', 
      name: 'servers', 
      component: () => import('../views/ServerBrowserView.vue') 
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true } // 必须登录才能看
    },
    {
    path: '/admin/console/wild', // 名字起得偏僻点，防止普通用户误入（虽然他们没权限）
    name: 'WildConsole',
    component: BadgeConsole
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // 情况 A: 去需要登录的页面，但没登录 -> 踢去登录页
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
    return;
  }

  // 情况 B: 已登录，还想去 "游客专享" 页面 (登录/注册) -> 踢去个人资料页
  if (to.meta.guestOnly && isAuthenticated) {
    next('/profile'); // 或者 '/dashboard'
    return;
  }

  // 其他情况放行
  next();
})

export default router;