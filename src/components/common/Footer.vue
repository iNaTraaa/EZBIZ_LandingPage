<script setup>
import { ref, onMounted } from 'vue'
import logoEb from '@/assets/img/logo_eb.webp'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { gsap } = useScrollAnimation()
const footerRef = ref(null)

onMounted(() => {
  if (footerRef.value) {
    const cols = footerRef.value.querySelectorAll('.footer-col')
    const bottomBar = footerRef.value.querySelector('.footer-bottom')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.value,
        start: 'top 88%',
        toggleActions: 'play none play reverse'
      }
    })

    if (cols.length) {
      tl.from(cols, {
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'back.out(1.4)'
      })
    }

    if (bottomBar) {
      tl.from(
        bottomBar,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.3'
      )
    }
  }
})
</script>

<template>
  <footer ref="footerRef" class="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm pt-16 pb-12 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Col 1: Brand Info -->
        <div class="footer-col md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img 
              :src="logoEb" 
              alt="EzBiz Logo" 
              class="h-10 w-auto object-contain"
            />
            <span class="text-2xl font-black text-white">EZ<span class="text-gradient-blue">BIZ</span></span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">
            {{ $t('footer.tagline') }}
          </p>
          <div class="text-xs text-slate-400 space-y-1">
            <p>{{ $t('footer.address') }}</p>
            <p>{{ $t('footer.hotline') }}</p>
            <p>{{ $t('footer.email') }}</p>
          </div>
        </div>

        <!-- Col 2: Sản Phẩm -->
        <div class="footer-col">
          <h4 class="text-white font-bold text-sm mb-4">{{ $t('footer.colProduct') }}</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="#features" class="hover:text-sky-400 transition-colors">{{ $t('features.item1.title') }}</a></li>
            <li><a href="#features" class="hover:text-sky-400 transition-colors">{{ $t('features.item2.title') }}</a></li>
            <li><a href="#features" class="hover:text-sky-400 transition-colors">{{ $t('features.item3.title') }}</a></li>
            <li><a href="#pricing" class="hover:text-sky-400 transition-colors">{{ $t('features.item5.title') }}</a></li>
          </ul>
        </div>

        <!-- Col 3: Hỗ Trợ & An Toàn -->
        <div class="footer-col">
          <h4 class="text-white font-bold text-sm mb-4">{{ $t('footer.colSupport') }}</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="#" class="hover:text-sky-400 transition-colors">{{ $t('features.item4.title') }}</a></li>
            <li><a href="#" class="hover:text-sky-400 transition-colors">Support Center 24/7</a></li>
            <li><a href="#" class="hover:text-sky-400 transition-colors">Implementation Guide</a></li>
            <li><a href="#" class="hover:text-sky-400 transition-colors">{{ $t('footer.privacy') }}</a></li>
          </ul>
        </div>

        <!-- Col 4: Nhận tin -->
        <div class="footer-col">
          <h4 class="text-white font-bold text-sm mb-4">{{ $t('footer.colNewsletter') }}</h4>
          <p class="text-xs text-slate-400 mb-4">
            {{ $t('footer.newsletterDesc') }}
          </p>
          <div class="flex gap-2">
            <input type="email" placeholder="Email..." class="w-full h-10 px-3 rounded-lg bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-sky-400" />
            <button class="px-4 py-2 bg-sky-500 text-white text-xs font-bold rounded-lg hover:bg-sky-600 transition-colors cursor-pointer">
              {{ $t('footer.btnSubscribe') }}
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          {{ $t('footer.copyright') }}
        </div>
        <div class="flex gap-6">
          <a href="#" class="hover:text-sky-400">{{ $t('footer.terms') }}</a>
          <a href="#" class="hover:text-sky-400">{{ $t('footer.privacy') }}</a>
          <a href="#" class="hover:text-sky-400">{{ $t('footer.sitemap') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
