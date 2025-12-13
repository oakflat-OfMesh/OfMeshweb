import request from './axios'

export default {
  // 1.1 Ping
  ping() {
    return request.get('/auth/ping')
  },

  // 1.2 发送验证码
  sendVerificationCode(email: string) {
    return request.post('/auth/send-verification-code', { email })
  },

  // 1.3 注册
  register(data: { username: string; email: string; password: string; code: string }) {
    return request.post('/auth/register', data)
  },

  // 1.4 登录 (推荐使用 identifier)
  login(data: { identifier: string; password: string }) {
    return request.post<{ token: string }>('/auth/login', data)
  },

  // 1.5 重置密码
  resetPassword(data: { email: string; code: string; newPassword: string }) {
    return request.post('/auth/reset-password', data)
  },

  // 2.1 获取当前用户资料
  getMe() {
    // 返回结构: { id, username, email, role, badges: [] }
    return request.get('/users/me')
  }
}