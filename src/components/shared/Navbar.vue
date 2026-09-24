<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
      isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm' : 'bg-white/60 backdrop-blur-xs'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo Brand -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
          Ez
        </div>
        <div class="flex flex-col">
          <span class="text-2xl font-black tracking-tight text-slate-900 leading-none">
            Ez<span class="text-gradient-orange">Biz</span>
          </span>
          <span class="text-[10px] font-bold uppercase tracking-widest text-orange-500">Thuê Giải Pháp - An Tâm Vận Hành</span>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
        <a href="#services" class="hover:text-orange-500 transition-colors">Dịch Vụ</a>
        <a href="#workflow" class="hover:text-orange-500 transition-colors">Quy Trình</a>
        <a href="#stats" class="hover:text-orange-500 transition-colors">Cam Kết</a>
        <a href="#pricing" class="hover:text-orange-500 transition-colors">Bảng Giá</a>
        <a href="#faq" class="hover:text-orange-500 transition-colors">Hỏi Đáp</a>
      </nav>

      <!-- Action Buttons & Hotline -->
      <div class="flex items-center gap-3">
        <a href="tel:19001234" class="hidden sm:flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-200 hover:bg-orange-100 transition-all">
          <span>📞</span>
          <span>1900 1234</span>
        </a>

        <a-button 
          type="primary" 
          size="large" 
          shape="round"
          class="btn-primary-butl border-none px-6"
          href="#pricing"
        >
          Đặt Dịch Vụ Ngay
        </a-button>
      </div>
    </div>
  </header>
</template>
