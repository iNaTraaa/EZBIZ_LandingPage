<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const handleScroll = () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (height > 0) {
    scrollProgress.value = Math.min(Math.max((winScroll / height) * 100, 0), 100)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-1 bg-sky-100/60 z-50 overflow-hidden pointer-events-none">
    <div 
      class="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 shadow-sm shadow-sky-400/50 transition-all duration-150 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    ></div>
  </div>
</template>

