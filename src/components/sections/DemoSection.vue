<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

import demo1 from '@/assets/img/demo/demo_1.mp4'
import demo2 from '@/assets/img/demo/demo_2.mp4'
import demo3 from '@/assets/img/demo/demo_3.mp4'
import demo4 from '@/assets/img/demo/demo_4.mp4'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()

const demoContainer = ref(null)
const videoPlayer = ref(null)
const isMuted = ref(true)
const activeTab = ref(0)

const tabs = computed(() => [
  {
    id: 0,
    title: t('demo.tab0.title'),
    icon: '📱',
    badge: t('demo.tab0.badge'),
    heading: t('demo.tab0.heading'),
    desc: t('demo.tab0.desc'),
    video: demo1,
    features: [
      t('demo.tab0.f1'),
      t('demo.tab0.f2'),
      t('demo.tab0.f3')
    ]
  },
  {
    id: 1,
    title: t('demo.tab1.title'),
    icon: '📦',
    badge: t('demo.tab1.badge'),
    heading: t('demo.tab1.heading'),
    desc: t('demo.tab1.desc'),
    video: demo2,
    features: [
      t('demo.tab1.f1'),
      t('demo.tab1.f2'),
      t('demo.tab1.f3')
    ]
  },
  {
    id: 2,
    title: t('demo.tab2.title'),
    icon: '📊',
    badge: t('demo.tab2.badge'),
    heading: t('demo.tab2.heading'),
    desc: t('demo.tab2.desc'),
    video: demo3,
    features: [
      t('demo.tab2.f1'),
      t('demo.tab2.f2'),
      t('demo.tab2.f3')
    ]
  },
  {
    id: 3,
    title: t('demo.tab3.title'),
    icon: '✨',
    badge: t('demo.tab3.badge'),
    heading: t('demo.tab3.heading'),
    desc: t('demo.tab3.desc'),
    video: demo4,
    features: [
      t('demo.tab3.f1'),
      t('demo.tab3.f2'),
      t('demo.tab3.f3')
    ]
  }
])

const toggleMute = () => {
  if (videoPlayer.value) {
    videoPlayer.value.muted = !videoPlayer.value.muted
    isMuted.value = videoPlayer.value.muted
  }
}

const selectTab = (idx) => {
  activeTab.value = idx
}

watch(activeTab, () => {
  if (videoPlayer.value) {
    videoPlayer.value.currentTime = 0
    videoPlayer.value.play().catch(() => {})
  }
})

onMounted(() => {
  if (demoContainer.value) {
    animateFadeIn(demoContainer.value)
  }
})
</script>

<template>
  <section id="demo" class="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div ref="demoContainer" class="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">
          {{ $t('demo.sectionTag') }}
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {{ $t('demo.titlePrefix') }} <span class="text-gradient-blue">{{ $t('demo.titleHighlight') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('demo.subtitle') }}
        </p>
      </div>

      <!-- Tabs Navigation Bar -->
      <div class="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="selectTab(index)"
          :class="[
            'px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 cursor-pointer border shadow-sm',
            activeTab === index
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-105'
              : 'bg-white text-slate-600 border-sky-100 hover:bg-sky-50/80 hover:text-sky-600 hover:border-sky-200'
          ]"
        >
          <span class="text-base sm:text-lg">{{ tab.icon }}</span>
          <span>{{ tab.title }}</span>
        </button>
      </div>

      <!-- Main Interactive Demo Showcase Container -->
      <div class="ezbiz-card p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border-2 border-sky-100 shadow-xl relative overflow-hidden max-w-6xl mx-auto">
        
        <!-- Ambient Backlight Blur -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          
          <!-- LEFT COLUMN: Active Tab Feature Description (7 columns on LG) -->
          <div class="lg:col-span-7 space-y-6 text-left">
            
            <!-- Tag Badge -->
            <div>
              <span class="px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full bg-sky-50 text-sky-600 border border-sky-200 shadow-xs inline-flex items-center gap-2">
                <span>{{ tabs[activeTab].icon }}</span>
                <span>{{ tabs[activeTab].badge }}</span>
              </span>
            </div>

            <!-- Title & Description -->
            <h3 class="text-2xl sm:text-4xl font-black text-slate-900 leading-snug tracking-tight">
              {{ tabs[activeTab].heading }}
            </h3>

            <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {{ tabs[activeTab].desc }}
            </p>

            <!-- Key Points Checklist -->
            <div class="pt-2 pb-4 border-y border-sky-100/80 space-y-3">
              <div 
                v-for="(feature, fIdx) in tabs[activeTab].features" 
                :key="fIdx"
                class="flex items-start gap-3 text-slate-700 font-semibold text-xs sm:text-sm"
              >
                <span class="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                  ✓
                </span>
                <span>{{ feature }}</span>
              </div>
            </div>

            <!-- Interactive Action & Sound Button Controls -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button
                @click="toggleMute"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-800 text-xs font-extrabold transition-colors border border-slate-200 shadow-xs cursor-pointer"
              >
                <span>{{ isMuted ? '🔇 Bật Âm Thanh Video' : '🔊 Tắt Âm Thanh' }}</span>
              </button>

              <a 
                href="#hero" 
                class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-extrabold hover:bg-sky-600 transition-colors shadow-md shadow-slate-900/10"
              >
                <span>Trải Nghiệm Ngay</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

          </div>

          <!-- RIGHT COLUMN: Realistic Mobile Phone Mockup Frame (5 columns on LG) -->
          <div class="lg:col-span-5 flex justify-center items-center py-4">
            
            <!-- PHONE MOCKUP SHELL (Full Bleed Edge-to-Edge) -->
            <div class="relative w-[280px] xs:w-[300px] sm:w-[320px] aspect-[9/19] rounded-[38px] sm:rounded-[44px] bg-slate-950 p-1.5 shadow-2xl shadow-sky-500/20 ring-1 ring-slate-700/60 border-2 border-slate-700/80 flex flex-col justify-between overflow-hidden group">
              
              <!-- Side Buttons (Left & Right hardware buttons) -->
              <div class="absolute -left-[14px] top-24 w-1 h-10 bg-slate-700 rounded-l-md"></div>
              <div class="absolute -left-[14px] top-38 w-1 h-10 bg-slate-700 rounded-l-md"></div>
              <div class="absolute -right-[14px] top-32 w-1 h-14 bg-slate-700 rounded-r-md"></div>

              <!-- Top Camera Punch-Hole Dot -->
              <div class="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 bg-black rounded-full border border-slate-700 shadow-sm flex items-center justify-center pointer-events-none">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
              </div>

              <!-- Screen Reflection Glare Overlay -->
              <div class="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-20"></div>

              <!-- PHONE SCREEN DISPLAY AREA (White App Background) -->
              <div class="relative w-full h-full rounded-[32px] overflow-hidden bg-white flex items-center justify-center border border-slate-200">
                
                <!-- Embedded Demo Video Player -->
                <video
                  ref="videoPlayer"
                  :src="tabs[activeTab].video"
                  autoplay
                  loop
                  muted
                  playsinline
                  class="w-full h-full object-cover rounded-[32px] transition-all duration-500"
                ></video>

                <!-- Floating Play / Sound Overlay Button -->
                <button
                  @click="toggleMute"
                  class="absolute top-12 right-3 z-30 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center text-xs shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  :title="isMuted ? 'Unmute' : 'Mute'"
                >
                  <span>{{ isMuted ? '🔇' : '🔊' }}</span>
                </button>

              </div>

              <!-- Bottom Home Indicator Line -->
              <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-30"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
