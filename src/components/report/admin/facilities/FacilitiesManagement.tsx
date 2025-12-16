"use client";

import { useEffect, useState } from "react";
import { provinceService } from "../../../../services/showtime/provinceService";
import { theaterService } from "../../../../services/showtime/theaterService";
import { roomService } from "../../../../services/showtime/roomService";
import { seatService } from "../../../../services/showtime/seatService";

import type { ProvinceDto } from "../../../../types/province";
import type { TheaterDto } from "../../../../types/theater";
import type { RoomDto } from "../../../../types/room";

/* ================== MAIN ================== */
export default function FacilitiesManagement() {
  const [activeTab, setActiveTab] = useState<
    "province" | "theater" | "room"
  >("province");

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A] text-white">
      <h1 className="text-2xl font-bold mb-6">Quản lý cơ sở</h1>

      {/* NAV */}
      <div className="flex gap-6 border-b border-gray-700 mb-6">
        <TabButton
          label="Tỉnh"
          active={activeTab === "province"}
          onClick={() => setActiveTab("province")}
        />
        <TabButton
          label="Rạp"
          active={activeTab === "theater"}
          onClick={() => setActiveTab("theater")}
        />
        <TabButton
          label="Phòng"
          active={activeTab === "room"}
          onClick={() => setActiveTab("room")}
        />
      </div>

      {activeTab === "province" && <ProvinceTab />}
      {activeTab === "theater" && <TheaterTab />}
      {activeTab === "room" && <RoomTab />}
    </div>
  );
}

