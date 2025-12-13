<script setup>
import { onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';
// ✅ 新增：引入 Naive UI 的核心配置组件
import { NConfigProvider, NMessageProvider, NDialogProvider, NNotificationProvider, zhCN, dateZhCN } from 'naive-ui';

// === 保持你原来的引用路径不动 ===
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import SettingsModal from '@/components/SettingsModal.vue';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const userStore = useUserStore();

// 保持你原来的逻辑：刷新拉取数据
onMounted(() => {
  if (userStore.token) {
    userStore.fetchCurrentUser();
  }
});
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          
          <div 
            class="min-h-screen transition-colors duration-500 font-sans"
            :class="[
              !route.meta.hideNavbar ? 'bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-200 flex flex-col' : ''
            ]"
          >
            
            <TheNavbar v-if="!route.meta.hideNavbar" />
            
            <div :class="{ 'flex-1': !route.meta.hideNavbar }">
              <RouterView v-slot="{ Component }">
                <Transition name="page" mode="out-in">
                  <component :is="Component" />
                </Transition>
              </RouterView>
            </div>
            
            <TheFooter v-if="!route.meta.hideNavbar" />
            
          </div>

          <SettingsModal />
          </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
/* 保持原样 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>