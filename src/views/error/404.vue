<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <n-result
      status="404"
      title="404 页面不存在"
      description="生活总有阴差阳错，就像你找不到这个页面一样。"
      size="huge"
    >
      <template #footer>
        <n-button type="primary" @click="router.push('/')">
          带我回家
        </n-button>
      </template>
    </n-result>
  </div>
</template>