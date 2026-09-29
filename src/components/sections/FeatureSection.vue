<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useLazyVideoPreloader } from '@/composables/useLazyVideoPreloader'

import demo1 from '@/assets/img/demo/demo_1.mp4'
import demo2 from '@/assets/img/demo/demo_2.mp4'
import demo3 from '@/assets/img/demo/demo_3.mp4'
import demo4 from '@/assets/img/demo/demo_4.mp4'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()

const sectionHeader = ref(null)
const showcaseContainer = ref(null)
const featuresSectionRef = ref(null)

const activeFeatureIndex = ref(0)
const isPlaying = ref(true)

const mainFeatures = computed(() => [
  {
    id: 0,
    icon: '🛒',
    title: t('features.item1.title'),
    subtitle: t('features.item1.subtitle'),
    desc: t('features.item1.desc'),
    badge: t('features.item1.badge'),
    videoUrl: demo1,
    advantages: [
      { icon: '⚡', title: t('features.item1.adv1.title'), desc: t('features.item1.adv1.desc') },
      { icon: '📱', title: t('features.item1.adv2.title'), desc: t('features.item1.adv2.desc') },
      { icon: '🔲', title: t('features.item1.adv3.title'), desc: t('features.item1.adv3.desc') },
      { icon: '🖨️', title: t('features.item1.adv4.title'), desc: t('features.item1.adv4.desc') }
    ]
  },
  {
    id: 1,
    icon: '',
    title: t('features.item2.title'),
    subtitle: t('features.item2.subtitle'),
    desc: t('features.item2.desc'),
    badge: t('features.item2.badge'),
    videoUrl: demo2,
    advantages: [
      { icon: '📊', title: t('features.item2.adv1.title'), desc: t('features.item2.adv1.desc') },
      { icon: '🔥', title: t('features.item2.adv2.title'), desc: t('features.item2.adv2.desc') },
      { icon: '⚡', title: t('features.item2.adv3.title'), desc: t('features.item2.adv3.desc') },
      { icon: '📅', title: t('features.item2.adv4.title'), desc: t('features.item2.adv4.desc') }
    ]
  },
  {
    id: 2,
    icon: '',
    title: t('features.item3.title'),
    subtitle: t('features.item3.subtitle'),
    desc: t('features.item3.desc'),
    badge: t('features.item3.badge'),
    videoUrl: demo3,
    advantages: [
      { icon: '📦', title: t('features.item3.adv1.title'), desc: t('features.item3.adv1.desc') },
      { icon: '⚠️', title: t('features.item3.adv2.title'), desc: t('features.item3.adv2.desc') },
      { icon: '📜', title: t('features.item3.adv3.title'), desc: t('features.item3.adv3.desc') },
      { icon: '📸', title: t('features.item3.adv4.title'), desc: t('features.item3.adv4.desc') }
    ]
  },
  {
    id: 3,
    icon: '💳',
    title: t('features.item4.title'),
    subtitle: t('features.item4.subtitle'),
    desc: t('features.item4.desc'),
    badge: t('features.item4.badge'),
    videoUrl: demo4,
    advantages: [
      { icon: '🤖', title: t('features.item4.adv1.title'), desc: t('features.item4.adv1.desc') },
      { icon: '🔍', title: t('features.item4.adv2.title'), desc: t('features.item4.adv2.desc') },
      { icon: '🧠', title: t('features.item4.adv3.title'), desc: t('features.item4.adv3.desc') },
      { icon: '⚙️', title: t('features.item4.adv4.title'), desc: t('features.item4.adv4.desc') }
    ]
  }
])

const activeFeature = computed(() => mainFeatures.value[activeFeatureIndex.value])
const leftAdvantages = computed(() => activeFeature.value.advantages.slice(0, 2))
const rightAdvantages = computed(() => activeFeature.value.advantages.slice(2, 4))
const videoUrls = computed(() => mainFeatures.value.map((f) => f.videoUrl))
const { isSectionVisible, preloadNext } = useLazyVideoPreloader(featuresSectionRef, videoUrls)

