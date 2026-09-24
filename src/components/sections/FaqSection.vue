<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()
const faqContainer = ref(null)

const activeKey = ref(['1'])

const faqs = computed(() => [
  {
    key: '1',
    question: t('faq.q1'),
    answer: t('faq.a1')
  },
  {
    key: '2',
    question: t('faq.q2'),
    answer: t('faq.a2')
  },
  {
    key: '3',
    question: t('faq.q3'),
    answer: t('faq.a3')
  },
  {
    key: '4',
    question: t('faq.q4'),
    answer: t('faq.a4')
  }
])

onMounted(() => {
  if (faqContainer.value) animateFadeIn(faqContainer.value)
})
</script>

<template>
  <section id="faq" class="py-24 bg-white relative">
    <div ref="faqContainer" class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-16">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">{{ $t('faq.sectionTag') }}</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900">
          {{ $t('faq.titlePrefix') }} <span class="text-gradient-blue">{{ $t('faq.titleSuffix') }}</span>
        </h2>
      </div>

      <!-- Ant Design Collapse -->
      <a-collapse v-model:activeKey="activeKey" ghost expand-icon-position="right" class="space-y-4">
        <a-collapse-panel 
          v-for="item in faqs" 
          :key="item.key" 
          :header="item.question" 
          class="!bg-sky-50/50 !border !border-sky-100 !rounded-2xl !px-3 !py-1 text-slate-900 font-bold text-base shadow-xs"
        >
          <p class="text-slate-600 text-sm leading-relaxed font-normal pt-2">
            {{ item.answer }}
          </p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </section>
</template>
