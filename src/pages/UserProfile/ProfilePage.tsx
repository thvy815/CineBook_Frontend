// src/pages/User/Profile.tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import BookingHistory from "./BookingHistory";
import ChangePassword from "./ChangePassword";
import FavoriteMovies from "./FavoriteMovies";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="flex justify-center min-h-screen pt-20 px-8">
      {/* Container giới hạn chiều rộng */}
      <div className="flex w-full max-w-6xl gap-8 items-start">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Nội dung profile */}
        <div className="flex-1">
          {activeTab === "info" && <UserProfile />}
          {activeTab === "history" && <BookingHistory />}
          {activeTab === "password" && <ChangePassword />}
          {activeTab === "favorites" && <FavoriteMovies />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
