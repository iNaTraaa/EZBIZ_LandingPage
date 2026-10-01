<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { Sparkles, XCircle, CheckCircle2, Smartphone, Package, Bot, ScanQrCode } from '@lucide/vue'

const { animateFadeIn } = useScrollAnimation()
const ctaSection = ref(null)

const GOOGLE_SHEET_SCRIPT_URL = ref(
  import.meta.env.GG_Sheet
)

const form = ref({
  company: '',
  fullName: '',
  phone: '',
  note: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const handlePhoneKeydown = (e) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter']
  if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
    return
  }
  if (!/^\d$/.test(e.key)) {
    e.preventDefault()
  }
}

const handlePhoneInput = (event) => {
  // Lọc chỉ giữ lại chữ số (0-9)
  let val = event.target.value.replace(/\D/g, '')
  // Giới hạn tối đa 10 chữ số
  if (val.length > 10) {
    val = val.slice(0, 10)
  }
  // Gán ép trực tiếp giá trị vào ô input của trình duyệt để xóa chữ tức thì
  event.target.value = val
  form.value.phone = val
}

const handleSubmit = async () => {
  if (!form.value.fullName.trim() || !form.value.phone.trim()) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const scriptUrl = GOOGLE_SHEET_SCRIPT_URL.value

    if (scriptUrl && scriptUrl.startsWith('https://script.google.com/')) {
      const dataPayload = {
        company: form.value.company,
        fullName: form.value.fullName,
        phone: form.value.phone,
        note: form.value.note
      }

      // Gửi JSON dưới dạng text/plain để tránh CORS preflight và lỗi 404 redirect của Google
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(dataPayload)
      })
    } else {
      // Giả lập thời gian xử lý khi chưa dán URL Google Apps Script
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    isSuccess.value = true
    form.value = { company: '', fullName: '', phone: '', note: '' }
  } catch (err) {
    console.error('Google Sheet Sync Error:', err)
    errorMessage.value = err.message || 'Lỗi gửi dữ liệu'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  isSuccess.value = false
  errorMessage.value = ''
}

onMounted(() => {
  if (ctaSection.value) animateFadeIn(ctaSection.value)
})
</script>

