<template>
  <footer class="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm pt-16 pb-12">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Col 1: Brand Info -->
        <div class="md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              Ez
            </div>
            <span class="text-2xl font-black text-white">Ez<span class="text-gradient-orange">Biz</span></span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed mb-4">
            Tiên phong cung cấp dịch vụ thuê tài xế riêng, lái xe hộ & giải pháp vận hành doanh nghiệp an toàn, uy tín tại Việt Nam.
          </p>
          <div class="text-xs text-slate-400 space-y-1">
            <p>📍 Trụ sở chính: TP. Hồ Chí Minh & Hà Nội</p>
            <p>📞 Hotline 24/7: <span class="text-orange-400 font-bold">1900 1234</span></p>
            <p>✉️ Email: hotro@ezbiz.vn</p>
          </div>
        </div>

        <!-- Col 2: Dịch vụ -->
        <div>
          <h4 class="text-white font-bold text-sm mb-4">Dịch Vụ</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="#services" class="hover:text-orange-400 transition-colors">Tài xế lái hộ (Bạn Uống Tôi Lái)</a></li>
            <li><a href="#services" class="hover:text-orange-400 transition-colors">Thuê tài xế theo Giờ / Ngày</a></li>
            <li><a href="#services" class="hover:text-orange-400 transition-colors">Thuê tài xế đi tỉnh / Du lịch</a></li>
            <li><a href="#services" class="hover:text-orange-400 transition-colors">Giải pháp doanh nghiệp trọn gói</a></li>
          </ul>
        </div>

        <!-- Col 3: Cam kết & Bảo hiểm -->
        <div>
          <h4 class="text-white font-bold text-sm mb-4">Cam Kết & An Toàn</h4>
          <ul class="space-y-2.5 text-xs">
            <li><a href="#" class="hover:text-orange-400 transition-colors">Bảo hiểm hành trình 100%</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Tiêu chuẩn tài xế 5 sao</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Quy trình kiểm duyệt hồ sơ</a></li>
            <li><a href="#" class="hover:text-orange-400 transition-colors">Chính sách bồi thường sự cố</a></li>
          </ul>
        </div>

        <!-- Col 4: Tải app & Kết nối -->
        <div>
          <h4 class="text-white font-bold text-sm mb-4">Kết Nối Với Chúng Tôi</h4>
          <p class="text-xs text-slate-400 mb-4">
            Đăng ký nhận ưu đãi giảm 20% cho chuyến đi đầu tiên.
          </p>
          <div class="flex gap-2">
            <input type="email" placeholder="Email của bạn..." class="w-full h-10 px-3 rounded-lg bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-orange-500" />
            <button class="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors">
              Gửi
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          © 2026 EzBiz - Lấy cảm hứng phong cách Bạn Uống Tôi Lái (BUTL). All rights reserved.
        </div>
        <div class="flex gap-6">
          <a href="#" class="hover:text-orange-400">Điều khoản</a>
          <a href="#" class="hover:text-orange-400">Bảo mật</a>
          <a href="#" class="hover:text-orange-400">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
</template>
