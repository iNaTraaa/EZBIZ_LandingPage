<script setup>
import { onMounted, ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { animateFadeIn } = useScrollAnimation()
const ctaCard = ref(null)

onMounted(() => {
  if (ctaCard.value) animateFadeIn(ctaCard.value)
})
</script>

<template>
  <section class="py-20 relative bg-slate-50">
    <div class="max-w-7xl mx-auto px-6">
      <div 
        ref="ctaCard"
        class="rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl text-white"
      >
        <div class="relative z-10 max-w-3xl mx-auto">
          <a-tag color="cyan" class="font-extrabold uppercase mb-4 px-4 py-1 text-xs">
            {{ $t('cta.tag') }}
          </a-tag>

          <h2 class="text-3xl sm:text-5xl font-black leading-tight text-white">
            {{ $t('cta.title') }}
          </h2>
          <p class="mt-4 text-sky-100 text-base sm:text-lg font-medium">
            {{ $t('cta.desc') }}
          </p>

          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a-button 
              type="primary" 
              size="large" 
              shape="round" 
              class="!bg-white !text-sky-600 hover:!bg-sky-50 !border-none !h-14 !px-8 text-base font-extrabold shadow-lg w-full sm:w-auto"
              href="#pricing"
            >
              {{ $t('cta.btnPrimary') }}
            </a-button>

            <a-button 
              size="large" 
              shape="round" 
              class="!bg-sky-700/60 hover:!bg-sky-700 !text-white !border-sky-300/50 !h-14 !px-8 text-base font-extrabold w-full sm:w-auto"
              href="tel:19001234"
            >
              {{ $t('cta.btnHotline') }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
