"use client";
import React, { useState } from "react";
import { Film } from "lucide-react";
import Swal from "sweetalert2";
import { movieManagementService } from "../../../../services/movie/movieManagementService";

interface AddMovieFormProps {
  onSuccess?: () => void;
}

export default function AddMovieForm({
  onSuccess,
}: AddMovieFormProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    age: "",
    genres: "",
    time: "",
    country: "",
    spokenLanguages: "",
    crew: "",
    cast: "",
    releaseDate: "",
    overview: "",
    trailer: "",
    posterUrl: "",
    status: "NowPlaying",
  });

  function updateField<K extends keyof typeof form>(
    key: K,
    value: string
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.time || !form.genres) {
      Swal.fire("Thiếu dữ liệu", "Vui lòng nhập đầy đủ thông tin bắt buộc", "warning");
      return;
    }

    setLoading(true);
    try {
      await movieManagementService.create({
        ...form,
        time: Number(form.time),
        genres: form.genres.split(",").map((g) => g.trim()),
        spokenLanguages: form.spokenLanguages.split(",").map((l) => l.trim()),
        crew: form.crew.split(",").map((c) => c.trim()),
        cast: form.cast.split(",").map((c) => c.trim()),
      });

      Swal.fire("Thành công", "Đã thêm phim mới", "success");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      Swal.fire("Lỗi", "Không thể thêm phim", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-slate-900 border border-slate-800
        rounded-xl p-6 space-y-6
      "
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-yellow-500/15 flex items-center justify-center">
          <Film className="text-yellow-400" size={20} />
        </div>
        <h2 className="text-lg font-semibold text-slate-200">
          Thêm phim mới
        </h2>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Tên phim *" value={form.title} onChange={(v) => updateField("title", v)} />
        <Input label="Độ tuổi (C13, C16…)" value={form.age} onChange={(v) => updateField("age", v)} />

        <Input label="Thể loại * (Action, Horror…)" value={form.genres} onChange={(v) => updateField("genres", v)} />
        <Input label="Thời lượng (phút) *" type="number" value={form.time} onChange={(v) => updateField("time", v)} />

        <Input label="Quốc gia" value={form.country} onChange={(v) => updateField("country", v)} />
        <Input label="Ngôn ngữ (English, Vietnamese…)" value={form.spokenLanguages} onChange={(v) => updateField("spokenLanguages", v)} />

        <Input label="Crew (Director, Writer…)" value={form.crew} onChange={(v) => updateField("crew", v)} />
        <Input label="Cast (Actor 1, Actor 2…)" value={form.cast} onChange={(v) => updateField("cast", v)} />

        <Input label="Ngày phát hành" type="date" value={form.releaseDate} onChange={(v) => updateField("releaseDate", v)} />
        <Select label="Trạng thái" value={form.status} onChange={(v) => updateField("status", v)}>
          <option value="NowPlaying">Đang chiếu</option>
          <option value="Upcoming">Sắp chiếu</option>
          <option value="Archived">Lưu trữ</option>
        </Select>

        {/* ================= TEXTAREA FULL ROW ================= */}
        <div className="md:col-span-2">
          <Textarea
            label="Mô tả phim"
            value={form.overview}
            onChange={(v) => updateField("overview", v)}
          />
        </div>

        <Input label="Trailer URL (YouTube)" value={form.trailer} onChange={(v) => updateField("trailer", v)} />
        <Input label="Poster URL" value={form.posterUrl} onChange={(v) => updateField("posterUrl", v)} />
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          type="submit"
          disabled={loading}
          className="
            px-6 py-2 rounded-lg
            bg-yellow-500 text-black font-medium
            hover:bg-yellow-600
            disabled:opacity-50
          "
        >
          {loading ? "Đang thêm..." : "Thêm phim"}
        </button>
      </div>
    </form>
  );
}

/* ================= REUSABLE UI ================= */

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10 w-full rounded-lg
          bg-slate-800 border border-slate-700
          text-slate-200 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-yellow-500
        "
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-400">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-lg
          bg-slate-800 border border-slate-700
          text-slate-200 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-yellow-500
          resize-none
        "
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10 w-full rounded-lg
          bg-slate-800 border border-slate-700
          text-slate-200
          focus:outline-none focus:ring-2 focus:ring-yellow-500
        "
      >
        {children}
      </select>
    </div>
  );
}
