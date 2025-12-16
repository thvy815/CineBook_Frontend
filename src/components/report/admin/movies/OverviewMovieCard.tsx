"use client";
import React, { useEffect, useState } from "react";
import { Film, Play, Calendar, Archive } from "lucide-react";
import { movieManagementService } from "../../../../services/movie/movieManagementService";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

/* ================= TYPES ================= */
interface MovieStats {
  totalMovies: number;
  nowPlaying: number;
  upcoming: number;
  archived: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

/* ================= CARD ================= */
const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        <div className="text-slate-400">{icon}</div>
      </div>
      <p className="text-3xl font-semibold text-yellow-400">
        {value.toLocaleString("vi-VN")}
      </p>
    </div>
  );
};

/* ================= MAIN ================= */
export default function OverviewMovieCards(): React.JSX.Element {
  const [stats, setStats] = useState<MovieStats | null>(null);
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
      const [
        total,
        nowPlaying,
        upcoming,
        archived,
      ] = await Promise.all([
        movieManagementService.adminList({ page: 1, size: 1 }),
        movieManagementService.adminList({ page: 1, size: 1, status: "NowPlaying" }),
        movieManagementService.adminList({ page: 1, size: 1, status: "Upcoming" }),
        movieManagementService.adminList({ page: 1, size: 1, status: "Archived" }),
      ]);

      setStats({
        totalMovies: total.totalElements ?? 0,
        nowPlaying: nowPlaying.totalElements ?? 0,
        upcoming: upcoming.totalElements ?? 0,
        archived: archived.totalElements ?? 0,
      });
    } catch (err) {
      console.error("load movie stats error:", err);
      setError("Không thể tải dữ liệu thống kê phim.");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-pulse"
          >
            <div className="flex justify-between mb-3">
              <div className="h-4 bg-slate-700 rounded w-24" />
              <div className="h-5 w-5 bg-slate-700 rounded" />
            </div>
            <div className="h-8 bg-slate-700 rounded w-20" />
          </div>
        ))}
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error || !stats) {
    return (
      <div className="lg:col-span-4 p-4 text-center text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl">
        {error ?? "Không có dữ liệu thống kê phim"}
      </div>
    );
  }

  const cards: StatCardProps[] = [
    { label: "Tổng số phim", value: stats.totalMovies, icon: <Film size={20} /> },
    { label: "Đang chiếu", value: stats.nowPlaying, icon: <Play size={20} /> },
    { label: "Sắp chiếu", value: stats.upcoming, icon: <Calendar size={20} /> },
    { label: "Lưu trữ", value: stats.archived, icon: <Archive size={20} /> },
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