const selectFeature = (index) => {
  if (activeFeatureIndex.value === index) return
  activeFeatureIndex.value = index
  isPlaying.value = true

  if (isSectionVisible.value) {
    setTimeout(() => {
      const videoEls = document.querySelectorAll('.feature-video-element')
      videoEls.forEach((el) => {
        el.load()
        el.play().catch(() => {})
      })
    }, 20)
  }

  preloadNext(index)
}

const togglePlay = () => {
  const videoEls = document.querySelectorAll('.feature-video-element')
  videoEls.forEach((el) => {
    if (isPlaying.value) {
      el.pause()
    } else {
      el.play().catch(() => {})
    }
  })
  isPlaying.value = !isPlaying.value
}

const prevFeature = () => {
  const prevIdx = (activeFeatureIndex.value - 1 + mainFeatures.value.length) % mainFeatures.value.length
  selectFeature(prevIdx)
}

const nextFeature = () => {
  const nextIdx = (activeFeatureIndex.value + 1) % mainFeatures.value.length
  selectFeature(nextIdx)
}

const handleVideoEnded = () => {
  nextFeature()
}

onMounted(() => {
  if (sectionHeader.value) animateFadeIn(sectionHeader.value)
  if (showcaseContainer.value) animateFadeIn(showcaseContainer.value)
})
</script>

