"use client";

import { useEffect, useState } from "react";
import { theaterService } from "../../../../services/showtime/theaterService";
import { roomService } from "../../../../services/showtime/roomService";
import { showtimeService } from "../../../../services/showtime/showtimeService";

import type { TheaterDto } from "../../../../types/theater";
import type { RoomDto } from "../../../../types/room";
import type { ShowtimeDto } from "../../../../types/showtime";

/* ================== MAIN ================== */
export default function ShowtimeManagementTable() {
  const [showtimes, setShowtimes] = useState<ShowtimeDto[]>([]);
  const [loading, setLoading] = useState(false);

  const loadShowtimes = async () => {
    setLoading(true);
    try {
      const data = await showtimeService.getAll();
      setShowtimes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShowtimes();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A] text-white">
      <h1 className="text-2xl font-bold mb-6">
        Quản lý suất chiếu
      </h1>

      {/* BAR TẠO SUẤT CHIẾU */}
      <AutoGenerateShowtimeBar onCreated={loadShowtimes} />

      {/* BẢNG SUẤT CHIẾU (CHỈ XEM) */}
      <ShowtimeTable showtimes={showtimes} loading={loading} />
    </div>
  );
}

/* ================== AUTO GENERATE BAR ================== */
function AutoGenerateShowtimeBar({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [theaters, setTheaters] = useState<TheaterDto[]>([]);
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [theaterId, setTheaterId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    theaterService.getAll().then(setTheaters);
  }, []);

  const onSelectTheater = async (id: string) => {
    setTheaterId(id);
    setRoomId("");
    setRooms(await roomService.getByTheater(id));
  };

  const generate = async () => {
    if (!theaterId || !roomId) {
      alert("Vui lòng chọn rạp và phòng");
      return;
    }

    setLoading(true);
    try {
      const res = await showtimeService.generateAuto(
        theaterId,
        roomId
      );
      alert(res.message);
      onCreated(); // reload danh sách
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-8 p-4 rounded bg-[#111827] border border-gray-700">
      <span className="font-semibold">
        Tạo suất chiếu tự động
      </span>

      <select
        className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
        value={theaterId}
        onChange={(e) => onSelectTheater(e.target.value)}
      >
        <option value="">Chọn rạp</option>
        {theaters.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        disabled={!theaterId}
      >
        <option value="">Chọn phòng</option>
        {rooms.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <button
        onClick={generate}
        disabled={loading}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        {loading ? "Đang tạo..." : "Tạo"}
      </button>
    </div>
  );
}

/* ================== SHOWTIME TABLE (READ ONLY) ================== */
function ShowtimeTable({
  showtimes,
  loading,
}: {
  showtimes: ShowtimeDto[];
  loading: boolean;
}) {
  return (
    <table className="w-full table-fixed border border-gray-700 bg-[#111827] rounded overflow-hidden">
      <thead className="bg-[#1F2937]">
        <tr>
          <th className="w-[28%] p-3 text-left text-gray-300">
            Phim
          </th>
          <th className="w-[18%] p-3 text-left text-gray-300">
            Rạp
          </th>
          <th className="w-[12%] p-3 text-left text-gray-300">
            Phòng
          </th>
          <th className="w-[12%] p-3 text-left text-gray-300">
            Ngày
          </th>
          <th className="w-[10%] p-3 text-left text-gray-300">
            Giờ
          </th>
          <th className="w-[20%] p-3 text-left text-gray-300">
            Địa chỉ
          </th>
        </tr>
      </thead>

      <tbody>
        {loading && (
          <tr>
            <td
              colSpan={6}
              className="p-6 text-center text-gray-400"
            >
              Đang tải suất chiếu...
            </td>
          </tr>
        )}

        {!loading && showtimes.length === 0 && (
          <tr>
            <td
              colSpan={6}
              className="p-6 text-center text-gray-400"
            >
              Chưa có suất chiếu
            </td>
          </tr>
        )}

        {showtimes.map((s) => (
          <tr
            key={s.id}
            className="hover:bg-[#1F2937] transition"
          >
            <td className="p-3">
              <div className="flex items-center gap-3">
                <img
                  src={s.posterUrl}
                  alt={s.movieTitle}
                  className="w-10 h-14 object-cover rounded"
                />
                <span>{s.movieTitle}</span>
              </div>
            </td>

            <td className="p-3">{s.theaterName}</td>
            <td className="p-3">{s.roomName || "—"}</td>
            <td className="p-3">{s.date}</td>
            <td className="p-3">{s.startTimeFormatted}</td>
            <td className="p-3 text-sm text-gray-400">
              {s.theaterAddress}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
