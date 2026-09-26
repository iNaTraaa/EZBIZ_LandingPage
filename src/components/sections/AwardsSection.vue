<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import gsap from 'gsap'

import khdlImage from '@/assets/img/achive/khdl_26.jpg'
import ttntImage from '@/assets/img/achive/ttnt_26.jpg'
const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()

const awardsSection = ref(null)
const cardRefs = ref([])
const activeIndex = ref(null)

const setCardRef = (el, idx) => {
  if (el) cardRefs.value[idx] = el
}

const awards = computed(() => [
  {
    key: 'award1',
    image: khdlImage,
    year: '2025',
    tag: t('awards.award1.tag'),
    desc: t('awards.award1.desc'),
    details: t('awards.award1.details'),
    link: 'https://cntt.ntt.edu.vn/tin-tuc/chung-ket-cuoc-thi-khoa-hoc-du-lieu-khoa-cntt-2026-khai-pha-du-lieu-kien-tao-tuong-lai/'
  },
  {
    key: 'award2',
    image: ttntImage,
    year: '2026',
    tag: t('awards.award2.tag'),
    desc: t('awards.award2.desc'),
    details: t('awards.award2.details'),
    link: 'https://cntt.ntt.edu.vn/nghien-cuu-khoa-hoc/phat-trien-san-pham/cuoc-thi-tri-tue-nhan-tao-khoa-cong-nghe-thong-tin-nam-2026-but-pha-sang-tao-kien-tao-tuong-lai/'
  }
])

