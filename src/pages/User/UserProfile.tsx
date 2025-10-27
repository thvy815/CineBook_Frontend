import React, { useState } from "react";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const [name, setName] = useState("Nguyễn Thúy Vy");
  const [dob, setDob] = useState("2005-11-18");
  const [phone, setPhone] = useState("0944383828");
  const [email, setEmail] = useState("vynguyen8105@gmail.com");

  return (
    <div className="flex-1 text-white">
      <h2 className="text-2xl font-bold mb-4 mt-3">THÔNG TIN KHÁCH HÀNG</h2>
      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Thông tin cá nhân</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Họ và tên</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Ngày sinh</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Số điện thoại</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
            <button className="mt-6 bg-gray-200 text-black px-4 py-2 rounded-lg font-bold">
              LƯU THÔNG TIN
            </button>
          </div>
      </div>
    </div>
  );
};

export default UserProfile;