<template>
  <section id="contact" class="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative overflow-hidden">
    <!-- Light Blue Soft Blur Glows -->
    <div class="absolute top-10 right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-10 left-10 w-80 h-80 bg-sky-300/30 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div ref="ctaSection" class="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">
          {{ $t('cta.tag') }}
        </span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {{ $t('cta.titlePrefix') }} <span class="text-gradient-blue">{{ $t('cta.titleHighlight') }}</span>
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal">
          {{ $t('cta.desc') }}
        </p>
      </div>

      <!-- Combined Single Card Container with Divider -->
      <div class="max-w-5xl mx-auto">
        <div class="ezbiz-card p-6 sm:p-10 rounded-3xl bg-white border-2 border-sky-100 shadow-xl text-left">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <!-- LEFT SIDE: Information & Perks -->
            <div class="lg:col-span-5 space-y-5 lg:border-r lg:border-sky-100/80 lg:pr-8 border-b lg:border-b-0 border-sky-100/80 pb-8 lg:pb-0">
              
              <!-- LEFT HEADER -->
              <div>
                <span class="px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full bg-sky-50 text-sky-600 border border-sky-200 inline-flex items-center gap-1.5 mb-2.5">
                  <Sparkles class="w-3.5 h-3.5" />
                  <span>{{ $t('cta.perksHeader') }}</span>
                </span>
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {{ $t('cta.leftTitle') }}
                </h3>
                <p class="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                  {{ $t('cta.leftSubtitle') }}
                </p>
              </div>

              <!-- BEFORE EZBIZ BOX -->
              <div class="p-4 rounded-2xl bg-rose-50/80 border border-rose-100 text-slate-800">
                <div class="flex items-center gap-2 font-black text-rose-600 text-xs sm:text-sm uppercase tracking-wider mb-1.5">
                  <XCircle class="w-4.5 h-4.5 text-rose-500 shrink-0" />
                  <span>{{ $t('cta.beforeHeader') }}</span>
                </div>
                <p class="text-rose-950/80 text-xs sm:text-sm leading-relaxed font-medium">
                  {{ $t('cta.beforeDesc') }}
                </p>
              </div>

              <!-- AFTER EZBIZ SECTION -->
              <div class="space-y-4 pt-1">
                <div class="flex items-center gap-2 font-black text-emerald-600 text-xs sm:text-sm uppercase tracking-wider">
                  <CheckCircle2 class="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>{{ $t('cta.afterHeader') }}</span>
                </div>

                <!-- Perks List -->
                <div class="space-y-3.5 pl-1">
                  <!-- Perk 1 -->
                  <div class="flex items-start gap-3">
                    <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 shadow-xs">
                      <ScanQrCode class="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {{ $t('cta.perk1Title') }}: <span class="font-medium text-slate-600">{{ $t('cta.perk1Desc') }}</span>
                      </h4>
                    </div>
                  </div>

                  <!-- Perk 2 -->
                  <div class="flex items-start gap-3">
                    <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 shadow-xs">
                      <Package class="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {{ $t('cta.perk2Title') }}: <span class="font-medium text-slate-600">{{ $t('cta.perk2Desc') }}</span>
                      </h4>
                    </div>
                  </div>

                  <!-- Perk 3 -->
                  <div class="flex items-start gap-3">
                    <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 shadow-xs">
                      <Bot class="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 class="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {{ $t('cta.perk3Title') }}: <span class="font-medium text-slate-600">{{ $t('cta.perk3Desc') }}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT SIDE: Vertical Form -->
            <div class="lg:col-span-7">
              <!-- Success State Banner -->
              <div v-if="isSuccess" class="py-8 px-4 text-center">
                <!-- Lottie Animation -->
                <div class="w-28 h-28 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                  <iframe 
                    src="https://lottie.host/embed/f45eb12e-469a-41a0-a32e-c68051f8fbd1/k2E3aV5ZxY.lottie"
                    class="w-full h-full border-0 pointer-events-none"
                    title="Success Animation"
                  ></iframe>
                </div>
                <h3 class="text-2xl font-black text-slate-900 mb-2">
                  {{ $t('cta.successTitle') }}
                </h3>
                <p class="text-slate-600 text-sm leading-relaxed mb-6 max-w-md mx-auto font-medium">
                  {{ $t('cta.successDesc') }}
                </p>
                <button 
                  @click="resetForm" 
                  class="px-6 py-3 rounded-full bg-slate-900 text-white font-extrabold text-xs hover:bg-sky-600 transition-colors shadow-md cursor-pointer"
                >
                  Gửi Thông Tin Khác
                </button>
              </div>

              <!-- Form Inputs -->
              <form v-else @submit.prevent="handleSubmit" class="space-y-4">
                
                <div class="mb-4">
                  <h3 class="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                    {{ $t('cta.formTitle') }}
                  </h3>
                  <p class="text-xs text-slate-500 font-medium">
                    {{ $t('cta.formSubtitle') }}
                  </p>
                </div>

                <!-- Tên Cửa Hàng / Doanh Nghiệp -->
                <div>
                  <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    {{ $t('cta.companyLabel') }}
                  </label>
                  <input 
                    v-model="form.company"
                    type="text"
                    :placeholder="$t('cta.companyPlaceholder')"
                    class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                <!-- Họ Và Tên (*) -->
                <div>
                  <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    {{ $t('cta.nameLabel') }}
                  </label>
                  <input 
                    v-model="form.fullName"
                    type="text"
                    required
                    :placeholder="$t('cta.namePlaceholder')"
                    class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                <!-- Số Điện Thoại (*) -->
                <div>
                  <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    {{ $t('cta.phoneLabel') }}
                  </label>
                  <input 
                    :value="form.phone"
                    @keydown="handlePhoneKeydown"
                    @input="handlePhoneInput"
                    type="text"
                    inputmode="numeric"
                    maxlength="10"
                    required
                    :placeholder="$t('cta.phonePlaceholder')"
                    class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                <!-- Ghi Chú -->
                <div>
                  <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    {{ $t('cta.noteLabel') }}
                  </label>
                  <textarea 
                    v-model="form.note"
                    rows="2"
                    :placeholder="$t('cta.notePlaceholder')"
                    class="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full h-13 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-500 to-sky-500 text-white font-black text-base shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-3"
                >
                  <span>{{ isSubmitting ? $t('cta.submitting') : $t('cta.btnSubmit') }}</span>
                </button>

                <!-- Footer Bar: Security Note -->
                <div class="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
                  <p>{{ $t('cta.securityNote') }}</p>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>
