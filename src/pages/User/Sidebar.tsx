import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const avatarUrl =
    "https://banobagi.vn/wp-content/uploads/2025/04/avatar-cute-5-1.jpg"; // 🖼️ URL ảnh mạng

  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 to-blue-900 text-white p-4 flex flex-col rounded-lg shadow-lg">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-4 pb-4 border-b border-white/30">
        <div className="w-20 h-20 mb-2 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold">Nguyễn Thúy Vy</p>
          <a href="#" className="text-sm underline hover:text-yellow-300 transition">
            Thay đổi ảnh đại diện
          </a>
        </div>
      </div>

      {/* Membership */}
      <div className="mb-4 pb-4 border-b border-white/30">
        <div className="bg-yellow-400 text-black text-center py-2 rounded font-bold mb-1">
          C'Friends
        </div>
        <p className="text-sm mb-1 mt-3">Tích điểm C'Friends</p>
        <div className="w-full bg-gray-400 h-2 rounded mb-1">
          <div className="bg-red-500 h-2 rounded w-0"></div>
        </div>
        <p className="text-sm">0/10K</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col space-y-2 mb-4 pb-4 border-b border-white/30">
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "info" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("info")}
        >
          <span>👤</span>
          <span>Thông tin khách hàng</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "favorites" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <span>❤️</span>
          <span>Phim yêu thích</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "history" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          <span>⏱️</span>
          <span>Lịch sử đặt vé</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "password" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("password")}
        >
          <span>🔒</span>
          <span>Đổi mật khẩu</span>
        </button>
      </div>

      {/* Logout */}
      <button className="text-gray-300 flex items-center space-x-2 p-2 hover:text-white transition">
        <span>↩️</span>
        <span>Đăng xuất</span>
      </button>
    </div>
  );
};

export default Sidebar;
