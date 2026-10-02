<script setup>
import { onMounted, ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { animateCounter, animateFadeIn } = useScrollAnimation()

const stat1 = ref(null)
const stat2 = ref(null)
const stat3 = ref(null)
const stat4 = ref(null)
const statsContainer = ref(null)

onMounted(() => {
  if (statsContainer.value) animateFadeIn(statsContainer.value)
  if (stat1.value) animateCounter(stat1.value, 600, '+')
  if (stat2.value) animateCounter(stat2.value, 99.9, '%')
  if (stat3.value) animateCounter(stat3.value, 1, 'M+')
  if (stat4.value) animateCounter(stat4.value, 24, '/7')
})
</script>

<template>
  <section id="stats" class="pt-12 pb-16 sm:pt-14 sm:pb-20 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 text-white relative overflow-hidden shadow-inner">
    <!-- Overlay Pattern -->
    <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

    <div ref="statsContainer" class="max-w-7xl mx-auto px-6 relative z-10">
      
      <!-- Top Row Header with Side Gradient Accents -->
      <div class="flex items-center justify-center gap-4 max-w-md mx-auto mb-6 sm:mb-8">
        <div class="h-px flex-1 bg-gradient-to-r from-transparent to-white/35"></div>
        <span class="text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase px-4 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-xs whitespace-nowrap">
          {{ $t('stats.sectionTitle') }}
        </span>
        <div class="h-px flex-1 bg-gradient-to-l from-transparent to-white/35"></div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <!-- Stat Item 1 -->
        <div class="p-4">
          <div ref="stat1" class="text-4xl sm:text-5xl font-black text-white tracking-tight">0</div>
          <div class="mt-2 text-sm sm:text-base font-semibold text-sky-100">{{ $t('stats.item1') }}</div>
        </div>

        <!-- Stat Item 2 -->
        <div class="p-4 border-l border-sky-400/40">
          <div ref="stat2" class="text-4xl sm:text-5xl font-black text-white tracking-tight">0</div>
          <div class="mt-2 text-sm sm:text-base font-semibold text-sky-100">{{ $t('stats.item2') }}</div>
        </div>

        <!-- Stat Item 3 -->
        <div class="p-4 border-l border-sky-400/40">
          <div ref="stat3" class="text-4xl sm:text-5xl font-black text-white tracking-tight">0</div>
          <div class="mt-2 text-sm sm:text-base font-semibold text-sky-100">{{ $t('stats.item3') }}</div>
        </div>

        <!-- Stat Item 4 -->
        <div class="p-4 border-l border-sky-400/40">
          <div ref="stat4" class="text-4xl sm:text-5xl font-black text-white tracking-tight">0</div>
          <div class="mt-2 text-sm sm:text-base font-semibold text-sky-100">{{ $t('stats.item4') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
