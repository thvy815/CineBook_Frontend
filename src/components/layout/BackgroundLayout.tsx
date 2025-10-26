import React from "react";
import backgroundImg from "@/assets/images/bg-stroke.png";

interface BackgroundLayoutProps {
  children: React.ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
    console.log(backgroundImg); // Kiểm tra đường dẫn hình ảnh
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundLayout;
