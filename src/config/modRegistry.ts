import { defineAsyncComponent } from 'vue';
import type { Component } from 'vue'; // ✅ 引入 Vue 组件类型

// 组件注册表：Key -> 异步加载组件
// ✅ 显式声明类型：这是一个键是字符串，值是组件的对象
export const customComponents: Record<string, Component> = {
  
  // === ⚙️ 机械动力 (Create) 专属组件 ===
  
  // 1. 蓝图市场 (对应 Tab: blueprints)
  'create_blueprints': defineAsyncComponent(() => 
    import('@/components/mod-detail/custom/create/CreateBlueprints.vue')
  ),

  // 2. 思索系统 (对应 Tab: ponder)
  'create_ponder': defineAsyncComponent(() => 
    import('@/components/mod-detail/custom/create/CreatePonder.vue')
  ),

  // 3. 工程师助手 (对应 Sidebar: sidebarWidget)
  // ⚠️ 注意：如果你还没有创建 EngineerAssistant.vue 文件，请保持注释，否则会报错
  // 'create_assistant': defineAsyncComponent(() => 
  //   import('@/components/mod-detail/custom/create/EngineerAssistant.vue')
  // ),

  // === 🌲 (示例) 暮色森林组件占位 ===
  // 'twilight_boss_map': defineAsyncComponent(() => 
  //   import('@/components/mod-detail/custom/twilight/BossMap.vue')
  // ),
};