<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import ggPlaySvg from '@/assets/img/gg_play.svg'
import appstoreSvg from '@/assets/img/appstore.svg'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()
const workflowSection = ref(null)

const steps = computed(() => [
  {
    stepNum: '01',
    title: t('workflow.step1.title'),
    description: t('workflow.step1.desc')
  },
  {
    stepNum: '02',
    title: t('workflow.step2.title'),
    description: t('workflow.step2.desc')
  },
  {
    stepNum: '03',
    title: t('workflow.step3.title'),
    description: t('workflow.step3.desc')
  },
  {
    stepNum: '04',
    title: t('workflow.step4.title'),
    description: t('workflow.step4.desc')
  }
])

onMounted(() => {
  if (workflowSection.value) animateFadeIn(workflowSection.value)
})
</script>

<template>
  <section id="workflow" class="py-20 sm:py-28 bg-gradient-to-b from-white via-sky-50/20 to-slate-50 relative overflow-hidden">
    <div ref="workflowSection" class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">
          {{ $t('workflow.sectionTag') }}
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {{ $t('workflow.titlePrefix') }} <span class="text-gradient-blue">{{ $t('workflow.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('workflow.subtitle') }}
        </p>
      </div>

      <!-- Steps Grid Container -->
      <div class="relative pt-7">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-6 relative">
          <div 
            v-for="(step, idx) in steps" 
            :key="idx"
            class="ezbiz-card p-6 sm:p-7 pt-12 sm:pt-14 text-center relative z-10 bg-white border border-sky-100/90 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
          >
            <!-- Step Number Badge (Positioned at top center) -->
            <div class="absolute -top-[28px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-sky-400/30 group-hover:scale-110 transition-transform duration-300 z-20">
              {{ step.stepNum }}
            </div>

            <!-- Inter-card Connecting Line & Arrow (Centered vertically in the gap between Card N right edge and Card N+1 left edge) -->
            <div 
              v-if="idx < 3" 
              class="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -right-6 w-6 z-30 pointer-events-none"
            >
              <div class="w-full h-[2px] bg-gradient-to-r from-sky-300 to-sky-400"></div>
            <!-- icon > SVG -->
              <!-- <svg class="w-2.5 h-2.5 text-sky-500 -ml-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg> -->
            </div>

            <!-- Content Area (Top-aligned so titles stay horizontally aligned across cards of varying text lengths) -->
            <div class="flex-1 flex flex-col justify-start pt-2">
              <!-- Step Title -->
              <h3 class="text-base sm:text-lg font-black text-slate-900 mb-3 leading-snug group-hover:text-sky-600 transition-colors">
                {{ step.title }}
              </h3>

              <!-- Description -->
              <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {{ step.description }}
              </p>
              
               <div class="pt-4 mt-6 border-t border-slate-100/80 flex items-center justify-center gap-2 min-h-[44px]">
              <div v-if="idx === 0" class="flex items-center gap-2">
                <img :src="appstoreSvg" alt="App Store" class="h-6 sm:h-7 opacity-90 hover:opacity-100 transition-opacity" />
                <img :src="ggPlaySvg" alt="Google Play" class="h-6 sm:h-7 opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            </div>

            <!-- Bottom Divider & Store Badges for Step 1 -->
            <!-- <div class="pt-4 mt-6 border-t border-slate-100/80 flex items-center justify-center gap-2 min-h-[44px]">
              <div v-if="idx === 0" class="flex items-center gap-2">
                <img :src="appstoreSvg" alt="App Store" class="h-6 sm:h-7 opacity-90 hover:opacity-100 transition-opacity" />
                <img :src="ggPlaySvg" alt="Google Play" class="h-6 sm:h-7 opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div> -->

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
