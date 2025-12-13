import request from './axios'

export default {
  // 1.1 服务存活探针 (无需登录)
  getServiceHealth() {
    return request.get<{ status: string }>('/status/health')
  },

  // 3.1 心跳上报 (登录后周期调用)
  sendHeartbeat() {
    return request.post<{ ok: boolean }>('/online/heartbeat')
  }
}