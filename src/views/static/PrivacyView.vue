<script setup>
import { ShieldCheck } from 'lucide-vue-next';
</script>

<template>
  <div class="py-20 lg:py-28 px-6">
    <div class="container mx-auto max-w-3xl">
      
      <div class="mb-12 pb-8 border-b border-slate-200 dark:border-white/10">
        <div class="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
          <ShieldCheck :size="24" />
        </div>
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">隐私政策</h1>
        <p class="text-slate-500 dark:text-slate-400">
          最后更新时间：2025年6月1日
        </p>
      </div>

      <div class="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">
        
        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">1. 引言</h2>
          <p>
            欢迎使用 OfMesh（以下简称“我们”或“平台”）。我们非常重视您的隐私，并致力于保护您的个人信息。本隐私政策旨在向您说明我们在您使用 OfMesh 网站及相关服务时如何收集、使用、存储和分享您的信息。
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">2. 我们收集的信息</h2>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>账户信息：</strong> 当您注册时，我们可能会收集您的用户名、电子邮箱地址和加密后的密码。</li>
            <li><strong>使用数据：</strong> 我们会自动收集您与平台交互的数据，例如下载记录、收藏列表、评论内容以及您上传的模组文件。</li>
            <li><strong>设备信息：</strong> 为了优化体验和安全风控，我们可能会收集您的 IP 地址、浏览器类型和操作系统版本。</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">3. 信息的用途</h2>
          <p>我们收集的信息主要用于：</p>
          <ul class="list-disc pl-5 space-y-2">
            <li>提供、维护和改进我们的服务（例如：为您推荐可能感兴趣的模组）。</li>
            <li>处理您的上传请求和审核流程。</li>
            <li>向您发送与服务相关的通知（例如：审核结果、安全警报）。</li>
            <li>防止欺诈和滥用行为，确保社区安全。</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Cookie 技术</h2>
          <p>
            我们使用 Cookie 和类似技术来记住您的登录状态和偏好设置。您可以通过浏览器设置拒绝 Cookie，但这可能会导致部分功能无法正常使用。
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">5. 第三方服务</h2>
          <p>
            我们的服务可能包含指向第三方网站（如 GitHub、CurseForge、Modrinth）的链接。我们不对这些第三方网站的隐私做法负责，建议您在使用前阅读其隐私政策。
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">6. 免责声明</h2>
          <div class="p-4 bg-slate-100 dark:bg-white/5 rounded-xl text-sm">
            <p>
              OfMesh 是一个独立的第三方社区平台。我们不隶属于 Mojang Studios 或 Microsoft。
              <br/>
              "Minecraft" 是 Mojang Synergies AB 的商标。本平台上的所有模组资源其版权归原作者所有。
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">7. 联系我们</h2>
          <p>
            如果您对本隐私政策有任何疑问，请通过以下方式联系我们：<a href="mailto:support@ofmesh.com" class="text-indigo-600 hover:underline">support@ofmesh.com</a>
          </p>
        </section>

      </div>

    </div>
  </div>
</template>