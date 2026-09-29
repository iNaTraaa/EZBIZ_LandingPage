<script setup>
import SplashScreen from './components/common/SplashScreen.vue'
import Navbar from './components/common/Navbar.vue'
import HeroSection from './components/sections/HeroSection.vue'
import FeatureSection from './components/sections/FeatureSection.vue'
import StatsSection from './components/sections/StatsSection.vue'
import WorkflowSection from './components/sections/WorkflowSection.vue'
import PricingSection from './components/sections/PricingSection.vue'
import TeamSection from './components/sections/TeamSection.vue'
import AwardsSection from './components/sections/AwardsSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import CtaSection from './components/sections/CtaSection.vue'
import Footer from './components/common/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-white text-slate-900 selection:bg-sky-400 selection:text-white antialiased">
    <!-- Initial Splash Screen Loader -->
    <SplashScreen />

    <!-- Navbar Header -->
    <Navbar />

    <!-- Main Content Sections -->
    <main>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <WorkflowSection />
      <PricingSection />
      <TeamSection />
      <AwardsSection />
      <FaqSection />
      <CtaSection />
    </main>

    <!-- Sticky Bottom Quick Action Bar -->
    <!-- <div class="sticky-bottom-bar flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-sky-400 animate-ping"></span>
        <div class="text-xs text-slate-800">
          <span class="font-bold block text-sky-700">{{ $t('stickyBar.trialTitle') }}</span>
          <span class="text-[11px] text-slate-500">{{ $t('stickyBar.trialDesc') }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a-button 
          type="primary" 
          size="middle" 
          shape="round" 
          class="btn-primary-blue border-none !px-5 text-xs font-bold"
          href="#pricing"
        >
          {{ $t('stickyBar.btnAction') }}
        </a-button>
      </div>
    </div> -->

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
/* Global selection styling */
::selection {
  background-color: #38bdf8;
  color: #ffffff;
}
</style>
