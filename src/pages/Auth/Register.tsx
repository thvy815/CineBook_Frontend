import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgCinema from "@/assets/images/bg-cinema.jpg";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    nationalId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", formData);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative flex justify-center"
      style={{ backgroundImage: `url(${bgCinema})` }}
    >
      {/* Overlay tối nền */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Nội dung có thể scroll */}
      <div className="relative z-10 w-full max-w-md bg-[#ffffffee] rounded-md shadow-xl p-8 mt-24 mb-16">
        {/* Tabs đăng nhập / đăng ký */}
        <div className="flex justify-center mb-6 space-x-8">
          <a
            href="/login"
            className="text-xl font-bold text-gray-500 hover:text-black transition"
          >
            ĐĂNG NHẬP
          </a>
          <h2 className="text-xl font-bold text-black border-b-2 border-yellow-400 pb-1 cursor-pointer">
            ĐĂNG KÝ
          </h2>
        </div>

        {/* Form đăng ký */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Nhập email"
              required
            />
          </div>

          {/* Tên đăng nhập */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Nhập tên đăng nhập"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          {/* CCCD/CMND */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CCCD/CMND <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Nhập số CCCD/CMND"
              required
            />
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-md hover:bg-yellow-300 transition"
          >
            ĐĂNG KÝ
          </button>

          {/* Dòng “Đã có tài khoản?” */}
          <p className="text-center text-sm text-gray-700 mt-3">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Đăng nhập ngay
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
