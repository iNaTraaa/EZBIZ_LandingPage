<script setup>
import { onMounted, ref, computed } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { animateStagger, animateFadeIn } = useScrollAnimation()

const pricingHeader = ref(null)
const pricingCards = ref(null)

const packages = computed(() => [
  {
    key: 'starter',
    popular: false,
    badgeKey: 'pricing.starterBadge',
    featureKeys: ['f1', 'f2', 'f3', 'f4']
  },
  {
    key: 'business',
    popular: true,
    badgeKey: 'pricing.popularBadge',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6']
  },
  {
    key: 'enterprise',
    popular: false,
    badgeKey: 'pricing.lifetimeBadge',
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5']
  }
])

onMounted(() => {
  if (pricingHeader.value) animateFadeIn(pricingHeader.value)
  if (pricingCards.value) animateFadeIn(pricingCards.value, { y: 30 })
})
</script>

<template>
  <section id="pricing" class="py-24 bg-gradient-to-b from-slate-50 via-sky-50/30 to-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div ref="pricingHeader" class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">{{ $t('pricing.sectionTag') }}</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {{ $t('pricing.titlePrefix') }} <span class="text-gradient-blue">{{ $t('pricing.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('pricing.subtitle') }}
        </p>
      </div>

      <!-- Pricing Cards Grid -->
      <div ref="pricingCards" class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-stretch pt-4">
        <div 
          v-for="(plan, index) in packages"
          :key="index"
          :class="[
            'p-7 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative bg-white',
            plan.popular 
              ? 'ezbiz-card border-2 border-sky-400 shadow-2xl shadow-sky-400/20 md:-translate-y-5 lg:-translate-y-6 z-20 scale-[1.02] bg-gradient-to-b from-white via-sky-50/30 to-white' 
              : 'border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 z-10'
          ]"
        >
          <!-- Top Ribbon Badges -->
          <div v-if="plan.badgeKey" class="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
            <span 
              :class="[
                'font-extrabold uppercase px-4 py-1.5 text-[11px] sm:text-xs rounded-full shadow-md whitespace-nowrap inline-block',
                plan.popular 
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/30' 
                  : 'bg-slate-900 text-white border border-sky-400/30'
              ]"
            >
              {{ $t(plan.badgeKey) }}
            </span>
          </div>

          <div>
            <div class="mb-4">
              <h3 class="text-xl sm:text-2xl font-black text-slate-900 mb-1.5">{{ $t(`pricing.${plan.key}.name`) }}</h3>
              <p class="text-slate-500 text-xs sm:text-sm leading-relaxed min-h-[40px] flex items-center">{{ $t(`pricing.${plan.key}.desc`) }}</p>
            </div>

            <!-- Pricing Box -->
            <div class="mb-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-baseline gap-1.5">
              <span class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{{ $t(`pricing.${plan.key}.price`) }}</span>
              <span class="text-slate-500 text-xs sm:text-sm font-bold">{{ $t(`pricing.${plan.key}.unit`) }}</span>
            </div>

            <!-- Features List -->
            <ul class="space-y-3 border-t border-slate-100 pt-6 mb-8 text-xs sm:text-sm">
              <li 
                v-for="fKey in plan.featureKeys" 
                :key="fKey"
                class="flex items-start gap-3 text-slate-700 font-medium"
              >
                <span class="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                <span>{{ $t(`pricing.${plan.key}.${fKey}`) }}</span>
              </li>
            </ul>
          </div>

          <!-- Action Button -->
          <a-button 
            type="primary" 
            block 
            size="large" 
            shape="round"
            :class="[
              '!h-12 text-sm font-extrabold tracking-wide transition-transform active:scale-95',
              plan.popular ? 'btn-primary-blue border-none shadow-lg shadow-sky-500/30' : '!bg-slate-900 hover:!bg-sky-600 !border-none !text-white'
            ]"
          >
            {{ plan.popular ? $t('pricing.btnPopular') : $t('pricing.btnSelect') }}
          </a-button>
        </div>
      </div>
    </div>
  </section>
</template>