<template>
  <section ref="featuresSectionRef" id="features" class="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div ref="sectionHeader" class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">{{ $t('features.sectionTag') }}</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900">
          {{ $t('features.titlePrefix') }} <span class="text-gradient-blue">{{ $t('features.titleHighlight') }}</span> {{ $t('features.titleSuffix') }}
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('features.subtitle') }}
        </p>
      </div>

      <!-- Main Section Showcase -->
      <div ref="showcaseContainer" class="max-w-7xl mx-auto">
        
        <!-- Desktop Symmetrical 3-Column Layout (lg & xl screens) -->
        <div class="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left Column: 2 Advantage Cards -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            <div
              v-for="(adv, aIdx) in leftAdvantages"
              :key="aIdx"
              class="ezbiz-card p-6 rounded-2xl bg-white border border-sky-100/80 shadow-md hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-1"
            >
              <div class="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-4 shadow-xs">
                {{ adv.icon }}
              </div>
              <h4 class="text-base font-extrabold text-slate-900 mb-2">{{ adv.title }}</h4>
              <p class="text-slate-600 text-xs leading-relaxed">{{ adv.desc }}</p>
            </div>
          </div>

          <!-- Center Column: iPhone Video Player Mockup & Progress Navigation -->
          <div class="lg:col-span-4 flex flex-col items-center justify-center">
            
            <!-- iPhone Outer Frame (Full Bleed Edge-to-Edge) -->
            <div class="relative w-[270px] sm:w-[300px] aspect-[9/19] bg-slate-900 rounded-[38px] p-1.5 shadow-2xl border-2 border-slate-700/80 ring-1 ring-slate-950/20">
              
              <!-- Top Camera Punch-Hole Dot -->
              <div class="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 bg-black rounded-full border border-slate-700 shadow-sm flex items-center justify-center pointer-events-none">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
              </div>

              <!-- Viewport Screen -->
              <div class="relative w-full h-full rounded-[32px] overflow-hidden bg-white flex flex-col justify-between">
                
                <!-- Video Element -->
                <div class="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
                  <video
                    :src="isSectionVisible ? activeFeature.videoUrl : ''"
                    :autoplay="isSectionVisible"
                    loop
                    muted
                    playsinline
                    preload="none"
                    @ended="handleVideoEnded"
                    class="feature-video-element w-full h-full object-cover rounded-[32px] transition-all duration-500"
                  ></video>

                 
                </div>
              </div>
            </div>

            <!-- Progress Navigation Dots & Arrows -->
            <div class="flex items-center justify-center gap-3 mt-6">
              <button
                @click="prevFeature"
                class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                title="Quay lại demo trước"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div class="flex items-center gap-2 px-1">
                <button
                  v-for="(feat, idx) in mainFeatures"
                  :key="feat.id"
                  @click="selectFeature(idx)"
                  :class="[
                    'transition-all duration-300 cursor-pointer',
                    activeFeatureIndex === idx
                      ? 'w-7 h-2.5 bg-sky-500 rounded-full shadow-xs scale-105'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-sky-300 rounded-full'
                  ]"
                  :title="`Xem demo ${feat.title}`"
                ></button>
              </div>

              <button
                @click="nextFeature"
                class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                title="Tiếp theo demo sau"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

          <!-- Right Column: 2 Advantage Cards -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            <div
              v-for="(adv, aIdx) in rightAdvantages"
              :key="aIdx"
              class="ezbiz-card p-6 rounded-2xl bg-white border border-sky-100/80 shadow-md hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-1"
            >
              <div class="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-4 shadow-xs">
                {{ adv.icon }}
              </div>
              <h4 class="text-base font-extrabold text-slate-900 mb-2">{{ adv.title }}</h4>
              <p class="text-slate-600 text-xs leading-relaxed">{{ adv.desc }}</p>
            </div>
          </div>

        </div>

        <!-- Mobile & Tablet Layout (< lg screens) -->
        <div class="lg:hidden flex flex-col items-center">
          
          <!-- iPhone Video Player Mockup (Full Bleed Edge-to-Edge) -->
          <div class="relative w-[270px] sm:w-[310px] aspect-[9/19] bg-slate-900 rounded-[38px] p-1.5 shadow-2xl border-2 border-slate-700/80 ring-1 ring-slate-950/20">

            <!-- Top Camera Punch-Hole Dot -->
            <div class="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-3.5 h-3.5 bg-black rounded-full border border-slate-700 shadow-sm flex items-center justify-center pointer-events-none">
              <div class="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
            </div>

            <div class="relative w-full h-full rounded-[32px] overflow-hidden bg-white flex flex-col justify-between">
              <!-- <div class="absolute top-3 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>EZBIZ Video Demo</span>
              </div> -->

              <div class="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
                <video
                  :src="isSectionVisible ? activeFeature.videoUrl : ''"
                  :autoplay="isSectionVisible"
                  loop
                  muted
                  playsinline
                  preload="none"
                  @ended="handleVideoEnded"
                  class="feature-video-element w-full h-full object-cover rounded-[32px] transition-all duration-500"
                ></video>

                <button 
                  @click="togglePlay"
                  class="absolute inset-0 flex items-center justify-center transition-colors cursor-pointer group"
                  title="Bấm để tạm dừng / phát"
                >
                  <div 
                    v-if="!isPlaying"
                    class="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sky-600 shadow-xl group-hover:scale-110 transition-transform"
                  >
                    <span class="text-xl pl-1">▶</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation & Dots Indicator -->
          <div class="flex items-center justify-center gap-3 mt-6 mb-12">
            <button
              @click="prevFeature"
              class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              title="Quay lại demo trước"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="flex items-center gap-2 px-1">
              <button
                v-for="(feat, idx) in mainFeatures"
                :key="feat.id"
                @click="selectFeature(idx)"
                :class="[
                  'transition-all duration-300 cursor-pointer',
                  activeFeatureIndex === idx
                    ? 'w-7 h-2.5 bg-sky-500 rounded-full shadow-xs scale-105'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-sky-300 rounded-full'
                ]"
                :title="`Xem demo ${feat.title}`"
              ></button>
            </div>

            <button
              @click="nextFeature"
              class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              title="Tiếp theo demo sau"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Bottom Advantages Cards Grid on Mobile -->
          <div class="w-full max-w-xl">
            <div class="text-center mb-6">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Ưu Điểm Vượt Trội Của {{ activeFeature.title }}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(adv, aIdx) in activeFeature.advantages"
                :key="aIdx"
                class="ezbiz-card p-5 rounded-2xl bg-white border border-sky-100 shadow-md hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl mb-3 shadow-xs">
                    {{ adv.icon }}
                  </div>
                  <h4 class="text-sm font-extrabold text-slate-900 mb-1.5">{{ adv.title }}</h4>
                  <p class="text-slate-600 text-xs leading-relaxed">{{ adv.desc }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
