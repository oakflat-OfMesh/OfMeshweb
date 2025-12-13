import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authApi from '@/api/auth'
import monitorApi from '@/api/monitor' // ✅ 新增
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

export const useUserStore = defineStore('user', () => {
  const user = ref<any>(null)
  const token = ref(localStorage.getItem('token') || '')
  let heartbeatTimer: number | null = null // ✅ 心跳定时器引用

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  
  const displayRole = computed(() => {
    if (!user.value) return '游客'
    const map: Record<string, string> = { 
      'USER': '创造者', 
      'ADMIN': '管理员', 
      'MODERATOR': '版主' 
    }
    return map[user.value.role] || user.value.role
  })

  const displayId = computed(() => {
    if (!user.value?.id) return 'UID-????'
    return `UID-${String(user.value.id).padStart(4, '0')}`
  })

  const avatarUrl = computed(() => {
    return user.value?.avatar || 'https://www.gravatar.com/avatar/?d=mp'
  })

  // === Actions ===

  // ✅ 启动心跳 (每30秒一次)
  const startHeartbeat = () => {
    // 先清理旧的，防止重复
    if (heartbeatTimer) clearInterval(heartbeatTimer)
    
    // 立即发送一次
    monitorApi.sendHeartbeat().catch(() => {}) 

    // 设置循环
    heartbeatTimer = setInterval(() => {
      monitorApi.sendHeartbeat().catch((err: any) => {
        // 如果心跳报 401，说明 Token 过期，自动登出
        if (err.response?.status === 401) {
          logout()
        }
      })
    }, 30000) // 30秒
  }

  // ✅ 停止心跳
  const stopHeartbeat = () => {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return
    try {
      const res = await authApi.getMe()
      user.value = res
      // 拉取用户信息成功，说明登录有效，启动心跳
      startHeartbeat()
    } catch (error) {
      console.error('获取用户信息失败', error)
      logout()
    }
  }

  const setToken = async (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    await fetchCurrentUser()
  }
  
  const logout = () => {
    stopHeartbeat() // ✅ 登出时停止心跳
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    
    if (!window.location.pathname.includes('/login')) {
      message.info('您已退出登录')
      setTimeout(() => {
        window.location.href = '/login'
      }, 500)
    }
  }

  return { 
    user, token, 
    isLoggedIn, isAdmin, displayRole, displayId, avatarUrl,
    fetchCurrentUser, setToken, logout,
    startHeartbeat // 导出给 App.vue 用
  }
})