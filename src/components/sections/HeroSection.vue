<script setup>
import { onMounted, ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import ggPlaySvg from '@/assets/img/gg_play.svg'
import appStoreSvg from '@/assets/img/appstore.svg'
import demoImg1 from '@/assets/img/demo_stack/demo_stack_1.jpg'

const { gsap } = useScrollAnimation()

const heroBadge = ref(null)
const heroTitle = ref(null)
const heroSub = ref(null)
const heroDesc = ref(null)
const heroStores = ref(null)
const heroFeatures = ref(null)
const heroImage = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from(heroBadge.value, { opacity: 0, y: -20, duration: 0.6 })
    .from(heroTitle.value, { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
    .from(heroSub.value, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from(heroDesc.value, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from(heroStores.value, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from(heroFeatures.value, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from(heroImage.value, { opacity: 0, scale: 0.95, y: 30, duration: 1 }, '-=0.4')
})
</script>

<template>
  <section class="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 overflow-hidden">
    <!-- Light Blue Background Soft Glows -->
    <div class="absolute top-10 right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-10 left-10 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left Text Column -->
        <div class="lg:col-span-7 text-left">
          <!-- Main Brand Title: EZBIZ -->
          <h1 ref="heroTitle" class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-none">
            <span class="text-gradient-blue">{{ $t('hero.brandTitle') }}</span>
          </h1>

          <!-- Subtitle: Giải pháp hỗ trợ hộ kinh doanh trong buôn bán lẻ -->
          <h2 ref="heroSub" class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-800 mt-4 leading-tight">
            {{ $t('hero.subTitle') }}
          </h2>

          <!-- Description -->
          <p ref="heroDesc" class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
            {{ $t('hero.desc') }}
          </p>

          <!-- Store Buttons: Trải nghiệm ngay trên -->
          <div ref="heroStores" class="mt-8">
            <p class="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              {{ $t('hero.experienceOn') }}:
            </p>

            <div class="flex flex-wrap items-center gap-4">
              <!-- Google Play Badge Image -->
              <a 
                href="#" 
                class="inline-block transition-transform hover:-translate-y-0.5 group"
              >
                <img 
                  :src="ggPlaySvg" 
                  alt="Google Play Store" 
                  class="h-12 sm:h-14 w-auto object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                />
              </a>

              <!-- App Store Badge Image -->
              <a 
                href="#" 
                class="inline-block transition-transform hover:-translate-y-0.5 group"
              >
                <img 
                  :src="appStoreSvg" 
                  alt="Apple App Store" 
                  class="h-12 sm:h-14 w-auto object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all"
                />
              </a>
            </div>
          </div>

          <!-- Product Highlights Row (Chức năng nổi bật) -->
          <div ref="heroFeatures" class="mt-10 border-t border-slate-200/80 pt-6">
            <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              {{ $t('hero.featureHeading') }}
            </p>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <!-- Feature Item 1 -->
              <div class="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100 hover:bg-sky-100/70 transition-colors">
                <span class="text-2xl">🛒</span>
                <span class="text-xs font-bold text-slate-800 leading-tight">{{ $t('hero.feature1') }}</span>
              </div>

              <!-- Feature Item 2 -->
              <div class="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100 hover:bg-sky-100/70 transition-colors">
                <span class="text-2xl">📦</span>
                <span class="text-xs font-bold text-slate-800 leading-tight">{{ $t('hero.feature2') }}</span>
              </div>

              <!-- Feature Item 3 -->
              <div class="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100 hover:bg-sky-100/70 transition-colors">
                <span class="text-2xl">📊</span>
                <span class="text-xs font-bold text-slate-800 leading-tight">{{ $t('hero.feature3') }}</span>
              </div>

              <!-- Feature Item 4 -->
              <div class="flex items-center gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-100 hover:bg-sky-100/70 transition-colors">
                <span class="text-2xl">🤖</span>
                <span class="text-xs font-bold text-slate-800 leading-tight">{{ $t('hero.feature4') }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column Sized Product Image -->
        <div ref="heroImage" class="lg:col-span-5 flex justify-center items-center">
          <!-- <div class="w-full max-w-[320px] sm:max-w-[450px] ezbiz-card p-2.5 bg-white border border-sky-200/80 shadow-xl rounded-3xl relative overflow-hidden group"> -->
            <img 
              :src="demoImg1" 
              alt="EzBiz Product Demo" 
              class="w-full h-auto max-h-[720px] rounded-2xl object-contain transition-transform duration-500 group-hover:scale-[1.08] mx-auto"
            />
          </div>
        </div>
      </div>
    <!-- </div> -->
  </section>
</template>