/* ================== TAB BUTTON ================== */
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 transition ${
        active
          ? "border-b-2 border-white font-semibold"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

/* ================== MODAL ================== */
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111827] border border-gray-700 rounded w-[520px] p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ================== PROVINCE TAB ================== */
function ProvinceTab() {
  const [provinces, setProvinces] = useState<ProvinceDto[]>([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<ProvinceDto | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setProvinces(await provinceService.getAll());
  };

  const create = async () => {
    if (!name) return;
    await provinceService.create({ name });
    setName("");
    load();
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên tỉnh"
          className="border border-gray-700 bg-[#111827] px-3 py-2 rounded w-64"
        />
        <button
          onClick={create}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Thêm tỉnh
        </button>
      </div>

      <table className="w-full table-fixed border border-gray-700 bg-[#111827] rounded overflow-hidden">
        <thead className="bg-[#1F2937]">
          <tr>
            <th className="w-[70%] p-3 text-left text-gray-300">
              Tên tỉnh
            </th>
            <th className="w-[30%] p-3 text-left text-gray-300">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {provinces.map((p) => (
            <tr key={p.id} className="hover:bg-[#1F2937]">
              <td className="p-3 text-left">{p.name}</td>
              <td className="p-3 text-left">
                <button
                  onClick={() => {
                    setEditing(p);
                    setEditName(p.name);
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <Modal title="Chỉnh sửa tỉnh" onClose={() => setEditing(null)}>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full border border-gray-700 bg-[#0B0F1A] p-2 rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className="text-gray-400">
              Huỷ
            </button>
            <button
              onClick={async () => {
                await provinceService.update(editing.id, { name: editName });
                setEditing(null);
                load();
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================== THEATER TAB ================== */
function TheaterTab() {
  const [theaters, setTheaters] = useState<TheaterDto[]>([]);
  const [provinces, setProvinces] = useState<ProvinceDto[]>([]);
  const [editing, setEditing] = useState<TheaterDto | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setTheaters(await theaterService.getAll());
    setProvinces(await provinceService.getAll());
  };

  return (
    <div>
      <table className="w-full table-fixed border border-gray-700 bg-[#111827] rounded overflow-hidden">
        <thead className="bg-[#1F2937]">
          <tr>
            <th className="w-[40%] p-3 text-left text-gray-300">
              Tên rạp
            </th>
            <th className="w-[30%] p-3 text-left text-gray-300">
              Tỉnh
            </th>
            <th className="w-[15%] p-3 text-left text-gray-300">
              Trạng thái
            </th>
            <th className="w-[15%] p-3 text-left text-gray-300">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {theaters.map((t) => (
            <tr key={t.id} className="hover:bg-[#1F2937]">
              <td className="p-3 text-left">{t.name}</td>
              <td className="p-3 text-left">
                {provinces.find((p) => p.id === t.provinceId)?.name}
              </td>
              <td className="p-3 text-left">{t.status}</td>
              <td className="p-3 text-left">
                <button
                  onClick={() => setEditing(t)}
                  className="text-blue-400 hover:underline"
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <Modal title="Chỉnh sửa rạp" onClose={() => setEditing(null)}>
          <div className="grid gap-3 mb-4">
            <label className="text-sm text-gray-300">Tên rạp</label>
            <input
              className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />

            <label className="text-sm text-gray-300">Địa chỉ</label>
            <input
              className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
              value={editing.address}
              onChange={(e) =>
                setEditing({ ...editing, address: e.target.value })
              }
            />

            <label className="text-sm text-gray-300">Mô tả</label>
            <textarea
              className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
            />

            <label className="text-sm text-gray-300">Tỉnh</label>
            <select
              className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
              value={editing.provinceId}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  provinceId: e.target.value as any,
                })
              }
            >
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <label className="text-sm text-gray-300">Trạng thái</label>
            <select
              className="border border-gray-700 bg-[#0B0F1A] p-2 rounded"
              value={editing.status}
              onChange={(e) =>
                setEditing({ ...editing, status: e.target.value })
              }
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className="text-gray-400">
              Huỷ
            </button>
            <button
              onClick={async () => {
                await theaterService.update(editing.id, editing);
                setEditing(null);
                load();
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ================== ROOM TAB ================== */
function RoomTab() {
  const [theaters, setTheaters] = useState<TheaterDto[]>([]);
  const [rooms, setRooms] = useState<RoomDto[]>([]);
  const [theaterId, setTheaterId] = useState("");
  const [editing, setEditing] = useState<RoomDto | null>(null);

  useEffect(() => {
    theaterService.getAll().then(setTheaters);
  }, []);

  const loadRooms = async (id: string) => {
    setRooms(await roomService.getByTheater(id));
  };

  return (
    <div>
      <select
        className="border border-gray-700 bg-[#111827] p-2 rounded mb-4"
        value={theaterId}
        onChange={(e) => {
          setTheaterId(e.target.value);
          loadRooms(e.target.value);
        }}
      >
        <option value="">Chọn rạp</option>
        {theaters.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <table className="w-full table-fixed border border-gray-700 bg-[#111827] rounded overflow-hidden">
        <thead className="bg-[#1F2937]">
          <tr>
            <th className="w-[55%] p-3 text-left text-gray-300">
              Phòng
            </th>
            <th className="w-[25%] p-3 text-left text-gray-300">
              Số ghế
            </th>
            <th className="w-[20%] p-3 text-left text-gray-300">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id} className="hover:bg-[#1F2937]">
              <td className="p-3 text-left">{r.name}</td>
              <td className="p-3 text-left">{r.seatCount}</td>
              <td className="p-3 text-left">
                <button
                  onClick={() => setEditing(r)}
                  className="text-blue-400 hover:underline"
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <Modal title="Chỉnh sửa phòng" onClose={() => setEditing(null)}>
          <label className="text-sm text-gray-300">Tên phòng</label>
          <input
            value={editing.name}
            onChange={(e) =>
              setEditing({ ...editing, name: e.target.value })
            }
            className="border border-gray-700 bg-[#0B0F1A] p-2 rounded mb-3 w-full"
          />

          <label className="text-sm text-gray-300">Số ghế</label>
          <input
            type="number"
            value={editing.seatCount}
            onChange={(e) =>
              setEditing({ ...editing, seatCount: +e.target.value })
            }
            className="border border-gray-700 bg-[#0B0F1A] p-2 rounded mb-4 w-full"
          />

          <div className="flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className="text-gray-400">
              Huỷ
            </button>
            <button
              onClick={async () => {
                await roomService.update(editing.id, editing);

                setEditing(null);
                loadRooms(theaterId);
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
