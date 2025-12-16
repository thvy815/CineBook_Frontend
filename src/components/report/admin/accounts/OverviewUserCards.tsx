"use client";
import React, { useEffect, useState } from "react";
import { Users, UserCheck, Briefcase, Shield, Crown } from "lucide-react";
import type { StatsOverviewResponse } from "../../../../types/auth";
import { userAdminService } from "../../../../services/auth/userService";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

interface StatCardProps {
  label: string;
  value?: number | null;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBg,
  iconColor,
}) => {
  const safeValue = typeof value === "number" && !Number.isNaN(value) ? value : 0;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 transition hover:border-slate-600">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-400 font-medium">{label}</span>

        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>

      <div className="text-3xl font-semibold text-yellow-400">
        {safeValue.toLocaleString("vi-VN")}
      </div>
    </div>
  );
};

export default function OverviewCards(): React.JSX.Element {
  const [data, setData] = useState<StatsOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    setError(null);
    try {
      // ✅ FIX: hàm này trả thẳng StatsOverviewResponse
      const stats = await userAdminService.getStatsOverview();
      setData(stats);
    } catch (err) {
      console.error("getStatsOverview error", err);
      setError("Không thể tải thống kê tài khoản");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 animate-pulse"
          >
            <div className="flex justify-between mb-4">
              <div className="h-4 w-24 bg-slate-700 rounded" />
              <div className="h-10 w-10 bg-slate-700 rounded-lg" />
            </div>
            <div className="h-8 w-20 bg-slate-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 text-center text-red-400 bg-red-950/40 border border-red-900 rounded-lg">
        {error ?? "Không có dữ liệu thống kê"}
      </div>
    );
  }

  const cards: StatCardProps[] = [
    {
      label: "Tổng tài khoản",
      value: data.totalUsers,
      icon: <Users size={20} />,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
    },
    {
      label: "Khách hàng",
      value: data.totalCustomers,
      icon: <UserCheck size={20} />,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
    },
    {
      label: "Nhân viên",
      value: data.totalStaff,
      icon: <Briefcase size={20} />,
      iconBg: "bg-indigo-500/15",
      iconColor: "text-indigo-400",
    },
    {
      label: "Quản lý",
      value: data.totalManagers,
      icon: <Shield size={20} />,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-400",
    },
    {
      label: "Quản trị",
      value: data.totalAdmins,
      icon: <Crown size={20} />,
      iconBg: "bg-yellow-500/15",
      iconColor: "text-yellow-400",
    },
  ];

  const container: Variants | undefined = reduceMotion
    ? undefined
    : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

  const item: Variants | undefined = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
      variants={container}
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "show"}
    >
      {cards.map((c, i) => (
        <motion.div key={i} variants={item}>
          <StatCard {...c} />
        </motion.div>
      ))}
    </motion.div>
  );
}
