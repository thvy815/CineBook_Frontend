"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Film } from "lucide-react";
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
import AddMovieForm from "./AddMovieForm";

const ITEMS_PER_PAGE = 10;

interface MovieTableProps {
  status: "NowPlaying" | "Upcoming" | "Archived";
}

function MovieTable({ status }: MovieTableProps) {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState<MovieDetail | null>(null);

  useBodyScrollLock(isModalOpen);

  const fetchMovies = async (page = 1, showSkeleton = false) => {
    try {
      showSkeleton ? setLoading(true) : setIsRefreshing(true);

      const res: PageResponse<MovieDetail> =
        await movieManagementService.adminList({
          page,
          size: ITEMS_PER_PAGE,
          keyword: debouncedSearch || undefined,
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
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!loading) fetchMovies(paging.page);
    // eslint-disable-next-line
  }, [paging.page]);

  async function openModal(id: string) {
  setIsModalOpen(true);
  try {
    const detail = await movieManagementService.getById(id);
    setModalMovie(detail);
  } catch (err) {
    Swal.fire("Lỗi", "Không thể tải chi tiết phim", "error");
    setIsModalOpen(false);
  }
}


  if (loading) return null;

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs uppercase">Tên phim</th>
                <th className="px-6 py-3 text-center text-xs uppercase">TMDB</th>
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

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => m.id && openModal(m.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800"
                    >
                      <Eye size={16} />
                    </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl text-slate-200">
            {modalMovie.overview || "Chưa có mô tả"}
          </div>
        </div>
      )}
    </>
  );
}

export default function MovieManagementTable() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200 space-y-8 px-8 py-6">
      <OverviewMovieCards />
      <AddMovieForm />
      <MovieTable status="NowPlaying" />
      <MovieTable status="Upcoming" />
    </div>
  );
}
