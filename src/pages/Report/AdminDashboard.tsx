// src/app/(admin)/AdminDashboard.tsx
"use client";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import { useScrollToTop } from "../../hooks/useScrollToTop";

import OverviewCards from "../../components/report/admin/accounts/OverviewUserCards";
import UserManagementTable from "../../components/report/admin/accounts/UserManagementTable";
import MovieManagementTable from "../../components/report/admin/movies/MovieManagementTable";
import ShowtimeManagementTable from "../../components/report/admin/showtimes/showtimeManagementTable";
import FacilitiesManagement from "../../components/report/admin/facilities/FacilitiesManagement";
import PromotionManagement from "../../components/report/admin/promotion/PromotionManagement";
import BookingManagement from "../../components/report/admin/bookings/BookingManagement";

type Tab = {
  id: string;
  label: string;
};

const TABS: Tab[] = [
  { id: "accounts", label: "Quản lý tài khoản" },
  { id: "movies", label: "Quản lý phim" },
  { id: "showtimes", label: "Quản lý lịch chiếu" },
  { id: "bookings", label: "Quản lý đặt vé" },
  { id: "facilities", label: "Quản lý cơ sở vật chất" },
  { id: "promotions", label: "Quản lý mã giảm giá" },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("accounts");

  useScrollToTop();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* HEADER */}
      <Header />

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-64 fixed top-16 bottom-0 bg-[#020617] border-r border-slate-800">
          <div className="p-5">
            <h1 className="text-xl font-semibold text-slate-200 mb-1">
              Bảng Điều Khiển
            </h1>
            <p className="text-sm text-slate-400 mb-6">
              Chào mừng Quản trị viên
            </p>

            <nav className="space-y-1">
              {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      window.scrollTo({ top: 0, behavior: "auto" });
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition
                      ${
                        isActive
                          ? "bg-slate-800 text-yellow-400 font-semibold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-yellow-300"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-64 pt-16">
          <div className="px-8 py-6 w-full">
            {/* KHÔNG DÙNG max-w -> FULL WIDTH */}
            {activeTab === "accounts" && (
              <div className="space-y-8">
                <OverviewCards />
                <section>
                  <h2 className="text-lg font-semibold mb-4 text-slate-200">
                    Quản lý tài khoản
                  </h2>
                  <UserManagementTable />
                </section>
              </div>
            )}

            {activeTab === "movies" && (
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-slate-200">
                  Quản lý phim
                </h2>
                <MovieManagementTable />
              </section>
            )}

            {activeTab === "showtimes" && (
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-slate-100">
                </h2>
                
                <ShowtimeManagementTable/>
              </section>
            )}

            {activeTab === "bookings" && (
              <section>
                <h2 className="text-lg font-semibold text-slate-200 mb-4">
                  Quản lý đặt vé
                </h2>
                <BookingManagement/>
              </section>
            )}

            {activeTab === "facilities" && (
              <section>
                <h2 className="text-lg font-semibold text-slate-200 mb-4">
                  Quản lý cơ sở vật chất
                </h2>
                <FacilitiesManagement/>
              </section>
            )}

            {activeTab === "promotions" && (
              <section>
                <h2 className="text-lg font-semibold text-slate-200 mb-4">
                  Quản lý mã giảm giá
                </h2>
                <PromotionManagement/>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
