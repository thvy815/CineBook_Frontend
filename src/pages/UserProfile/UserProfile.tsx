import React, { useEffect, useState } from "react";
import { userProfileService } from "../../services/userProfile/userProfileService";

const UserProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const [name, setName] = useState("");
  const [dob, setDob] = useState<string | "">("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<string | "">("");
  const [nationalId, setNationalId] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load profile
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await userProfileService.getByUserId(userId);

        setName(profile.fullname);
        setDob(profile.dateOfBirth ? profile.dateOfBirth.slice(0, 10) : "");
        setPhone(profile.phoneNumber);
        setEmail(profile.email);
        setGender(profile.gender ?? "");
        setNationalId(profile.nationalId ?? "");
        setAddress(profile.address ?? "");
        setAvatarUrl(profile.avatarUrl ?? "");
      } catch (e) {
        console.error("Load profile failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // 🔹 Save profile
  const handleSave = async () => {
    if (!userId) return;

    if (!name.trim() || !phone.trim()) {
      alert("Vui lòng nhập đầy đủ Họ tên và Số điện thoại");
      return;
    }

    try {
      setLoading(true);

      await userProfileService.updateByUserId(userId, {
        email,
        username: user.username,
        fullname: name,
        avatarUrl: avatarUrl || null,
        gender: gender || null,
        dateOfBirth: dob ? new Date(dob).toISOString() : null,
        phoneNumber: phone,
        nationalId: nationalId || null,
        address: address || null,
        loyaltyPoint: 0,
        status: "ACTIVE"
      });

      alert("Lưu thông tin thành công");
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("Lưu thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Required label component
  const RequiredLabel: React.FC<{ text: string }> = ({ text }) => (
    <label className="block mb-1 font-medium">
      {text} <span className="text-red-500">*</span>
    </label>
  );

  return (
    <div className="flex-1 text-white">
      <h2 className="text-2xl font-bold mb-4 mt-3">
        THÔNG TIN KHÁCH HÀNG
      </h2>

      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">
          Thông tin cá nhân
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Fullname */}
          <div>
            <RequiredLabel text="Họ và tên" />
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Date of birth */}
          <div>
            <label className="block mb-1">Ngày sinh</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <RequiredLabel text="Số điện thoại" />
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              value={email}
              disabled
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1">Giới tính</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>-- Chọn giới tính --</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
            </select>
          </div>

          {/* National ID */}
          <div>
            <label className="block mb-1">CCCD / CMND</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block mb-1">Địa chỉ</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Avatar URL */}
          <div className="col-span-2">
            <label className="block mb-1">Avatar URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="https://..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-6 bg-gray-200 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-300"
          >
            LƯU THÔNG TIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
