"use client";
import React, { useEffect, useState } from "react";
import { X, Save, Archive } from "lucide-react";
import Swal from "sweetalert2";

import type { MovieDetail } from "../../../../types/movie";
import { movieManagementService } from "../../../../services/movie/movieManagementService";
import { getPosterUrl } from "../../../../utils/getPosterUrl";

/* ===================== HELPERS ===================== */
const normalizeArray = (value: any): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string")
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  return [];
};

/* ===================== PROPS ===================== */
interface MovieEditModalProps {
  movie: MovieDetail;
  onClose: () => void;
  onSaved: () => void;
}

/* ===================== COMPONENT ===================== */
export default function MovieEditModal({
  movie,
  onClose,
  onSaved,
}: MovieEditModalProps): React.JSX.Element {
  const [form, setForm] = useState<MovieDetail>({
    ...movie,
    genres: normalizeArray(movie.genres),
    spokenLanguages: normalizeArray(movie.spokenLanguages),
    crew: normalizeArray(movie.crew),
    cast: normalizeArray(movie.cast),
  });

  const [saving, setSaving] = useState(false);

  /* ===================== HANDLERS ===================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.id) return;

    try {
      setSaving(true);

      await movieManagementService.update(form.id, {
        ...form,
        genres: normalizeArray(form.genres),
        spokenLanguages: normalizeArray(form.spokenLanguages),
        crew: normalizeArray(form.crew),
        cast: normalizeArray(form.cast),
      });

      Swal.fire("Thành công", "Đã cập nhật phim", "success");
      onSaved();
      onClose();
    } catch {
      Swal.fire("Lỗi", "Không thể lưu phim", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!form.id) return;

    const confirm = await Swal.fire({
      title: "Lưu trữ phim?",
      text: "Phim sẽ được chuyển sang trạng thái Archived",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!confirm.isConfirmed) return;

    try {
      setSaving(true);
      await movieManagementService.update(form.id, {
        ...form,
        status: "Archived",
      });

      Swal.fire("Đã lưu trữ", "Phim đã được archived", "success");
      onSaved();
      onClose();
    } catch {
      Swal.fire("Lỗi", "Không thể archive phim", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ===================== RENDER ===================== */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Chi tiết phim</h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="w-full aspect-[2/3] bg-slate-800 rounded overflow-hidden mb-3">
              {form.posterUrl ? (
                <img
                  src={getPosterUrl(form.posterUrl)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  No Poster
                </div>
              )}
            </div>

            <input
              name="posterUrl"
              value={form.posterUrl ?? ""}
              onChange={handleChange}
              placeholder="Poster URL"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                name="tmdbId"
                value={form.tmdbId ?? ""}
                onChange={handleChange}
                placeholder="TMDB ID"
                className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
              >
                <option value="NowPlaying">NowPlaying</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Tên phim"
              className="col-span-2 px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Độ tuổi"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="time"
              value={form.time ?? ""}
              onChange={handleChange}
              placeholder="Thời lượng (phút)"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Quốc gia"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="releaseDate"
              value={form.releaseDate}
              onChange={handleChange}
              placeholder="Ngày phát hành"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="genres"
              value={normalizeArray(form.genres).join(", ")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  genres: normalizeArray(e.target.value),
                }))
              }
              placeholder="Thể loại (cách nhau bởi ,)"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="spokenLanguages"
              value={normalizeArray(form.spokenLanguages).join(", ")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  spokenLanguages: normalizeArray(e.target.value),
                }))
              }
              placeholder="Ngôn ngữ"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="crew"
              value={normalizeArray(form.crew).join(", ")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  crew: normalizeArray(e.target.value),
                }))
              }
              placeholder="Crew"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            <input
              name="cast"
              value={normalizeArray(form.cast).join(", ")}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  cast: normalizeArray(e.target.value),
                }))
              }
              placeholder="Cast"
              className="px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />

            {/* MÔ TẢ – RỘNG */}
            <textarea
              name="overview"
              value={form.overview ?? ""}
              onChange={handleChange}
              placeholder="Mô tả phim"
              rows={6}
              className="col-span-2 px-3 py-2 rounded bg-slate-800 border border-slate-700 resize-none"
            />

            <input
              name="trailer"
              value={form.trailer ?? ""}
              onChange={handleChange}
              placeholder="Trailer URL (YouTube)"
              className="col-span-2 px-3 py-2 rounded bg-slate-800 border border-slate-700"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleArchive}
            disabled={saving || form.status === "Archived"}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded text-white disabled:opacity-40"
          >
            <Archive size={16} />
            Archive
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-medium disabled:opacity-40"
          >
            <Save size={16} />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
