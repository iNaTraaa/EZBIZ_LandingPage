<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { t } = useI18n()
const { animateFadeIn } = useScrollAnimation()

const sectionHeader = ref(null)
const showcaseContainer = ref(null)

const activeFeatureIndex = ref(0)
const isPlaying = ref(true)
const videoRef = ref(null)

// 4 Main Features Data with Advantage Items for each Feature
const mainFeatures = computed(() => [
  {
    id: 0,
    icon: '🛒',
    title: t('features.item1.title') || 'Bán Hàng Tại Điểm (POS)',
    subtitle: 'Tạo hóa đơn & quét mã thanh toán 3s',
    desc: 'Hỗ trợ tính tiền siêu tốc, in hóa đơn cầm tay và tạo mã QR động cho khách quét thanh toán tức thì.',
    badge: 'Phổ Biến',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-point-of-sale-system-in-a-coffee-shop-41527-large.mp4',
    advantages: [
      { icon: '⚡', title: 'Tính Tiền 3 Giây', desc: 'Tạo đơn & in phiếu siêu tốc, không để khách đợi lâu.' },
      { icon: '📱', title: 'Dùng Trên Điện Thoại', desc: 'Không cần mua máy POS đắt tiền, dùng trực tiếp trên Smartphone.' },
      { icon: '📲', title: 'Mã QR Dynamic', desc: 'Tự động tạo mã QR đúng số tiền đơn hàng.' },
      { icon: '🖨️', title: 'Kết Nối Máy In', desc: 'Hỗ trợ tất cả máy in hóa đơn Bluetooth & Wi-Fi.' }
    ]
  },
  {
    id: 1,
    icon: '📦',
    title: t('features.item2.title') || 'Quản Lý Tồn Kho Thông Minh',
    subtitle: 'Tự động trừ kho & cảnh báo nhập hàng',
    desc: 'Kiểm soát hàng tồn theo thời gian thực. Hệ thống tự động gửi thông báo khi mặt hàng sắp hết.',
    badge: 'Tự Động',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-checking-stock-41525-large.mp4',
    advantages: [
      { icon: '🔄', title: 'Tự Động Trừ Kho', desc: 'Bán hàng tới đâu trừ tồn kho chính xác tới đó.' },
      { icon: '🔔', title: 'Cảnh Báo Hàng Sắp Hết', desc: 'Nhận thông báo nhắc nhập thêm sản phẩm bán chạy.' },
      { icon: '📋', title: 'Kiểm Kho 1-Click', desc: 'Quét mã vạch kiểm hàng tồn trong vài phút.' },
      { icon: '📈', title: 'Dự Báo Tiêu Thụ', desc: 'AI phân tích tốc độ hết hàng của từng món.' }
    ]
  },
  {
    id: 2,
    icon: '📊',
    title: t('features.item3.title') || 'Báo Cáo Sổ Sách Thu Chi AI',
    subtitle: 'Tổng hợp doanh thu & lợi nhuận tự động',
    desc: 'Không cần ghi sổ tay! AI tự động tổng hợp doanh số ngày, tuần, tháng và phân tích món bán chạy.',
    badge: 'Báo Cáo AI',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-financial-graphs-on-a-digital-tablet-41526-large.mp4',
    advantages: [
      { icon: '💰', title: 'Lợi Nhuận Thuần', desc: 'Tự động trừ chi phí vốn để tính lãi thực tế.' },
      { icon: '📈', title: 'Biểu Đồ Trực Quan', desc: 'Xem nhịp đập kinh doanh theo ngày, tuần, tháng.' },
      { icon: '📖', title: 'Thay Thế Sổ Tay', desc: 'Bảo mật dữ liệu 100%, không sợ thất lạc sổ.' },
      { icon: '🏆', title: 'Top Sản Phẩm Hot', desc: 'Biết chính xác mặt hàng mang lại doanh thu cao nhất.' }
    ]
  },
  {
    id: 3,
    icon: '💳',
    title: t('features.item5.title') || 'Thanh Toán QR Ngân Hàng',
    subtitle: 'Tự động đối soát & gạch nợ tức thì',
    desc: 'Khách quét QR VietQR/ZaloPay là hệ thống báo "Đã nhận tiền" qua loa thông minh, tránh lừa đảo.',
    badge: 'An Toàn',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-paying-with-a-smartphone-via-qr-code-41524-large.mp4',
    advantages: [
      { icon: '🔊', title: 'Báo Tiền Qua Loa', desc: 'Phát âm thanh báo tiền về ngay khi khách chuyển.' },
      { icon: '🛡️', title: 'Tránh Lừa Đảo', desc: 'Không cần xem màn hình chuyển khoản giả của khách.' },
      { icon: '⚡', title: 'Gạch Nợ Đơn Hàng', desc: 'Hệ thống tự đối soát & đóng đơn tức thì.' },
      { icon: '🏦', title: 'Hỗ Trợ 40+ Ngân Hàng', desc: 'Tích hợp mã VietQR chuẩn quốc gia.' }
    ]
  }
])

