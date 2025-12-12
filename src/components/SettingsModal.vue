<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSettings } from '@/composables/useSettings';
import { useAuth } from '@/composables/useAuth';
import { 
  X, Shield, User, Camera, Mail, Bell, Save, Megaphone 
} from 'lucide-vue-next';

const { isSettingsOpen, closeSettings } = useSettings();
const { userProfile } = useAuth(); 

// === 样式常量 ===
const inputClass = "w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400";

const activeTab = ref('profile'); 
const tabs = [
  { id: 'profile', label: '个人资料', icon: User },
  { id: 'security', label: '账号安全', icon: Shield },
  // ✅ 修改图标为 Bell (通知)，更符合语境
  { id: 'preference', label: '偏好设置', icon: Bell }, 
];

const profileForm = ref({
  nickname: userProfile.value?.username || '',
  bio: userProfile.value?.bio || '',
  email: 'user@ofmesh.com' 
});

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// ✅ 新增：偏好设置表单
const preferenceForm = ref({
  marketingEmail: true, // 默认接收
  communityDigest: false
});

const loading = ref(false);

watch(isSettingsOpen, (newVal) => {
  if (newVal) {
    profileForm.value.nickname = userProfile.value?.username || '';
  }
});

const handleSave = async () => {
  loading.value = true;
  // 这里后续可以调用后端 API: POST /api/users/preferences
  console.log('保存偏好设置:', preferenceForm.value);
  
  setTimeout(() => {
    loading.value = false;
    alert('✅ 设置已保存！');
    closeSettings();
  }, 800);
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out" 
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isSettingsOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div 
        class="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-500" 
        @click="closeSettings"
      ></div>

      <div 
        class="relative w-full max-w-2xl bg-white/80 dark:bg-[#18181b]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row h-[600px] max-h-[90vh] transition-transform duration-500 delay-75"
        :class="isSettingsOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'"
      >
        
        <div class="w-full md:w-64 bg-slate-50/50 dark:bg-white/5 border-r border-slate-200/50 dark:border-white/5 flex flex-col">
          <div class="p-6 border-b border-slate-200/50 dark:border-white/5">
            <h3 class="text-lg font-bold text-slate-800 dark:text-white">设置</h3>
            <p class="text-xs text-slate-500 mt-1">管理您的账号选项</p>
          </div>
          
          <div class="flex-1 p-3 space-y-1 overflow-y-auto">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all"
              :class="activeTab === tab.id 
                ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 shadow-sm ring-1 ring-indigo-200 dark:ring-transparent' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'"
            >
              <component :is="tab.icon" :size="18" />
              {{ tab.label }}
            </button>
          </div>
        </div>

        <div class="flex-1 flex flex-col min-w-0">
          
          <div class="px-6 py-4 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between shrink-0">
            <h4 class="font-bold text-slate-800 dark:text-white text-base">
              {{ tabs.find(t => t.id === activeTab)?.label }}
            </h4>
            <button @click="closeSettings" class="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              <X :size="20" />
            </button>
          </div>

          <div class="flex-1 p-6 overflow-y-auto custom-scrollbar">
            
            <div v-if="activeTab === 'profile'" class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="relative group cursor-pointer">
                  <div class="w-20 h-20 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden ring-4 ring-white dark:ring-[#18181b]">
                    <img v-if="userProfile?.avatar" :src="userProfile.avatar" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400">
                      {{ userProfile?.username?.charAt(0).toUpperCase() }}
                    </div>
                  </div>
                  <div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera class="text-white" :size="24" />
                  </div>
                </div>
                <div>
                  <button class="text-sm font-bold text-indigo-600 hover:text-indigo-500 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10">更换头像</button>
                  <p class="text-xs text-slate-500 mt-1.5">支持 JPG, PNG, GIF. 最大 2MB.</p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-slate-500 dark:text-slate-400">显示昵称</label>
                  <input v-model="profileForm.nickname" type="text" :class="inputClass" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-slate-500 dark:text-slate-400">个人简介</label>
                  <textarea v-model="profileForm.bio" rows="3" :class="inputClass" class="resize-none" placeholder="写点什么介绍一下自己..."></textarea>
                </div>
                <div class="space-y-1.5">
                   <label class="text-xs font-bold text-slate-500 dark:text-slate-400">绑定邮箱 (只读)</label>
                   <div class="relative">
                      <Mail :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input v-model="profileForm.email" type="text" disabled :class="inputClass" class="pl-10 opacity-60 cursor-not-allowed" />
                   </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'security'" class="space-y-6">
              <div class="bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl p-4 flex gap-3">
                 <Shield class="text-orange-500 shrink-0" :size="20" />
                 <div>
                    <h5 class="text-sm font-bold text-orange-800 dark:text-orange-200">安全提示</h5>
                    <p class="text-xs text-orange-600 dark:text-orange-400/80 mt-1">定期修改密码可以有效保护您的账号安全。如果您发现异常登录，请立即联系管理员。</p>
                 </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-slate-500 dark:text-slate-400">当前密码</label>
                  <input v-model="passwordForm.oldPassword" type="password" :class="inputClass" placeholder="验证您的身份" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                   <div class="space-y-1.5">
                     <label class="text-xs font-bold text-slate-500 dark:text-slate-400">新密码</label>
                     <input v-model="passwordForm.newPassword" type="password" :class="inputClass" placeholder="至少 8 位" />
                   </div>
                   <div class="space-y-1.5">
                     <label class="text-xs font-bold text-slate-500 dark:text-slate-400">确认新密码</label>
                     <input v-model="passwordForm.confirmPassword" type="password" :class="inputClass" placeholder="再次输入" />
                   </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'preference'" class="space-y-6">
              
              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 transition-colors hover:border-indigo-200 dark:hover:border-indigo-500/30">
                 <div class="flex items-center gap-4">
                    <div class="p-2.5 bg-white dark:bg-black rounded-lg shadow-sm text-indigo-500">
                       <Megaphone :size="20" />
                    </div>
                    <div>
                       <p class="text-sm font-bold text-slate-900 dark:text-white">推广与活动邮件</p>
                       <p class="text-xs text-slate-500 mt-0.5">接收来自 OfMesh 的新功能通知、活动邀请和精选内容。</p>
                    </div>
                 </div>
                 
                 <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="preferenceForm.marketingEmail" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                 </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 transition-colors hover:border-indigo-200 dark:hover:border-indigo-500/30">
                 <div class="flex items-center gap-4">
                    <div class="p-2.5 bg-white dark:bg-black rounded-lg shadow-sm text-green-500">
                       <Mail :size="20" />
                    </div>
                    <div>
                       <p class="text-sm font-bold text-slate-900 dark:text-white">社区精选周报</p>
                       <p class="text-xs text-slate-500 mt-0.5">每周一次，为您汇总社区内最热门的模组和话题。</p>
                    </div>
                 </div>
                 
                 <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="preferenceForm.communityDigest" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                 </label>
              </div>

            </div>

          </div>

          <div class="px-6 py-4 border-t border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-end gap-3 shrink-0">
            <button @click="closeSettings" class="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-lg transition-colors">
              取消
            </button>
            <button 
              @click="handleSave"
              :disabled="loading"
              class="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save :size="16" v-if="!loading" />
              <span v-if="loading" class="animate-spin mr-1">⚪</span>
              {{ loading ? '保存中...' : '保存更改' }}
            </button>
          </div>

        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 9999px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>