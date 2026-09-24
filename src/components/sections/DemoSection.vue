<script setup>
import { ref, onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { animateFadeIn } = useScrollAnimation()
const demoContainer = ref(null)

const activeTab = ref(0)
const tabs = [
  { id: 0, title: 'Bảng Điều Khiển Tổng Quan', icon: '💻' },
  { id: 1, title: 'Tự Động Hóa Workflow', icon: '⚙️' },
  { id: 2, title: 'Báo Cáo Tài Chính AI', icon: '📈' }
]

onMounted(() => {
  if (demoContainer.value) {
    animateFadeIn(demoContainer.value)
  }
})
</script>

<template>
  <section id="demo" class="py-24 relative overflow-hidden">
    <div ref="demoContainer" class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3">Giao Diện Tương Tác</h2>
        <p class="text-3xl sm:text-5xl font-extrabold text-white">
          Trải Nghiệm Sự Mượt Mà Trong <span class="text-gradient">Từng Thao Tác</span>
        </p>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer',
            activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
              : 'glass-panel text-slate-400 hover:text-white hover:bg-slate-800/80'
          ]"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.title }}</span>
        </button>
      </div>

      <!-- Tab Content Cards -->
      <div class="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl relative min-h-[360px] flex items-center justify-center">
        <!-- Tab 0 Content -->
        <div v-if="activeTab === 0" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
          <div>
            <span class="text-xs font-bold text-blue-400 uppercase">Dashboard Vận Hành</span>
            <h3 class="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
              Theo dõi nhịp đập doanh nghiệp chỉ trong 1 màn hình
            </h3>
            <p class="text-slate-400 text-base leading-relaxed mb-6">
              Hệ thống tự động tổng hợp chỉ số KPI, tiến độ dự án và luồng tiền trực tiếp theo thời gian thực. Giúp ban lãnh đạo đưa ra quyết định chính xác mà không cần đợi báo cáo cuối tuần.
            </p>
            <ul class="space-y-3 text-slate-300 text-sm">
              <li class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Tùy chỉnh Widget linh hoạt kéo thả
              </li>
              <li class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Cảnh báo thông minh khi chỉ số bất thường
              </li>
            </ul>
          </div>
          <div class="rounded-xl bg-slate-900 border border-slate-800 p-4 shadow-inner min-h-[220px] flex items-center justify-center text-center">
            <div class="space-y-4 w-full">
              <div class="h-3 bg-blue-500/30 rounded w-3/4 mx-auto animate-pulse"></div>
              <div class="h-3 bg-indigo-500/20 rounded w-1/2 mx-auto"></div>
              <div class="grid grid-cols-3 gap-2 pt-4">
                <div class="h-16 bg-slate-800/80 rounded-lg p-2 border border-slate-700/50">
                  <div class="text-xs text-slate-400">KPI</div>
                  <div class="text-lg font-bold text-blue-400">94%</div>
                </div>
                <div class="h-16 bg-slate-800/80 rounded-lg p-2 border border-slate-700/50">
                  <div class="text-xs text-slate-400">Dự án</div>
                  <div class="text-lg font-bold text-emerald-400">12/12</div>
                </div>
                <div class="h-16 bg-slate-800/80 rounded-lg p-2 border border-slate-700/50">
                  <div class="text-xs text-slate-400">Nhân sự</div>
                  <div class="text-lg font-bold text-purple-400">48</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 1 Content -->
        <div v-else-if="activeTab === 1" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
          <div>
            <span class="text-xs font-bold text-purple-400 uppercase">Automation Engine</span>
            <h3 class="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
              Tạo quy trình tự động chỉ với thao tác Kéo & Thả
            </h3>
            <p class="text-slate-400 text-base leading-relaxed mb-6">
              Không cần biết viết code! Bạn dễ dàng thiết lập luồng duyệt chi, thông báo hợp đồng hết hạn hay gửi email chăm sóc khách hàng tự động.
            </p>
            <ul class="space-y-3 text-slate-300 text-sm">
              <li class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Hơn 100+ mẫu workflow có sẵn
              </li>
              <li class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Gửi thông báo tức thì qua Zalo OA, Telegram, Slack
              </li>
            </ul>
          </div>
          <div class="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-inner text-center">
            <div class="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">
              <span>Đơn xin nghỉ phép</span>
              <span class="text-emerald-400">Tự động duyệt</span>
            </div>
            <div class="flex items-center justify-center gap-3">
              <div class="px-3 py-2 bg-blue-600/30 border border-blue-500/40 rounded-lg text-xs text-blue-300">Nhân viên gửi</div>
              <span class="text-slate-500">➔</span>
              <div class="px-3 py-2 bg-purple-600/30 border border-purple-500/40 rounded-lg text-xs text-purple-300">AI Phân tích</div>
              <span class="text-slate-500">➔</span>
              <div class="px-3 py-2 bg-emerald-600/30 border border-emerald-500/40 rounded-lg text-xs text-emerald-300">Xác nhận SQL</div>
            </div>
          </div>
        </div>

        <!-- Tab 2 Content -->
        <div v-else-if="activeTab === 2" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
          <div>
            <span class="text-xs font-bold text-emerald-400 uppercase">Financial Intelligence</span>
            <h3 class="text-2xl sm:text-3xl font-bold text-white mt-2 mb-4">
              Dự báo dòng tiền chuẩn xác bằng thuật toán AI
            </h3>
            <p class="text-slate-400 text-base leading-relaxed mb-6">
              AI liên tục phân tích thói quen thanh toán của đối tác, đề xuất thời điểm tối ưu để đầu tư hoặc cắt giảm ngân sách phòng rủi ro.
            </p>
            <ul class="space-y-3 text-slate-300 text-sm">
              <li class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Xuất báo cáo thuế & tài chính chuẩn quy định
              </li>
              <li class="flex items-center gap-3">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</span>
                Tự động đối soát ngân hàng theo mã QR
              </li>
            </ul>
          </div>
          <div class="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-inner text-center">
            <div class="text-sm font-semibold text-slate-300 mb-4">Dự báo Dòng Tiền Q4</div>
            <div class="text-3xl font-extrabold text-emerald-400">+ 3.2 Tỷ VNĐ</div>
            <p class="text-xs text-slate-400 mt-2">Dự kiến tăng trưởng 32% nhờ tối ưu chi phí vận hành</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

