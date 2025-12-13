import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgCinema from "@/assets/images/bg-cinema.jpg";
import { authService } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Vui lòng điền trường này";
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        fullname: formData.fullName,
        phoneNumber: formData.phoneNumber,
      };

      const res = await authService.register(payload);

      // Lưu token
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      navigate("/login"); // chuyển đến trang đăng nhập
    } catch (err: any) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative flex justify-center"
      style={{ backgroundImage: `url(${bgCinema})` }}
    >
      {/* Overlay tối nền */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Form đăng ký */}
      <div className="relative z-10 w-full max-w-md bg-[#ffffffee] rounded-md shadow-xl p-8 mt-24 mb-16">
        {/* Tabs */}
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
              className={`mt-1 w-full border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none`}
              placeholder="Nhập họ và tên"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
            )}
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
              className={`mt-1 w-full border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none`}
              placeholder="Nhập số điện thoại"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
            )}
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
              className={`mt-1 w-full border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none`}
              placeholder="Nhập tên đăng nhập"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
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
              className={`mt-1 w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none`}
              placeholder="Nhập email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
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
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md p-2.5 pr-10 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none`}
                placeholder="Nhập mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md p-2.5 pr-10 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none`}
                placeholder="Nhập lại mật khẩu"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
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
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Đăng nhập ngay
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
