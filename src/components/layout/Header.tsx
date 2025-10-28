import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import logo from "@/assets/images/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-700 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="CineBook Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/" className="hover:text-yellow-400 transition">
            Trang chủ
          </Link>
          <Link to="/movies" className="hover:text-yellow-400 transition">
            Phim
          </Link>
          <Link to="/showtimes" className="hover:text-yellow-400 transition">
            Lịch chiếu
          </Link>
          <Link to="/promotions" className="hover:text-yellow-400 transition">
            Khuyến mãi
          </Link>
          <Link to="/profile" className="hover:text-yellow-400 transition">
            Tài khoản
          </Link>
        </nav>

        {/* Thanh tìm kiếm + đăng nhập */}
        <div className="flex items-center space-x-6">
          {/* Search box */}
          <div className="hidden lg:flex items-center bg-white rounded-full px-4 py-2 min-w-[260px]">
            <input
              type="text"
              placeholder="Tìm phim, rạp..."
              className="flex-1 bg-transparent text-black text-sm outline-none"
            />
            <Search className="w-4 h-4 text-black" />
          </div>

          {/* Đăng nhập */}
          <Link
            to="/login" 
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition whitespace-nowrap"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
