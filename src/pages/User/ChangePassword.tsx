import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    // Giả lập gọi API
    setTimeout(() => {
      setMessage("Cập nhật mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 800);
  };

  return (
    <div className="flex-1 text-white">
      <h2 className="text-2xl font-bold mb-4 mt-3">ĐỔI MẬT KHẨU</h2>
      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Cập nhật mật khẩu</h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mật khẩu cũ */}
          <div>
            <label className="block mb-1 text-gray-700">
              Mật khẩu cũ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                className="w-full border border-gray-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showOld ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block mb-1 text-gray-700">
              Mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                className="w-full border border-gray-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showNew ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div>
            <label className="block mb-1 text-gray-700">
              Xác nhận mật khẩu mới <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full border border-gray-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showConfirm ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Thông báo */}
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {message && <p className="text-green-600 text-sm font-medium">{message}</p>}

          {/* Nút cập nhật */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-200 text-black px-6 py-2 rounded-lg font-bold transition hover:bg-gray-300"
            >
              CẬP NHẬT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
