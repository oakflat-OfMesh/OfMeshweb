import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import api from '@/api/axios'
// ✅ 引入 Store 用于在路由守卫中获取用户信息 (更稳健)
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // === 🏠 核心页面 ===
    { path: '/', name: 'home', component: HomeView },
    
    // === 🛠️ Mod & 整合包工坊 ===
    { path: '/workshop', name: 'workshop', component: () => import('../views/ModWorkshopView.vue') },
    { path: '/mod/:id', name: 'mod-detail', component: () => import('../views/ModDetailView.vue'), props: true },
    { path: '/modpacks', name: 'modpacks', component: () => import('../views/ModpackWorkshopView.vue') },

    // === 🌍 社区 ===
    { path: '/community', name: 'community', component: () => import('../views/CommunityView.vue') },
    { path: '/community/create', name: 'create-post', component: () => import('../views/CreatePostView.vue') },
    { path: '/servers', name: 'servers', component: () => import('../views/ServerBrowserView.vue') },

    // === 🔐 身份认证 ===
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true } 
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guestOnly: true }
    },

    // === 👤 用户中心 ===
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    
    // === 📊 用户控制台 ===
    { 
      path: '/dashboard', 
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { hideNavbar: true, requiresAuth: true }, 
      children: [
        { path: '', name: 'dashboard', component: () => import('../views/dashboard/OverviewView.vue') }
      ]
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/auth/ForgotPasswordView.vue'),
      meta: { guestOnly: true }
    },
    // === 🛡️ 管理后台 (修正版) ===
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      // ✅ 关键修改：加上 hideNavbar: true，屏蔽主站导航栏
      meta: { requiresAuth: true, requiresAdmin: true, hideNavbar: true }, 
      children: [
        {
          path: '',
          redirect: { name: 'AdminDashboard' }
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('@/views/admin/pages/AdminDashboard.vue')
        },
        {
          path: 'ops',
          name: 'OpsCenter',
          component: () => import('@/views/admin/pages/OpsCenter.vue')
        },
        {
          path: 'users',
          name: 'UserLookup',
          component: () => import('@/views/admin/pages/UserLookup.vue')
        },
        {
          path: 'badges',
          name: 'BadgeOps',
          component: () => import('@/views/admin/pages/BadgeOps.vue')
        },
        {
          path: 'audit',
          name: 'AuditLog',
          component: () => import('@/views/admin/pages/AuditLog.vue')
        }
      ]
    },

    // === 🚫 错误页 ===
    { 
      path: '/403', 
      name: 'Forbidden', 
      component: () => import('../views/error/403.vue'),
      // 错误页通常也建议屏蔽导航栏，看起来更整洁，你自己决定要不要加 hideNavbar
      meta: { hideNavbar: true } 
    },
    { path: '/about', name: 'about', component: () => import('../views/static/AboutView.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('../views/static/PrivacyView.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/error/404.vue'),
      meta: { hideNavbar: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

// === 🛡️ 全局路由守卫 (配合 Pinia 优化) ===

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  // 1. 登录检查
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // 2. 游客检查
  if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'profile' })
    return
  }

  // 3. 管理员检查
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // 确保用户信息已加载
    if (!userStore.user && token) {
      try {
        await userStore.fetchCurrentUser()
      } catch (e) {
        next({ name: 'login' })
        return
      }
    }

    if (userStore.isAdmin) {
      next()
    } else {
      next({ name: 'Forbidden' })
    }
    return
  }

  next()
})

export default router