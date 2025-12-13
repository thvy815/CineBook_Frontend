import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronDown, User, LogOut } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-700 text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="CineBook Logo" className="h-16 w-auto object-contain" />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/" className="hover:text-yellow-400 transition">Trang chủ</Link>
          <Link to="/movies" className="hover:text-yellow-400 transition">Phim</Link>
          <Link to="/showtimes" className="hover:text-yellow-400 transition">Lịch chiếu</Link>
          <Link to="/promotions" className="hover:text-yellow-400 transition">Khuyến mãi</Link>
        </nav>

        {/* Thanh tìm kiếm + user */}
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

          {/* User dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-md transition"
              >
                <User className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-medium">{user.fullname}</span>
                <ChevronDown className="w-4 h-4 text-yellow-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:bg-gray-700 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 text-yellow-400" />
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500 hover:text-white transition"
                  >
                    <LogOut className="w-4 h-4 text-yellow-400" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition whitespace-nowrap"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
