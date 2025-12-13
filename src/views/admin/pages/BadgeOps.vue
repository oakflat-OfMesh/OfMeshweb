<script setup lang="ts">
import { ref } from 'vue'
import { 
  NCard, NTabs, NTabPane, NForm, NFormItem, NInputNumber, NInput, NButton, useMessage 
} from 'naive-ui'
import adminApi from '@/api/admin'

const message = useMessage()
const loading = ref(false)

// 这里的类型根据你的后端要求调整，后端 checklist 说 userId 是数字
const grantForm = ref({ userId: 0, badgeKey: '' })
const revokeForm = ref({ userId: 0, badgeKey: '' })

// 发放
const handleGrant = async () => {
  if (!grantForm.value.userId || !grantForm.value.badgeKey) return
  loading.value = true
  try {
    // 成功提示直接显示
    await adminApi.grantBadge(grantForm.value)
    message.success('徽章发放成功')
  } catch (e) {
    // 失败信息已由 axios 拦截器统一处理
  } finally {
    loading.value = false
  }
}

// 撤销
const handleRevoke = async () => {
  if (!revokeForm.value.userId || !revokeForm.value.badgeKey) return
  loading.value = true
  try {
    await adminApi.revokeBadge(revokeForm.value.userId, revokeForm.value.badgeKey)
    message.success('徽章已撤销')
  } catch (e) {
    // 失败信息已由 axios 拦截器统一处理
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold">徽章操作台</h2>
    <n-card class="max-w-xl">
      <n-tabs type="segment" animated>
        <n-tab-pane name="grant" tab="发放">
          <n-form class="mt-4">
            <n-form-item label="用户 ID">
              <n-input-number v-model:value="grantForm.userId" class="w-full" placeholder="输入 ID (例如 1)" />
            </n-form-item>
            <n-form-item label="徽章 Key">
              <n-input v-model:value="grantForm.badgeKey" placeholder="例如 founder" />
            </n-form-item>
            <n-button type="primary" block @click="handleGrant" :loading="loading">发放徽章</n-button>
          </n-form>
        </n-tab-pane>
        
        <n-tab-pane name="revoke" tab="撤销">
          <n-form class="mt-4">
            <n-form-item label="用户 ID">
              <n-input-number v-model:value="revokeForm.userId" class="w-full" placeholder="输入 ID" />
            </n-form-item>
            <n-form-item label="徽章 Key">
              <n-input v-model:value="revokeForm.badgeKey" placeholder="例如 founder" />
            </n-form-item>
            <n-button type="error" block @click="handleRevoke" :loading="loading">撤销徽章</n-button>
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>