// GSAP Single Unified Card Horizontal Overlapping Expansion
const handleMouseEnter = (idx) => {
  if (window.innerWidth < 768) return // Mobile: info panel is visible by default
  activeIndex.value = idx

  cardRefs.value.forEach((cardEl, i) => {
    if (!cardEl) return
    const imgBox = cardEl.querySelector('.award-img-box')
    const imgEl = cardEl.querySelector('.award-img-zoom')
    const rightPanel = cardEl.querySelector('.award-right-panel')
    const glowBlur = cardEl.querySelector('.award-glow-blur')
    const hintTag = cardEl.querySelector('.hover-hint-tag')

    if (i === idx) {
      const isFirst = (idx === 0)
      
      // Expand single unified card container horizontally (Level 2 hover)
      gsap.to(cardEl, {
        zIndex: 50,
        width: '180%',
        x: !isFirst ? '-44%' : '0%',
        opacity: 1,
        borderColor: '#38bdf8',
        boxShadow: '0 30px 60px -12px rgba(14, 165, 233, 0.35)',
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto'
      })

      // Image box width transitions to 400px on desktop at Level 2
      if (imgBox) {
        gsap.to(imgBox, { width: '400px', duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
      }

      // Image zooms slightly inside container
      if (imgEl) {
        gsap.to(imgEl, { scale: 1.08, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      }

      // Ambient blur glow
      if (glowBlur) {
        gsap.to(glowBlur, { opacity: 1, scale: 1.25, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      }

      if (hintTag) {
        gsap.to(hintTag, { opacity: 0, duration: 0.2, overwrite: 'auto' })
      }

      // Smoothly expand Right Info Panel inside the SAME unified card
      if (rightPanel) {
        gsap.to(rightPanel, {
          width: '100%',
          opacity: 1,
          x: 0,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
    } else {
      // Non-hovered Card: Dimmed underneath
      gsap.to(cardEl, {
        zIndex: 1,
        width: '100%',
        x: '0%',
        opacity: 0.3,
        borderColor: '#e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto'
      })
      if (imgBox) {
        gsap.to(imgBox, { width: '100%', duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
      }
      if (imgEl) {
        gsap.to(imgEl, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      }
    }
  })
}

const handleMouseLeave = () => {
  if (window.innerWidth < 768) return // Mobile: info panel remains visible
  activeIndex.value = null

  cardRefs.value.forEach((cardEl) => {
    if (!cardEl) return
    const imgBox = cardEl.querySelector('.award-img-box')
    const imgEl = cardEl.querySelector('.award-img-zoom')
    const rightPanel = cardEl.querySelector('.award-right-panel')
    const glowBlur = cardEl.querySelector('.award-glow-blur')
    const hintTag = cardEl.querySelector('.hover-hint-tag')

    // Reset single card back to Level 1
    gsap.to(cardEl, {
      zIndex: 10,
      width: '100%',
      x: '0%',
      opacity: 1,
      borderColor: '#e0f2fe',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto'
    })

    if (imgBox) {
      gsap.to(imgBox, { width: '100%', duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    }

    if (imgEl) {
      gsap.to(imgEl, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
    }

    if (glowBlur) {
      gsap.to(glowBlur, { opacity: 0, scale: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    }

    if (hintTag) {
      gsap.to(hintTag, { opacity: 1, duration: 0.3, overwrite: 'auto' })
    }

    if (rightPanel) {
      gsap.to(rightPanel, {
        width: '0%',
        opacity: 0,
        x: 15,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  })
}

onMounted(() => {
  if (awardsSection.value) animateFadeIn(awardsSection.value)
})
</script>

<template>
  <section id="awards" class="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div ref="awardsSection" class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">
          {{ $t('awards.sectionTag') }}
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {{ $t('awards.titlePrefix') }} <span class="text-gradient-blue">{{ $t('awards.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('awards.subtitle') }}
        </p>
      </div>

      <!-- 2-Column Overlapping Single Unified Card Gallery -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto relative items-start min-h-[420px]">
        
        <!-- SINGLE UNIFIED CARD CONTAINER -->
        <div 
          v-for="(award, index) in awards" 
          :key="index"
          :ref="(el) => setCardRef(el, index)"
          :data-index="index"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
          class="ezbiz-card rounded-3xl bg-white border-2 border-sky-100 shadow-md transition-all duration-300 relative z-10 cursor-pointer overflow-hidden p-3 sm:p-4 w-full"
        >
          <!-- Ambient Glow Blur -->
          <!-- <div class="award-glow-blur absolute inset-0 bg-sky-400/30 blur-3xl opacity-0 pointer-events-none rounded-3xl transition-opacity"></div> -->

          <!-- Single Seamless Card Flex Container (Horizontal 2 columns inside SAME card) -->
          <div class="flex flex-col md:flex-row items-center gap-5 sm:gap-6 relative z-20 w-full min-h-[360px]">
            
            <!-- Left Column: Award Image Container (Full width in Level 1, resizes to 400px on hover in Level 2) -->
            <div class="award-img-box relative w-full h-80 sm:h-96 rounded-2xl bg-white border-2 sm:border-4 border-white shadow-md shrink-0">
              
              <!-- Pinned Basic Star Icon on Corner Border (Rotated 30deg) -->
              <div class="absolute -top-3 -left-3 z-30 drop-shadow-md pointer-events-none rotate-[30deg]">
                <svg class="w-7 h-7 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              <!-- Inner Rounded Container for Zoomable Image -->
              <div class="w-full h-full rounded-2xl overflow-hidden">
                <img 
                  :src="award.image" 
                  alt="Award Certificate" 
                  class="award-img-zoom w-full h-full object-cover object-center transition-transform duration-700"
                />
              </div>

              <!-- Level 1 Hover Hint Tag (Desktop only) -->
              <div class="hover-hint-tag absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-4 py-1.5 rounded-full border border-white/20 shadow-md hidden md:flex items-center gap-1.5 whitespace-nowrap">
                {{ $t('awards.hint') }}
              </div>
            </div>

            <!-- Right Column: Competition Info Panel (Always open & visible on mobile, expanding hover on desktop) -->
            <div class="award-right-panel w-full opacity-100 md:w-0 md:opacity-0 overflow-hidden shrink-0 flex-1 flex flex-col justify-between py-1 transition-all">
              <div class="p-4 sm:p-5 rounded-2xl border border-sky-100/80 text-left w-full min-w-0 md:min-w-[340px]">
                
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="text-xs font-extrabold uppercase tracking-wider text-sky-600 bg-white px-3 py-1 rounded-full border border-sky-200">
                    {{ award.year }} Official Award
                  </span>
                  
                </div>

                <h3 class="text-base sm:text-lg font-black text-slate-900 mb-2 leading-snug">
                  {{ award.desc }}
                </h3>

                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                  {{ award.details }}
                </p>

                <div class="pt-3 border-t border-sky-100 flex items-center justify-between gap-2">
                  <a 
                    :href="award.link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-extrabold hover:bg-sky-600 transition-colors shadow-md shadow-slate-900/10 shrink-0"
                  >
                    <span>{{ $t('awards.viewCert') }}</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>
