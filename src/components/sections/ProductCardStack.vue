<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

import img1 from '@/assets/img/demo_stack/demo_stack_1.jpg'
import img2 from '@/assets/img/demo_stack/demo_stack_2.jpg'
import img3 from '@/assets/img/demo_stack/demo_stack_3.jpg'
import img4 from '@/assets/img/demo_stack/demo_stack_4.jpg'

const activeIndex = ref(0)
const cardsRef = ref([])

const cards = [
  { id: 1, image: img1, alt: 'EzBiz Demo 1' },
  { id: 2, image: img2, alt: 'EzBiz Demo 2' },
  { id: 3, image: img3, alt: 'EzBiz Demo 3' },
  { id: 4, image: img4, alt: 'EzBiz Demo 4' }
]

const getCardStyle = (index) => {
  const total = cards.length
  // Calculate relative position based on activeIndex
  const diff = (index - activeIndex.value + total) % total

  // Keep 100% full scale so images are never shrunk or distorted
  const translateY = diff * 18
  const opacity = diff > 2 ? 0 : 1 - diff * 0.2
  const zIndex = total - diff

  return {
    transform: `translateY(${translateY}px)`,
    opacity,
    zIndex,
    pointerEvents: diff === 0 ? 'auto' : 'none'
  }
}

const setActiveCard = (index) => {
  if (index === activeIndex.value) return
  activeIndex.value = index

  // Trigger smooth GSAP transition without distorting scale
  const currentRef = cardsRef.value[index]
  if (currentRef) {
    gsap.fromTo(
      currentRef,
      { y: 30, opacity: 0.5 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
  }
}

const nextCard = () => {
  setActiveCard((activeIndex.value + 1) % cards.length)
}

const prevCard = () => {
  setActiveCard((activeIndex.value - 1 + cards.length) % cards.length)
}

onMounted(() => {
  // Initial entrance animation
  gsap.from('.stack-card-item', {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="relative w-full max-w-md mx-auto py-2">
    <!-- Top Nav Controls -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping"></span>
        <span class="text-xs font-extrabold uppercase tracking-wider text-sky-700">EzBiz App Showcase</span>
      </div>

      <!-- Navigation Arrows -->
      <div class="flex items-center gap-2">
        <button 
          @click="prevCard" 
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 flex items-center justify-center text-sm font-bold border border-slate-200 transition-colors cursor-pointer"
        >
          ‹
        </button>
        <span class="text-xs font-bold text-slate-500 font-mono">{{ activeIndex + 1 }}/{{ cards.length }}</span>
        <button 
          @click="nextCard" 
          class="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 flex items-center justify-center text-sm font-bold border border-slate-200 transition-colors cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Stack Cards Container -->
    <div class="relative min-h-[440px] sm:min-h-[480px] w-full">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        ref="cardsRef"
        @click="setActiveCard(index)"
        :style="getCardStyle(index)"
        class="stack-card-item absolute top-0 left-0 right-0 rounded-2xl bg-white p-2 border border-sky-200/80 shadow-2xl transition-all duration-300 cursor-pointer select-none"
      >
        <img 
          :src="card.image" 
          :alt="card.alt" 
          class="w-full h-auto rounded-xl object-contain block shadow-xs border border-slate-100" 
        />
      </div>
    </div>

    <!-- Indicator Dots -->
    <div class="flex items-center justify-center gap-2 mt-6">
      <button
        v-for="(_, index) in cards"
        :key="index"
        @click="setActiveCard(index)"
        :class="[
          'h-2 rounded-full transition-all duration-300 cursor-pointer',
          activeIndex === index ? 'w-8 bg-sky-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
        ]"
      ></button>
    </div>
  </div>
</template>
