import React, { useEffect, useState } from "react";
import { userProfileService } from "../../services/userProfile/userProfileService";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DEFAULT_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWZjFwCtwQqzfXoNAkgKhfsZKL7x4x_qVMA&s"; 

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullname, setFullname] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load profile
  useEffect(() => {
    if (!userId) return;

    userProfileService.getByUserId(userId).then(profile => {
      setAvatarUrl(profile.avatarUrl ?? null);
      setFullname(profile.fullname);
    });
  }, [userId]);

  // 🔹 Update avatar
  const handleUpdateAvatar = async () => {
    if (!newAvatarUrl.trim()) {
      alert("Vui lòng nhập Avatar URL");
      return;
    }

    try {
      setLoading(true);
      await userProfileService.updateAvatar(userId, newAvatarUrl);
      alert("Cập nhật avatar thành công");
      window.location.reload();
    } catch (e) {
      alert("Cập nhật avatar thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 to-blue-900 text-white p-4 flex flex-col rounded-lg shadow-lg">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-4 pb-4 border-b border-white/30">
        <div className="w-20 h-20 mb-2 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md">
          <img
            src={avatarUrl || DEFAULT_AVATAR}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <p className="font-semibold">{fullname || "Người dùng"}</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm underline hover:text-yellow-300 transition"
          >
            Thay đổi ảnh đại diện
          </button>
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
        {[
          ["info", "👤", "Thông tin khách hàng"],
          ["favorites", "❤️", "Phim yêu thích"],
          ["history", "⏱️", "Lịch sử đặt vé"],
          ["password", "🔒", "Đổi mật khẩu"]
        ].map(([key, icon, label]) => (
          <button
            key={key}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === key ? "bg-yellow-400 text-black" : ""
            }`}
            onClick={() => setActiveTab(key)}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="text-gray-300 flex items-center space-x-2 p-2 hover:text-white transition">
        <span>↩️</span>
        <span>Đăng xuất</span>
      </button>

      {/* Modal đổi avatar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-4 rounded-lg w-80">
            <h3 className="font-bold mb-3">Cập nhật ảnh đại diện</h3>
            <input
              type="text"
              placeholder="Nhập Avatar URL"
              value={newAvatarUrl}
              onChange={e => setNewAvatarUrl(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateAvatar}
                disabled={loading}
                className="px-3 py-1 bg-yellow-400 font-bold rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
