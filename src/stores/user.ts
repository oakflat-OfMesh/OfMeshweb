import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authApi from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  // === State (存原始数据) ===
  const user = ref<any>(null) // 存后端返回的原始 JSON
  const token = ref(localStorage.getItem('token') || '')

  // === Getters (处理 UI 显示逻辑) ===
  
  // 1. 角色判断
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const isLoggedIn = computed(() => !!token.value)

  // 2. 角色中文翻译 (从 useAuth 搬来的)
  const displayRole = computed(() => {
    if (!user.value) return '游客'
    const map: Record<string, string> = { 
      'USER': '创造者', 
      'ADMIN': '管理员', 
      'MODERATOR': '版主' 
    }
    return map[user.value.role] || user.value.role
  })

  // 3. 格式化 ID (从 useAuth 搬来的)
  const displayId = computed(() => {
    if (!user.value?.id) return 'UID-????'
    return `UID-${String(user.value.id).padStart(4, '0')}`
  })

  // 4. 头像兜底
  const avatarUrl = computed(() => {
    return user.value?.avatar || 'https://www.gravatar.com/avatar/?d=mp' // 默认头像
  })

  // === Actions (动作) ===

  const fetchCurrentUser = async () => {
    if (!token.value) return
    try {
      // API 返回: { id: 1, role: 'USER', ... }
      const res = await authApi.getMe()
      user.value = res 
    } catch (error) {
      logout()
    }
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    // 登录后立刻拉取资料
    fetchCurrentUser() 
  }
  
  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    // 如果不在登录页，踢回登录页
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login'
    }
  }

  return { 
    // State
    user, 
    token, 
    // Getters
    isAdmin, 
    isLoggedIn,
    displayRole, // ✅ 新增：在页面上直接用 userStore.displayRole
    displayId,   // ✅ 新增：在页面上直接用 userStore.displayId
    avatarUrl,
    // Actions
    fetchCurrentUser, 
    setToken, 
    logout 
  }
})