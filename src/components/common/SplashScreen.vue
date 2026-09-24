<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import logoEb from '@/assets/img/logo_eb.png'

const isVisible = ref(true)
const splashContainer = ref(null)

onMounted(() => {
  // Lock body scroll while splash screen is visible
  document.body.style.overflow = 'hidden'

  // Preloader duration before triggering smooth GSAP exit
  gsap.delayedCall(1.4, () => {
    gsap.to(splashContainer.value, {
      opacity: 0,
      yPercent: -100,
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: () => {
        isVisible.value = false
        // Unlock body scroll
        document.body.style.overflow = ''
      }
    })
  })
})
</script>

<template>
  <div 
    v-if="isVisible"
    ref="splashContainer"
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 via-white to-sky-100 select-none overflow-hidden"
  >
    <!-- Background Blur Glows -->
    <!-- <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl pointer-events-none"></div> -->

    <!-- Center Content -->
    <div class="relative z-10 flex flex-col items-center text-center px-6">
      <!-- Animated Logo Container -->
      <div class="relative mb-6">
        <div class="w-34 h-34 flex items-center justify-center relative z-10">
          <img 
            :src="logoEb" 
            alt="EzBiz Logo" 
            class="w-full h-full object-contain"
          />
        </div>
      </div>

      <!-- Brand Name -->
      <!-- <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-1">
        <span class="text-gradient-blue">EZBIZ</span>
      </h1>
      <p class="text-xs font-bold uppercase tracking-widest text-sky-600 mb-8">
        Quản Trị Doanh Nghiệp Thông Minh
      </p> -->

      <!-- Glowing Orbit Spinner (No % text) -->
      <div class="relative w-14 h-14 flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full border-2 border-transparent border-b-sky-600 animate-[spin_1.2s_linear_infinite]"></div>
       
      </div>
    </div>
  </div>
</template>
