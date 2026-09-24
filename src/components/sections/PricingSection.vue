<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { animateStagger, animateFadeIn } = useScrollAnimation()

const pricingHeader = ref(null)
const pricingCards = ref(null)

const packages = computed(() => [
  {
    name: t('pricing.starter.name'),
    price: t('pricing.starter.price'),
    unit: t('pricing.starter.unit'),
    desc: t('pricing.starter.desc'),
    popular: false,
    features: [
      t('pricing.starter.f1'),
      t('pricing.starter.f2'),
      t('pricing.starter.f3'),
      t('pricing.starter.f4')
    ]
  },
  {
    name: t('pricing.business.name'),
    price: t('pricing.business.price'),
    unit: t('pricing.business.unit'),
    desc: t('pricing.business.desc'),
    popular: true,
    features: [
      t('pricing.business.f1'),
      t('pricing.business.f2'),
      t('pricing.business.f3'),
      t('pricing.business.f4'),
      t('pricing.business.f5'),
      t('pricing.business.f6')
    ]
  },
  {
    name: t('pricing.enterprise.name'),
    price: t('pricing.enterprise.price'),
    unit: t('pricing.enterprise.unit'),
    desc: t('pricing.enterprise.desc'),
    popular: false,
    features: [
      t('pricing.enterprise.f1'),
      t('pricing.enterprise.f2'),
      t('pricing.enterprise.f3'),
      t('pricing.enterprise.f4'),
      t('pricing.enterprise.f5')
    ]
  }
])

onMounted(() => {
  if (pricingHeader.value) animateFadeIn(pricingHeader.value)
  if (pricingCards.value) animateStagger(pricingCards.value.children, { trigger: pricingCards.value })
})
</script>

<template>
  <section id="pricing" class="py-24 bg-sky-50/40 relative">
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div ref="pricingHeader" class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">{{ $t('pricing.sectionTag') }}</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900">
          {{ $t('pricing.titlePrefix') }} <span class="text-gradient-blue">{{ $t('pricing.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('pricing.subtitle') }}
        </p>
      </div>

      <!-- Pricing Cards Grid -->
      <div ref="pricingCards" class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="(plan, index) in packages"
          :key="index"
          :class="[
            'p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative bg-white',
            plan.popular 
              ? 'ezbiz-card border-2 border-sky-400 shadow-2xl lg:-translate-y-3' 
              : 'border border-slate-200 hover:shadow-xl'
          ]"
        >
          <!-- Popular Ribbon Badge -->
          <div v-if="plan.popular" class="absolute -top-4 left-1/2 -translate-x-1/2">
            <a-tag color="#0284c7" class="font-extrabold uppercase px-4 py-1 text-xs rounded-full shadow-md">
              {{ $t('pricing.popularBadge') }}
            </a-tag>
          </div>

          <div>
            <h3 class="text-xl font-black text-slate-900 mb-2">{{ plan.name }}</h3>
            <p class="text-slate-500 text-xs leading-relaxed mb-6 min-h-[36px]">{{ plan.desc }}</p>

            <div class="mb-6 flex items-baseline gap-1">
              <span class="text-3xl sm:text-4xl font-black text-slate-900">{{ plan.price }}</span>
              <span class="text-slate-500 text-sm font-semibold">{{ plan.unit }}</span>
            </div>

            <!-- Features List -->
            <ul class="space-y-3 border-t border-slate-100 pt-6 mb-8 text-sm">
              <li 
                v-for="(feat, fIdx) in plan.features" 
                :key="fIdx"
                class="flex items-start gap-3 text-slate-700 font-medium"
              >
                <span class="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- Button -->
          <a-button 
            type="primary" 
            block 
            size="large" 
            shape="round"
            :class="[
              '!h-12 text-sm font-bold',
              plan.popular ? 'btn-primary-blue border-none' : '!bg-slate-900 hover:!bg-sky-600 !border-none !text-white'
            ]"
          >
            {{ plan.popular ? $t('pricing.btnPopular') : $t('pricing.btnSelect') }}
          </a-button>
        </div>
      </div>
    </div>
  </section>
</template>
