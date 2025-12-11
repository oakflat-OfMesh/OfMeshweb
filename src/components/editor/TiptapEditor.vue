<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { 
  Bold, Italic, List, ListOrdered, Quote, Code, 
  Image as ImageIcon, Heading1, Heading2, Undo, Redo
} from 'lucide-vue-next'
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '在此输入正文内容，支持 Markdown 语法...',
    }),
    Link.configure({ openOnClick: false }),
    Image,
  ],
  content: props.modelValue,
  editorProps: {
    // ✨ 这里的 prose 样式确保了输入的内容排版好看
    // min-h-[500px] 保证了足够的高度
    attributes: {
      class: 'prose prose-slate dark:prose-invert prose-lg max-w-none min-h-[500px] focus:outline-none'
    }
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (newVal) => {
  if (editor.value && newVal !== editor.value.getHTML()) {
    editor.value.commands.setContent(newVal)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// 辅助函数：简化模板中的 class 绑定
const btnClass = (isActive: boolean = false) => [
  'p-2.5 rounded-xl transition-all duration-200', // 基础样式：加大内边距和圆角
  isActive 
    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 shadow-sm' 
    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 hover:text-indigo-600'
]

// 动作处理
const actions = {
  h1: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
  h2: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
  bold: () => editor.value?.chain().focus().toggleBold().run(),
  italic: () => editor.value?.chain().focus().toggleItalic().run(),
  bullet: () => editor.value?.chain().focus().toggleBulletList().run(),
  ordered: () => editor.value?.chain().focus().toggleOrderedList().run(),
  quote: () => editor.value?.chain().focus().toggleBlockquote().run(),
  code: () => editor.value?.chain().focus().toggleCodeBlock().run(),
  undo: () => editor.value?.chain().focus().undo().run(),
  redo: () => editor.value?.chain().focus().redo().run(),
  image: () => {
    const url = window.prompt('请输入图片 URL')
    if (url) editor.value?.chain().focus().setImage({ src: url }).run()
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-if="editor" class="sticky top-24 z-20 flex flex-wrap items-center gap-1.5 p-2 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm transition-all">
      
      <button @click="actions.h1" :class="btnClass(editor.isActive('heading', { level: 1 }))">
        <Heading1 :size="20" />
      </button>
      <button @click="actions.h2" :class="btnClass(editor.isActive('heading', { level: 2 }))">
        <Heading2 :size="20" />
      </button>
      
      <div class="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>

      <button @click="actions.bold" :class="btnClass(editor.isActive('bold'))">
        <Bold :size="20" />
      </button>
      <button @click="actions.italic" :class="btnClass(editor.isActive('italic'))">
        <Italic :size="20" />
      </button>
      
      <div class="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>

      <button @click="actions.bullet" :class="btnClass(editor.isActive('bulletList'))">
        <List :size="20" />
      </button>
      <button @click="actions.ordered" :class="btnClass(editor.isActive('orderedList'))">
        <ListOrdered :size="20" />
      </button>
      
      <div class="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>

      <button @click="actions.quote" :class="btnClass(editor.isActive('blockquote'))">
        <Quote :size="20" />
      </button>
      <button @click="actions.code" :class="btnClass(editor.isActive('codeBlock'))">
        <Code :size="20" />
      </button>
      <button @click="actions.image" :class="btnClass()">
        <ImageIcon :size="20" />
      </button>

      <div class="flex-1"></div> <button @click="actions.undo" :class="btnClass()">
        <Undo :size="20" />
      </button>
      <button @click="actions.redo" :class="btnClass()">
        <Redo :size="20" />
      </button>

    </div>

    <EditorContent :editor="editor" class="min-h-[500px] px-2" />
  </div>
</template>

<style scoped>
/* Tiptap Placeholder 样式调整 */
:deep(.tiptap p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #94a3b8; /* slate-400 */
  pointer-events: none;
  height: 0;
  font-style: italic;
}

/* 移除之前的 @apply 样式，防止报错 */
</style>