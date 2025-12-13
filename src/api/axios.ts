import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// === 请求拦截 ===
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      if (!config.headers) config.headers = {} as any
      (config.headers as any).Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// === 响应拦截 ===
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    const status = error.response?.status
    // 优先读取后端返回的详细错误信息
    const backendMsg = error.response?.data?.message || error.response?.data || '请求服务异常'

    switch (status) {
      case 400:
        // ✅ 核心改动：400 错误直接透传后端提示 (例如 "BadgeKey不存在", "验证码错误")
        message.error(backendMsg)
        break
        
      case 401:
        message.error('登录状态已失效，请重新登录')
        localStorage.removeItem('token')
        // 只有非登录页才跳转，防止循环重定向
        if (!window.location.pathname.includes('/login')) {
           setTimeout(() => window.location.href = '/login', 1500)
        }
        break
        
      case 403:
        message.error('权限不足：需要管理员身份')
        break
        
      case 429:
        message.warning('操作太频繁，请稍后再试')
        break
        
      case 500:
        message.error('服务器内部错误')
        break
        
      default:
        message.error(backendMsg)
    }

    return Promise.reject(error)
  }
)

export default api