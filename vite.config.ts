import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // ✅ 新增：开发服务器代理配置
  server: {
    port: 5173, // 前端端口
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 指向本地运行的 Spring Boot
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // ❌ 不要加这行，因为我们要保留 /api 前缀
      }
    }
  }
})