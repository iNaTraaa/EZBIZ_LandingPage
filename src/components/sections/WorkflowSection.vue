<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()
const workflowSection = ref(null)

const steps = computed(() => [
  {
    title: t('workflow.step1.title'),
    description: t('workflow.step1.desc'),
    icon: '🚀'
  },
  {
    title: t('workflow.step2.title'),
    description: t('workflow.step2.desc'),
    icon: '🔄'
  },
  {
    title: t('workflow.step3.title'),
    description: t('workflow.step3.desc'),
    icon: '⚙️'
  },
  {
    title: t('workflow.step4.title'),
    description: t('workflow.step4.desc'),
    icon: '📈'
  }
])

onMounted(() => {
  if (workflowSection.value) animateFadeIn(workflowSection.value)
})
</script>

<template>
  <section id="workflow" class="py-24 bg-white relative">
    <div ref="workflowSection" class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">{{ $t('workflow.sectionTag') }}</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900">
          {{ $t('workflow.titlePrefix') }} <span class="text-gradient-blue">{{ $t('workflow.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('workflow.subtitle') }}
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        <div 
          v-for="(step, idx) in steps" 
          :key="idx"
          class="ezbiz-card p-6 text-center relative border border-sky-100"
        >
          <!-- Step Number Badge -->
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-sky-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-sky-400/30">
            {{ idx + 1 }}
          </div>

          <div class="text-3xl mb-3">{{ step.icon }}</div>
          <h3 class="text-lg font-extrabold text-slate-900 mb-2">{{ step.title }}</h3>
          <p class="text-slate-600 text-sm leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