const activeFeature = computed(() => mainFeatures.value[activeFeatureIndex.value])
const leftAdvantages = computed(() => activeFeature.value.advantages.slice(0, 2))
const rightAdvantages = computed(() => activeFeature.value.advantages.slice(2, 4))

const selectFeature = (index) => {
  activeFeatureIndex.value = index
  isPlaying.value = true
  if (videoRef.value) {
    videoRef.value.load()
    videoRef.value.play().catch(() => {})
  }
}

const togglePlay = () => {
  if (!videoRef.value) return
  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const prevFeature = () => {
  const prevIdx = (activeFeatureIndex.value - 1 + mainFeatures.value.length) % mainFeatures.value.length
  selectFeature(prevIdx)
}

const nextFeature = () => {
  const nextIdx = (activeFeatureIndex.value + 1) % mainFeatures.value.length
  selectFeature(nextIdx)
}

const handleVideoEnded = () => {
  nextFeature()
}

onMounted(() => {
  if (sectionHeader.value) animateFadeIn(sectionHeader.value)
  if (showcaseContainer.value) animateFadeIn(showcaseContainer.value)
})
</script>

<template>
  <section id="features" class="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      
      <!-- Section Header -->
      <div ref="sectionHeader" class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-xs font-bold tracking-widest text-sky-600 uppercase mb-2 inline-block">Trải Nghiệm Thực Tế</span>
        <h2 class="text-3xl sm:text-5xl font-black text-slate-900">
          Khám Phá <span class="text-gradient-blue">4 Chức Năng Cốt Lõi</span> Của EZBIZ
        </h2>
        <p class="mt-4 text-slate-600 text-base sm:text-lg">
          Bấm chọn các chức năng bên dưới để xem video demo ứng dụng thực tế.
        </p>
      </div>

      <!-- Main Section Showcase -->
      <div ref="showcaseContainer" class="max-w-7xl mx-auto">
        
        <!-- Desktop Symmetrical 3-Column Layout (lg & xl screens) -->
        <div class="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          
          <!-- Left Column: 2 Advantage Cards -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            <div
              v-for="(adv, aIdx) in leftAdvantages"
              :key="aIdx"
              class="ezbiz-card p-6 rounded-2xl bg-white border border-sky-100/80 shadow-md hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-1"
            >
              <div class="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-4 shadow-xs">
                {{ adv.icon }}
              </div>
              <h4 class="text-base font-extrabold text-slate-900 mb-2">{{ adv.title }}</h4>
              <p class="text-slate-600 text-xs leading-relaxed">{{ adv.desc }}</p>
            </div>
          </div>

          <!-- Center Column: iPhone Video Player Mockup & Progress Navigation -->
          <div class="lg:col-span-4 flex flex-col items-center justify-center">
            
            <!-- iPhone Outer Frame -->
            <div class="relative w-[270px] sm:w-[300px] h-[540px] sm:h-[580px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-950/20">
              
              <!-- Phone Dynamic Island Notch -->
              <div class="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
                <div class="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              </div>

              <!-- Viewport Screen -->
              <div class="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 flex flex-col justify-between">
                
                <!-- Live Tag Overlay -->
                <div class="absolute top-3 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>EZBIZ Video Demo</span>
                </div>

                <!-- Video Element -->
                <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <video
                    ref="videoRef"
                    :src="activeFeature.videoUrl"
                    autoplay
                    muted
                    playsinline
                    @ended="handleVideoEnded"
                    class="w-full h-full object-cover transition-all duration-500"
                  ></video>

                  <button 
                    @click="togglePlay"
                    class="absolute inset-0 bg-black/15 hover:bg-black/30 flex items-center justify-center transition-colors cursor-pointer group"
                    title="Bấm để tạm dừng / phát"
                  >
                    <div class="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sky-600 shadow-xl group-hover:scale-110 transition-transform">
                      <span v-if="!isPlaying" class="text-xl pl-1">▶</span>
                      <span v-else class="text-xl">❚❚</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Progress Navigation Dots & Arrows -->
            <div class="flex items-center justify-center gap-3 mt-6">
              <button
                @click="prevFeature"
                class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                title="Quay lại demo trước"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div class="flex items-center gap-2 px-1">
                <button
                  v-for="(feat, idx) in mainFeatures"
                  :key="feat.id"
                  @click="selectFeature(idx)"
                  :class="[
                    'transition-all duration-300 cursor-pointer',
                    activeFeatureIndex === idx
                      ? 'w-7 h-2.5 bg-sky-500 rounded-full shadow-xs scale-105'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-sky-300 rounded-full'
                  ]"
                  :title="`Xem demo ${feat.title}`"
                ></button>
              </div>

              <button
                @click="nextFeature"
                class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                title="Tiếp theo demo sau"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>

          <!-- Right Column: 2 Advantage Cards -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            <div
              v-for="(adv, aIdx) in rightAdvantages"
              :key="aIdx"
              class="ezbiz-card p-6 rounded-2xl bg-white border border-sky-100/80 shadow-md hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-1"
            >
              <div class="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-4 shadow-xs">
                {{ adv.icon }}
              </div>
              <h4 class="text-base font-extrabold text-slate-900 mb-2">{{ adv.title }}</h4>
              <p class="text-slate-600 text-xs leading-relaxed">{{ adv.desc }}</p>
            </div>
          </div>

        </div>

        <!-- Mobile & Tablet Layout (< lg screens) -->
        <div class="lg:hidden flex flex-col items-center">
          
          <!-- iPhone Video Player Mockup -->
          <div class="relative w-[270px] sm:w-[310px] h-[540px] sm:h-[600px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-950/20">
            <div class="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <div class="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
            </div>

            <div class="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 flex flex-col justify-between">
              <div class="absolute top-3 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>EZBIZ Video Demo</span>
              </div>

              <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
                <video
                  ref="videoRef"
                  :src="activeFeature.videoUrl"
                  autoplay
                  muted
                  playsinline
                  @ended="handleVideoEnded"
                  class="w-full h-full object-cover transition-all duration-500"
                ></video>

                <button 
                  @click="togglePlay"
                  class="absolute inset-0 bg-black/15 hover:bg-black/30 flex items-center justify-center transition-colors cursor-pointer group"
                  title="Bấm để tạm dừng / phát"
                >
                  <div class="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sky-600 shadow-xl group-hover:scale-110 transition-transform">
                    <span v-if="!isPlaying" class="text-xl pl-1">▶</span>
                    <span v-else class="text-xl">❚❚</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Navigation & Dots Indicator -->
          <div class="flex items-center justify-center gap-3 mt-6 mb-12">
            <button
              @click="prevFeature"
              class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              title="Quay lại demo trước"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div class="flex items-center gap-2 px-1">
              <button
                v-for="(feat, idx) in mainFeatures"
                :key="feat.id"
                @click="selectFeature(idx)"
                :class="[
                  'transition-all duration-300 cursor-pointer',
                  activeFeatureIndex === idx
                    ? 'w-7 h-2.5 bg-sky-500 rounded-full shadow-xs scale-105'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-sky-300 rounded-full'
                ]"
                :title="`Xem demo ${feat.title}`"
              ></button>
            </div>

            <button
              @click="nextFeature"
              class="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              title="Tiếp theo demo sau"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Bottom Advantages Cards Grid on Mobile -->
          <div class="w-full max-w-xl">
            <div class="text-center mb-6">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Ưu Điểm Vượt Trội Của {{ activeFeature.title }}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(adv, aIdx) in activeFeature.advantages"
                :key="aIdx"
                class="ezbiz-card p-5 rounded-2xl bg-white border border-sky-100 shadow-md hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl mb-3 shadow-xs">
                    {{ adv.icon }}
                  </div>
                  <h4 class="text-sm font-extrabold text-slate-900 mb-1.5">{{ adv.title }}</h4>
                  <p class="text-slate-600 text-xs leading-relaxed">{{ adv.desc }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
