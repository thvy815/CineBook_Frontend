import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgCinema from "@/assets/images/bg-cinema.jpg";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative flex justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgCinema})` }}
    >
      {/* Overlay tối nền (phủ toàn màn hình) */}
      <div className="absolute inset-0 bg-black/60 min-h-screen"></div>

      {/* Khung form */}
      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-md shadow-xl p-8 mt-24 mb-16">
        {/* Tabs đăng nhập / đăng ký */}
        <div className="flex justify-center mb-6 space-x-8">
          <h2 className="text-xl font-bold text-black border-b-2 border-yellow-400 pb-1 cursor-pointer">
            ĐĂNG NHẬP
          </h2>
          <a
            href="/register"
            className="text-xl font-bold text-gray-500 hover:text-black transition"
          >
            ĐĂNG KÝ
          </a>
        </div>

        {/* Form đăng nhập */}
        <form className="space-y-5">
          {/* Tài khoản */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập, Email hoặc số điện thoại{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Nhập tài khoản"
              required
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md p-2.5 pr-10 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Ghi nhớ + Quên mật khẩu */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2 accent-yellow-400" />
              Lưu mật khẩu đăng nhập
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-md hover:bg-yellow-300 transition"
          >
            ĐĂNG NHẬP
          </button>

          {/* Dòng “Chưa có tài khoản?” */}
          <p className="text-center text-sm text-gray-700 mt-3">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
