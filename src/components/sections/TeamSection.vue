<script setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

import cow1 from '@/assets/img/team_member/cow1.jpg'
import cow2 from '@/assets/img/team_member/cow2.jpg'
import cow3 from '@/assets/img/team_member/cow3.jpg'
import cow4 from '@/assets/img/team_member/cow4.jpg'
import cow5 from '@/assets/img/team_member/cow5.jpg'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()

const teamSection = ref(null)

const members = computed(() => [
  {
    key: 'member1',
    name: t('team.member1.name'),
    role: t('team.member1.role'),
    roleDetail: t('team.member1.roleDetail'),
    desc: t('team.member1.desc'),
    avatar: cow1
  },
  {
    key: 'member2',
    name: t('team.member2.name'),
    role: t('team.member2.role'),
    roleDetail: t('team.member2.roleDetail'),
    desc: t('team.member2.desc'),
    avatar: cow2
  },
  {
    key: 'member3',
    name: t('team.member3.name'),
    role: t('team.member3.role'),
    roleDetail: t('team.member3.roleDetail'),
    desc: t('team.member3.desc'),
    avatar: cow3
  },
  {
    key: 'member4',
    name: t('team.member4.name'),
    role: t('team.member4.role'),
    roleDetail: t('team.member4.roleDetail'),
    desc: t('team.member4.desc'),
    avatar: cow4
  },
  {
    key: 'member5',
    name: t('team.member5.name'),
    role: t('team.member5.role'),
    roleDetail: t('team.member5.roleDetail'),
    desc: t('team.member5.desc'),
    avatar: cow5
  }
])

onMounted(() => {
  if (teamSection.value) animateFadeIn(teamSection.value)
})
</script>

<template>
  <section id="team" class="py-20 sm:py-28 bg-gradient-to-b from-white via-sky-50/20 to-slate-50 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div ref="teamSection" class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">
          {{ $t('team.sectionTag') }}
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {{ $t('team.titlePrefix') }} <span class="text-gradient-blue">{{ $t('team.titleSuffix') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          {{ $t('team.subtitle') }}
        </p>
      </div>

      <!-- Members Grid: 5 Members on 1 Row on Desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
        <div 
          v-for="(member, index) in members" 
          :key="index"
          class="ezbiz-card p-5 sm:p-6 rounded-3xl bg-white border border-sky-100/90 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center justify-between group relative overflow-hidden"
        >
          <!-- Subtle top background accent glow -->
          <div class="absolute -top-12 -left-12 w-24 h-24 bg-sky-200/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

          <div class="flex flex-col items-center w-full">
            
            <!-- Row 1: Avatar Image -->
            <div class="relative mb-4">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl shadow-sky-500/15 overflow-hidden group-hover:scale-105 transition-transform duration-300 relative z-10 bg-slate-100">
                <img 
                  :src="member.avatar" 
                  :alt="member.name"
                  class="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <!-- Row 2: Name -->
            <h3 class="text-base sm:text-lg font-black text-slate-900 mb-1 group-hover:text-sky-600 transition-colors leading-snug min-h-[44px] flex items-center justify-center">
              {{ member.name }}
            </h3>

            <!-- Row 3: Role Badge -->
            <div class="mb-3">
              <span class="inline-block px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider rounded-full bg-sky-50 text-sky-600 border border-sky-200/80 shadow-xs">
                {{ member.role }}
              </span>
            </div>

            <!-- Member Description -->
            <p class="text-xs text-slate-500 leading-relaxed min-h-[44px] flex items-center justify-center">
              {{ member.desc }}
            </p>

          </div>

          <!-- Bottom Role Sub-tag -->
          <div class="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center">
            <span class="text-[10px] font-bold text-slate-400 tracking-wide uppercase">
              {{ member.roleDetail }}
            </span>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
