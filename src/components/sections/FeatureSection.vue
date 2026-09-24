<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { animateStagger, animateFadeIn } = useScrollAnimation()

const sectionHeader = ref(null)
const featureCards = ref(null)

const features = computed(() => [
  {
    icon: '⚡',
    badge: t('features.item1.badge'),
    badgeColor: 'processing',
    title: t('features.item1.title'),
    desc: t('features.item1.desc')
  },
  {
    icon: '📊',
    badge: t('features.item2.badge'),
    badgeColor: 'cyan',
    title: t('features.item2.title'),
    desc: t('features.item2.desc')
  },
  {
    icon: '🤝',
    badge: t('features.item3.badge'),
    badgeColor: 'blue',
    title: t('features.item3.title'),
    desc: t('features.item3.desc')
  },
  {
    icon: '🔒',
    badge: t('features.item4.badge'),
    badgeColor: 'green',
    title: t('features.item4.title'),
    desc: t('features.item4.desc')
  },
  {
    icon: '🚀',
    badge: t('features.item5.badge'),
    badgeColor: 'purple',
    title: t('features.item5.title'),
    desc: t('features.item5.desc')
  },
  {
    icon: '🤖',
    badge: t('features.item6.badge'),
    badgeColor: 'magenta',
    title: t('features.item6.title'),
    desc: t('features.item6.desc')
  }
])

onMounted(() => {
  if (sectionHeader.value) animateFadeIn(sectionHeader.value)
  if (featureCards.value) animateStagger(featureCards.value.children, { trigger: featureCards.value })
})
</script>

<template>
  <section id="features" class="py-24 relative bg-sky-50/40">
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div ref="sectionHeader" class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">{{ $t('features.sectionTag') }}</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900">
          {{ $t('features.titlePrefix') }} <span class="text-gradient-blue">{{ $t('features.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('features.subtitle') }}
        </p>
      </div>

      <!-- Feature Cards Grid -->
      <div ref="featureCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(item, index) in features" 
          :key="index"
          class="ezbiz-card p-8 rounded-2xl relative group flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-6">
              <!-- Feature Icon -->
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-md">
                {{ item.icon }}
              </div>
              <a-tag :color="item.badgeColor" class="font-bold border-none px-3 py-1 text-xs">
                {{ item.badge }}
              </a-tag>
            </div>

            <h3 class="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
              {{ item.title }}
            </h3>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              {{ item.desc }}
            </p>
          </div>

          <a href="#pricing" class="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors">
            <span>{{ $t('features.learnMore') }}</span>
            <span class="group-hover:translate-x-1 transition-transform">➔</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
