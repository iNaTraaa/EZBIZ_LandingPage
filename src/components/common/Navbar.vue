<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import logoEb from '@/assets/img/logo_eb.png'
import ScrollProgressBar from './ScrollProgressBar.vue'

const { locale } = useI18n()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const currentLang = ref(locale.value)

const changeLang = (lang) => {
  locale.value = lang
  currentLang.value = lang
  localStorage.setItem('lang', lang)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <!-- Top Scroll Progress Bar Component -->
    <ScrollProgressBar />

    <!-- Main Header Navbar -->
    <header 
      :class="[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm' : 'bg-white/70 backdrop-blur-xs'
      ]"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo Brand Image & Text -->
        <a href="#" class="flex items-center gap-3 group">
          <img 
            :src="logoEb" 
            alt="EzBiz Logo" 
            class="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span class="text-2xl font-black tracking-tight text-slate-900 leading-none">
            Ez<span class="text-gradient-blue">Biz</span>
          </span>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <a href="#features" class="hover:text-sky-600 transition-colors">{{ $t('nav.features') }}</a>
          <a href="#workflow" class="hover:text-sky-600 transition-colors">{{ $t('nav.workflow') }}</a>
          <a href="#stats" class="hover:text-sky-600 transition-colors">{{ $t('nav.stats') }}</a>
          <a href="#pricing" class="hover:text-sky-600 transition-colors">{{ $t('nav.pricing') }}</a>
          <a href="#faq" class="hover:text-sky-600 transition-colors">{{ $t('nav.faq') }}</a>
        </nav>

        <!-- Desktop Right Actions (Language Switcher & Try Now) -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Desktop Language Selector -->
          <div class="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              @click="changeLang('vi')"
              :class="[
                'px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
                currentLang === 'vi' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              ]"
            >
              <span>VI</span>
            </button>
            <button
              @click="changeLang('en')"
              :class="[
                'px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5',
                currentLang === 'en' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              ]"
            >
              <span>EN</span>
            </button>
          </div>

          <!-- Desktop Try Now Button -->
          <a-button 
            type="primary" 
            size="large" 
            shape="round"
            class="btn-primary-blue border-none px-6"
            href="#pricing"
          >
            {{ $t('nav.tryNow') }}
          </a-button>
        </div>

        <!-- Mobile Hamburger Menu Toggle Button (md:hidden) -->
        <div class="flex md:hidden items-center gap-3">
          <!-- Try Now Button Mobile Header -->
          <a-button 
            type="primary" 
            size="middle" 
            shape="round"
            class="btn-primary-blue border-none text-xs font-bold"
            href="#pricing"
          >
            {{ $t('nav.tryNow') }}
          </a-button>

          <!-- Hamburger Button with Smooth Morphing Animation -->
          <button 
            @click="toggleMobileMenu" 
            class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 flex flex-col items-center justify-center gap-[5px] border border-slate-200 transition-all duration-300 cursor-pointer active:scale-90"
            aria-label="Toggle Mobile Menu"
          >
            <span 
              :class="[
                'w-5 h-[2px] rounded-full transition-all duration-300 ease-in-out transform origin-center',
                isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-sky-600' : 'bg-slate-700'
              ]"
            ></span>
            <span 
              :class="[
                'w-5 h-[2px] rounded-full transition-all duration-300 ease-in-out',
                isMobileMenuOpen ? 'opacity-0 translate-x-2' : 'bg-slate-700 opacity-100'
              ]"
            ></span>
            <span 
              :class="[
                'w-5 h-[2px] rounded-full transition-all duration-300 ease-in-out transform origin-center',
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-sky-600' : 'bg-slate-700'
              ]"
            ></span>
          </button>
        </div>
      </div>

      <!-- Mobile Vertical Navigation Menu Drawer (Dropdown) -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div 
          v-if="isMobileMenuOpen" 
          class="md:hidden mt-4 pt-4 pb-6 px-4 bg-white/95 backdrop-blur-xl border-t border-slate-100 rounded-2xl shadow-xl space-y-4"
        >
          <!-- Vertical Links -->
          <nav class="flex flex-col space-y-3 font-semibold text-slate-700 text-base">
            <a 
              href="#features" 
              @click="closeMobileMenu"
              class="p-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-colors flex items-center justify-between"
            >
              <span>{{ $t('nav.features') }}</span>
              <span class="text-xs text-slate-400">➔</span>
            </a>
            <a 
              href="#workflow" 
              @click="closeMobileMenu"
              class="p-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-colors flex items-center justify-between"
            >
              <span>{{ $t('nav.workflow') }}</span>
              <span class="text-xs text-slate-400">➔</span>
            </a>
            <a 
              href="#stats" 
              @click="closeMobileMenu"
              class="p-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-colors flex items-center justify-between"
            >
              <span>{{ $t('nav.stats') }}</span>
              <span class="text-xs text-slate-400">➔</span>
            </a>
            <a 
              href="#pricing" 
              @click="closeMobileMenu"
              class="p-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-colors flex items-center justify-between"
            >
              <span>{{ $t('nav.pricing') }}</span>
              <span class="text-xs text-slate-400">➔</span>
            </a>
            <a 
              href="#faq" 
              @click="closeMobileMenu"
              class="p-2.5 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-colors flex items-center justify-between"
            >
              <span>{{ $t('nav.faq') }}</span>
              <span class="text-xs text-slate-400">➔</span>
            </a>
          </nav>

          <!-- Mobile Language Switcher Inside Menu -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold text-slate-500 uppercase">{{ $t('nav.launguage') }}</span>
            <div class="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                @click="changeLang('vi')"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer',
                  currentLang === 'vi' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-500'
                ]"
              >
                VI
              </button>
              <button
                @click="changeLang('en')"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer',
                  currentLang === 'en' ? 'bg-white text-sky-600 shadow-xs' : 'text-slate-500'
                ]"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </transition>
    </header>
  </div>
</template>
