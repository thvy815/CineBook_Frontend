import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import logo from "@/assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">

        {/* Logo + mô tả */}
        <div className="col-span-1 lg:col-span-2">
          <img
            src={logo}
            alt="CineBook Logo"
            className="h-24 mb-3 object-contain mx-auto lg:mx-0 brightness-110"
          />
          <p className="text-sm leading-relaxed text-gray-400">
            Trải nghiệm xem phim đỉnh cao cùng{" "}
            <span className="text-yellow-400 font-semibold">CineBook</span>.
            Đặt vé nhanh chóng, cập nhật ưu đãi và tận hưởng thế giới điện ảnh sống động.
          </p>
        </div>

        {/* Cột: Tài khoản */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">👤 Tài khoản</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-yellow-400 transition">Đăng nhập</a></li>
            <li><a href="/register" className="hover:text-yellow-400 transition">Đăng ký</a></li>
            <li><a href="/profile" className="hover:text-yellow-400 transition">Thông tin cá nhân</a></li>
            <li><a href="/booking-history" className="hover:text-yellow-400 transition">Lịch sử đặt vé</a></li>
          </ul>
        </div>

        {/* Cột: Xem phim */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">🎬 Xem phim</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/movies" className="hover:text-yellow-400 transition">Phim đang chiếu</a></li>
            <li><a href="/movies/coming-soon" className="hover:text-yellow-400 transition">Phim sắp chiếu</a></li>
            <li><a href="/showtimes" className="hover:text-yellow-400 transition">Lịch chiếu</a></li>
            <li><a href="/booking" className="hover:text-yellow-400 transition">Đặt vé</a></li>
          </ul>
        </div>

        {/* Cột: CineHub */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">🍿 CineHub</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-yellow-400 transition">Giới thiệu</a></li>
            <li><a href="/promotion" className="hover:text-yellow-400 transition">Khuyến mãi</a></li>
            <li><a href="/theater-system" className="hover:text-yellow-400 transition">Hệ thống rạp</a></li>
            <li><a href="/support" className="hover:text-yellow-400 transition">Hỗ trợ</a></li>
          </ul>
        </div>

        {/* Cột: Liên hệ */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">📞 Liên hệ</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><span className="text-yellow-400 mr-2">📍</span> 123 Đường ABC, Quận 1, TP.HCM</li>
            <li><span className="text-yellow-400 mr-2">📞</span> 1900 123 456</li>
            <li><span className="text-yellow-400 mr-2">📧</span> support@cinehub.vn</li>
          </ul>

          <div className="flex space-x-5 mt-6 text-2xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-red-500 transition"><FaYoutube /></a>
            <a href="#" className="hover:text-cyan-400 transition"><SiZalo /></a>
            <a href="#" className="hover:text-white transition"><FaTiktok /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © 2025 <span className="text-yellow-400 font-semibold">CineBook</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
