import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 to-blue-900 text-white p-4 flex flex-col rounded-lg shadow-lg">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-4 pb-4 border-b border-white/30">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
        <div className="text-center">
          <p className="font-semibold">Nguyễn Thúy Vy</p>
          <a href="#" className="text-sm underline">
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
            activeTab === "favoriteMovie" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("favoriteMovie")}
        >
          <span>👤</span>
          <span>Phim yêu thích</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "resetPassword" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("resetPassword")}
        >
          <span>⭐</span>
          <span>Đổi mật khẩu</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "history" ? "bg-yellow-400 text-black" : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          <span>⏱️</span>
          <span>Lịch sử mua hàng</span>
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
