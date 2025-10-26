// src/pages/User/Profile.tsx
import { useState } from "react";
import UserProfile from "./UserProfile";
import Sidebar from "./Sidebar";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="flex justify-center min-h-screen bg-gray-900 pt-20 px-8">
      {/* Container giới hạn chiều rộng */}
      <div className="flex w-full max-w-6xl gap-8 items-start">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Nội dung profile */}
        <div className="flex-1">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
