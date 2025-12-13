import request from './axios'

export default {
  // 1.1 Ping
  ping() {
    return request.get('/auth/ping')
  },

  // ✅ 1.2 发送验证码 (通用接口，适配后端新标准)
  // type: 'register' | 'reset'
  sendCode(email: string, type: 'register' | 'reset') {
    // 后端要求：POST /api/auth/send-code?email=xxx&type=xxx
    //也就是参数放在 Query String 里，而不是 Body 里
    return request.post('/auth/send-code', null, {
      params: { email, type }
    })
  },

  // 1.3 注册
  register(data: { username: string; email: string; password: string; code: string }) {
    return request.post('/auth/register', data)
  },

  // 1.4 登录
  login(data: { identifier: string; password: string }) {
    return request.post<{ token: string }>('/auth/login', data)
  },

  // ✅ 1.5 重置密码
  resetPassword(data: { email: string; code: string; newPassword: string }) {
    return request.post('/auth/reset-password', data)
  },

  // 2.1 获取当前用户资料
  getMe() {
    return request.get('/users/me')
  }
}