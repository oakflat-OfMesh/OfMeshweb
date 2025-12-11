<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft, ImagePlus, X, Hash, Save } from 'lucide-vue-next'
import TiptapEditor from '@/components/editor/TiptapEditor.vue'

const router = useRouter()

const form = ref({
  title: '',
  content: '',
  channel: 'discuss',
  tags: [] as string[],
  coverImage: ''
})

const tagInput = ref('')

const channels = [
  { id: 'discuss', label: '综合讨论', desc: '分享观点、模组评测或闲聊' },
  { id: 'question', label: '求助问答', desc: '遇到 Bug 或机制问题来这问' },
  { id: 'showcase', label: '作品展示', desc: '晒出你的建筑、红石机器或整合包' },
  { id: 'dev', label: '模组开发', desc: 'Java 代码、Json 配置与材质绘制' },
]

const addTag = () => {
  const val = tagInput.value.trim()
  if (val && !form.value.tags.includes(val) && form.value.tags.length < 5) {
    form.value.tags.push(val)
  }
  tagInput.value = ''
}

const removeTag = (tag: string) => {
  form.value.tags = form.value.tags.filter(t => t !== tag)
}

const handlePublish = async () => {
  if (!form.value.title || !form.value.content) {
    alert('请填写标题和内容')
    return
  }
  console.log('Publishing:', form.value)
  // 模拟发布延迟
  setTimeout(() => {
    alert('发布成功！')
    router.push('/community')
  }, 500)
}
</script>

<template>
  <div class="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-[#09090b]">
    <div class="container mx-auto max-w-[1400px] px-6">
      
      <div class="flex items-center justify-between mb-10">
        <button @click="router.back()" class="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold text-lg">
          <ChevronLeft :size="24" /> 返回社区
        </button>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 text-slate-400 text-sm font-medium" v-if="form.content.length > 0">
            <Save :size="16" /> 已自动保存草稿
          </div>
          <button @click="handlePublish" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
            发布帖子
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-8 space-y-8">
          
          <input 
            v-model="form.title"
            type="text" 
            placeholder="请输入标题..." 
            class="w-full bg-transparent text-4xl md:text-5xl font-black text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 border-none outline-none focus:ring-0 px-0 py-4 leading-tight tracking-tight"
          />

          <div class="min-h-[600px]">
            <TiptapEditor v-model="form.content" />
          </div>

        </div>

        <div class="lg:col-span-4 space-y-8 sticky top-28">
          
          <div class="bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-5">选择板块</h3>
            <div class="space-y-3">
              <label 
                v-for="c in channels" :key="c.id"
                class="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2"
                :class="form.channel === c.id 
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 dark:border-indigo-500/50' 
                  : 'border-transparent bg-slate-50 dark:bg-white/5 hover:bg-slate-100'"
              >
                <div class="mt-1 relative flex items-center justify-center w-5 h-5 rounded-full border-2"
                  :class="form.channel === c.id ? 'border-indigo-600' : 'border-slate-300'"
                >
                  <div v-if="form.channel === c.id" class="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                </div>
                <div>
                  <div class="font-bold text-base text-slate-900 dark:text-white">{{ c.label }}</div>
                  <div class="text-sm text-slate-500 mt-1">{{ c.desc }}</div>
                </div>
              </label>
            </div>
          </div>

          <div class="bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-5 flex justify-between items-center">
              添加标签
              <span class="text-sm font-normal text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-lg">{{ form.tags.length }}/5</span>
            </h3>
            
            <div class="flex flex-wrap gap-2 mb-4 min-h-[30px]">
              <span v-for="tag in form.tags" :key="tag" class="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-bold group animate-in fade-in zoom-in duration-200">
                #{{ tag }}
                <button @click="removeTag(tag)" class="p-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-500/50 rounded-full transition-colors"><X :size="14" /></button>
              </span>
              <span v-if="form.tags.length === 0" class="text-sm text-slate-400 italic py-1.5">暂无标签...</span>
            </div>

            <div class="relative flex items-center bg-slate-50 dark:bg-white/5 rounded-2xl px-4 py-3 border border-slate-200 dark:border-white/10 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
              <Hash :size="18" class="text-slate-400 mr-2" />
              <input 
                v-model="tagInput"
                @keydown.enter.prevent="addTag"
                type="text" 
                placeholder="输入标签后回车..." 
                class="bg-transparent border-none outline-none text-base w-full text-slate-800 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div class="bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-5">文章封面</h3>
            <div 
              class="w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group"
            >
              <ImagePlus :size="32" class="mb-3 group-hover:scale-110 transition-transform" />
              <span class="text-sm font-bold">点击上传图片</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>