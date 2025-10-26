import React, { useState } from "react";
import bgCinema from "@/assets/images/bg-cinema.jpg";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gọi API gửi link reset password
    console.log("Gửi link reset tới:", email);
    setIsSent(true); // đánh dấu đã gửi
  };

  return (
    <div
      className="relative flex justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgCinema})` }}
    >
      {/* Overlay tối nền */}
      <div className="absolute inset-0 bg-black/60 min-h-screen"></div>

      {/* Khung form */}
      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-md shadow-xl p-8 mt-24 mb-16">
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          Quên mật khẩu
        </h2>
        {!isSent ? (
          <>
            <p className="text-gray-700 text-sm text-center mb-6">
            Nhập email của bạn để nhận link đặt lại mật khẩu.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md p-2.5 text-gray-800 focus:ring-2 focus:ring-yellow-400 outline-none"
                placeholder="Nhập email của bạn"
                required
                />
            </div>

            {/* Nút gửi */}
            <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-md hover:bg-yellow-300 transition"
            >
                Gửi link
            </button>

            {/* Link quay lại login */}
            <p className="text-center text-sm text-gray-700 mt-3">
                Quay lại{" "}
                <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
                >
                đăng nhập
                </a>
            </p>
            </form>
          </>
        ) : (
          <div className="text-center">
            {/* Link quay lại login */}
            <p className="text-gray-700 font-medium text-lg mb-6">
              Chúng tôi đã gửi link reset tới email của bạn.
            </p>
            <p className="text-center text-sm text-gray-700 mt-3">
                Quay lại{" "}
                <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
                >
                đăng nhập
                </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
