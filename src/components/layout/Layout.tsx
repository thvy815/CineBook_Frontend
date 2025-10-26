import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white">
      {/* Header */}
      <Header /> 

      {/* Nội dung chính */}
      <main className="flex-1 pt-16"> 
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
