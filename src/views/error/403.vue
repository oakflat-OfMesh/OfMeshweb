<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()

const goHome = () => router.push('/')
const goLogin = () => router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <n-result
      status="403"
      title="403 禁止访问"
      description="前面的区域，以后再来探索吧。（权限不足）"
      size="huge"
    >
      <template #footer>
        <div class="flex gap-4 justify-center">
          <n-button @click="goHome">
            返回首页
          </n-button>
          <n-button type="primary" @click="goLogin">
            切换账号
          </n-button>
        </div>
      </template>
    </n-result>
  </div>
</template>