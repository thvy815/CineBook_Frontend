"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Film,
  Archive,
  Search,
} from "lucide-react";
import Swal from "sweetalert2";

import { movieManagementService } from "../../../../services/movie/movieManagementService";
import { movieService } from "../../../../services/movie/movieService";
import type { MovieDetail } from "../../../../types/movie";
import type { PageResponse } from "../../../../types/PageResponse";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useBodyScrollLock } from "../../../../hooks/useBodyScrollLock";
import { Badge } from "../../../ui/Badge";
import { getPosterUrl } from "../../../../utils/getPosterUrl";
import OverviewMovieCards from "./OverviewMovieCard";
import MovieEditModal from "./MovieEditModal";

const ITEMS_PER_PAGE = 10;

/* ================= TABLE ================= */
interface MovieTableProps {
  status: "NowPlaying" | "Upcoming" | "Archived";
  keyword?: string;
}

function MovieTable({ status, keyword }: MovieTableProps) {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState<MovieDetail | null>(null);

  useBodyScrollLock(isModalOpen);

  const fetchMovies = async (page = 1, showSkeleton = false) => {
    try {
      showSkeleton && setLoading(true);

      const res: PageResponse<MovieDetail> =
        await movieManagementService.adminList({
          page,
          size: ITEMS_PER_PAGE,
          keyword: keyword || undefined,
          status,
          sortBy: "createdAt",
          sortType: "DESC",
        });

      setMovies(res.data ?? []);
      setPaging({
        page: res.page ?? page,
        totalPages: res.totalPages ?? 1,
        total: res.totalElements ?? 0,
      });
    } catch {
      Swal.fire("Lỗi", "Không thể tải danh sách phim", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
    // eslint-disable-next-line
  }, [keyword, status]);

  async function openModal(id: string) {
    setIsModalOpen(true);
    try {
      const detail = await movieService.getMovieDetail(id);
      setModalMovie(detail);
    } catch {
      Swal.fire("Lỗi", "Không tải được chi tiết phim", "error");
      setIsModalOpen(false);
    }
  }

  async function archiveMovie(movie: MovieDetail) {
    const confirm = await Swal.fire({
      title: "Lưu trữ phim?",
      text: "Phim sẽ chuyển sang trạng thái Archived",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Lưu trữ",
      cancelButtonText: "Hủy",
    });

    if (!confirm.isConfirmed) return;

    try {
      await movieManagementService.update(movie.id!, {
        ...movie,
        status: "Archived",
      });

      Swal.fire("Thành công", "Phim đã được lưu trữ", "success");
      fetchMovies(paging.page);
    } catch {
      Swal.fire("Lỗi", "Không thể lưu trữ phim", "error");
    }
  }

  if (loading) return null;

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          {status === "NowPlaying"
            ? "🎬 Phim đang chiếu"
            : status === "Upcoming"
            ? "📅 Phim sắp chiếu"
            : "📦 Phim lưu trữ"}
        </h3>

        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase">
                  Tên phim
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase">
                  TMDB
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase">
                  Thời lượng
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase">
                  Thể loại
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-center text-xs uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {movies.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-14 bg-slate-700 rounded overflow-hidden">
                        {m.posterUrl ? (
                          <img
                            src={getPosterUrl(m.posterUrl)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="text-slate-400" size={18} />
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-slate-200">
                        {m.title}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center text-slate-300">
                    {m.tmdbId ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-center text-slate-300">
                    {m.time ? `${m.time}ʼ` : "-"}
                  </td>

                  <td className="px-6 py-4 text-center text-slate-300">
                    {Array.isArray(m.genres) ? m.genres.join(", ") : "-"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Badge
                      type="MovieStatus"
                      value={m.status}
                      raw={m.status}
                    />
                  </td>

                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => m.id && openModal(m.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800"
                      title="Xem / chỉnh sửa"
                    >
                      <Eye size={16} />
                    </button>

                    {m.status !== "Archived" && (
                      <button
                        onClick={() => archiveMovie(m)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                        title="Lưu trữ"
                      >
                        <Archive size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-4 text-slate-300">
          <span>
            Trang {paging.page}/{paging.totalPages} • {paging.total} phim
          </span>
          <div className="flex gap-2">
            <button
              disabled={paging.page === 1}
              onClick={() => fetchMovies(paging.page - 1)}
              className="p-2 rounded hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={paging.page === paging.totalPages}
              onClick={() => fetchMovies(paging.page + 1)}
              className="p-2 rounded hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && modalMovie && (
        <MovieEditModal
          movie={modalMovie}
          onClose={() => setIsModalOpen(false)}
          onSaved={() => fetchMovies(paging.page)}
        />
      )}
    </>
  );
}

/* ================= MAIN ================= */
export default function MovieManagementTable() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200 space-y-8 px-8 py-6">
      <OverviewMovieCards />

      {/* ===== SEARCH BAR ===== */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          className="
            w-full pl-10 pr-4 py-2 rounded-lg
            bg-slate-900 border border-slate-700
            text-slate-200 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-yellow-500
          "
          placeholder="Tìm kiếm phim..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <MovieTable status="NowPlaying" keyword={debouncedKeyword} />
      <MovieTable status="Upcoming" keyword={debouncedKeyword} />
      <MovieTable status="Archived" keyword={debouncedKeyword} />
    </div>
  );
}
