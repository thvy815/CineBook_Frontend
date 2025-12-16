import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import backgroundImg from "@/assets/images/bg-stroke.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      className="min-h-screen flex flex-col text-white overflow-x-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <Header /> 

      {/* Nội dung chính */}
      <main className="flex-1 mt-16"> 
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
