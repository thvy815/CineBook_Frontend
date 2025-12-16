"use client";

import { useEffect, useState } from "react";
import { promotionService } from "../../../../services/promotion/promotionServices"; 
import type {
  PromotionDto,
  UpdatePromotionRequest,
} from "../../../../types/promotion";

/* ================== MAIN ================== */
export default function PromotionManagement() {
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await promotionService.getAll();
      setPromotions(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#0B0F1A] text-white">
      <h1 className="text-2xl font-bold mb-6">
        Quản lý mã giảm giá
      </h1>

      {loading && (
        <div className="text-gray-400">Đang tải...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((p) => (
          <PromotionCard
            key={p.id}
            promotion={p}
            onSaved={load}
          />
        ))}
      </div>
    </div>
  );
}

/* ================== PROMOTION CARD ================== */
function PromotionCard({
  promotion,
  onSaved,
}: {
  promotion: PromotionDto;
  onSaved: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<UpdatePromotionRequest>({
    discountType: promotion.discountType,
    discountValue: promotion.discountValue,
    startDate: promotion.startDate.split("T")[0],
    endDate: promotion.endDate.split("T")[0],
    isActive: promotion.isActive,
    isOneTimeUse: promotion.isOneTimeUse,
    description: promotion.description,
  });

  const save = async () => {
    setSaving(true);
    try {
      await promotionService.update(promotion.id, {
        ...form,
        startDate: `${form.startDate}T00:00:00Z`,
        endDate: `${form.endDate}T23:59:59Z`,
      });
      setEditing(false);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-gray-700 bg-[#111827] rounded p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-lg font-semibold">
            {promotion.code}
          </div>
          <div className="text-sm text-gray-400">
            {promotion.discountType === "PERCENT"
              ? `Giảm ${promotion.discountValue}%`
              : `Giảm ${promotion.discountValue.toLocaleString()}₫`}
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="text-blue-400 hover:underline"
        >
          {editing ? "Hủy" : "Chỉnh sửa"}
        </button>
      </div>

      {/* BODY */}
      <div className="space-y-3 text-sm">
        {/* Discount Type */}
        <Row label="Loại giảm">
          {editing ? (
            <select
              value={form.discountType}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountType: e.target.value as any,
                })
              }
              className="bg-[#0B0F1A] border border-gray-700 p-1 rounded"
            >
              <option value="PERCENT">PERCENT</option>
              <option value="FIXED">FIXED</option>
            </select>
          ) : (
            promotion.discountType
          )}
        </Row>

        {/* Discount Value */}
        <Row label="Giá trị">
          {editing ? (
            <input
              type="number"
              value={form.discountValue}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountValue: +e.target.value,
                })
              }
              className="bg-[#0B0F1A] border border-gray-700 p-1 rounded w-24"
            />
          ) : (
            promotion.discountValue
          )}
        </Row>

        {/* Date range */}
        <Row label="Thời gian">
          {editing ? (
            <div className="flex gap-2">
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="bg-[#0B0F1A] border border-gray-700 p-1 rounded"
              />
              <span>→</span>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm({ ...form, endDate: e.target.value })
                }
                className="bg-[#0B0F1A] border border-gray-700 p-1 rounded"
              />
            </div>
          ) : (
            <>
              {promotion.startDate.slice(0, 10)} →{" "}
              {promotion.endDate.slice(0, 10)}
            </>
          )}
        </Row>

        {/* Active */}
        <Row label="Kích hoạt">
          {editing ? (
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked,
                })
              }
            />
          ) : promotion.isActive ? (
            "Có"
          ) : (
            "Không"
          )}
        </Row>

        {/* One time */}
        <Row label="Dùng 1 lần">
          {editing ? (
            <input
              type="checkbox"
              checked={form.isOneTimeUse}
              onChange={(e) =>
                setForm({
                  ...form,
                  isOneTimeUse: e.target.checked,
                })
              }
            />
          ) : promotion.isOneTimeUse ? (
            "Có"
          ) : (
            "Không"
          )}
        </Row>

        {/* Description */}
        <Row label="Mô tả">
          {editing ? (
            <textarea
              value={form.description || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="bg-[#0B0F1A] border border-gray-700 p-1 rounded w-full"
              rows={2}
            />
          ) : (
            promotion.description || "-"
          )}
        </Row>
      </div>

      {/* ACTION */}
      {editing && (
        <div className="flex justify-end mt-4">
          <button
            onClick={save}
            disabled={saving}
            className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ================== ROW ================== */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
      <div className="text-gray-400">{label}</div>
      <div>{children}</div>
    </div>
  );
}
