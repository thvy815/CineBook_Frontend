"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import { userAdminService } from "../../../../services/auth/userService";
import { useDebounce } from "../../../../hooks/useDebounce";
import { Badge } from "../../../ui/Badge";
import { CustomDropdown } from "../../../ui/CustomDropdown";

/* ================= UI LABEL ================= */
const ROLE_LABELS: Record<string, string> = {
  customer: "Khách hàng",
  staff: "Nhân viên",
  manager: "Quản lý",
  admin: "Admin",
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Đang hoạt động",
  BANNED: "Đã bị cấm",
};

const ITEMS_PER_PAGE = 10;

export default function UserManagementTable(): React.JSX.Element {
  const [users, setUsers] = useState<any[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [tableSearch, setTableSearch] = useState("");

  const [selectedRole, setSelectedRole] = useState<string>("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");

  /* ===== EDIT MODAL ===== */
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async (page = 1, showSkeleton = false) => {
    try {
      if (showSkeleton) setLoading(true);

      const response = await userAdminService.getAllUsers({
        page,
        size: ITEMS_PER_PAGE,
        keyword: debouncedSearch || undefined,
        role:
          selectedRole !== "Tất cả"
            ? selectedRole.toUpperCase()
            : undefined,
        status:
          selectedStatus !== "Tất cả"
            ? selectedStatus
            : undefined,
        sortBy: "createdAt",
        sortType: "DESC",
      });

      const items = response?.data ?? [];

      setUsers(items);
      setPaging({
        page: response?.page ?? page,
        totalPages: response?.totalPages ?? 1,
        total: response?.totalElements ?? items.length,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Không thể tải danh sách người dùng",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedRole, selectedStatus]);

  /* ================= EXPORT ================= */
  async function exportAllExcel() {
    const response = await userAdminService.getAllUsers({
      page: 1,
      size: 10000,
    });

    const allUsers = response?.data ?? [];

    const ws = XLSX.utils.aoa_to_sheet([
      ["ID", "Username", "Email", "Role", "Status", "Ngày tạo"],
      ...allUsers.map((u: any) => [
        u.id,
        u.username,
        u.email,
        ROLE_LABELS[u.role?.toLowerCase()] ?? u.role,
        STATUS_LABELS[u.status] ?? u.status,
        u.createdAt,
      ]),
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  }

  /* ================= UPDATE USER ================= */
  async function handleSaveEdit() {
    try {
      await userAdminService.updateUserRoleStatus(editingUser.id, {
        role: editRole,
        status: editStatus,
      });

      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        timer: 1500,
        showConfirmButton: false,
      });

      setEditingUser(null);
      fetchUsers(paging.page);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại",
      });
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(tableSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(tableSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl text-slate-300">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      {/* ================= FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
            placeholder="Tìm kiếm username / email (server)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <CustomDropdown
          options={[
            { value: "Tất cả", label: "Tất cả" },
            ...Object.entries(STATUS_LABELS).map(([v, l]) => ({
              value: v,
              label: l,
            })),
          ]}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />

        <CustomDropdown
          options={[
            { value: "Tất cả", label: "Tất cả" },
            ...Object.entries(ROLE_LABELS).map(([v, l]) => ({
              value: v,
              label: l,
            })),
          ]}
          value={selectedRole}
          onChange={setSelectedRole}
        />

        <button
          onClick={exportAllExcel}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg"
        >
          <Download size={16} />
          Xuất Excel
        </button>
      </div>

      {/* ================= TABLE SEARCH ================= */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200"
          placeholder="Tìm nhanh trong bảng..."
          value={tableSearch}
          onChange={(e) => setTableSearch(e.target.value)}
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto border border-slate-700 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Người dùng</th>
              <th className="px-4 py-3 text-center">Vai trò</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-t border-slate-700">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{u.username}</span>
                    <span className="text-xs text-slate-400">{u.email}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-center">
                  <Badge
                    type="AccountRole"
                    value={ROLE_LABELS[u.role?.toLowerCase()]}
                    raw={u.role?.toLowerCase()}
                  />
                </td>

                <td className="px-4 py-3 text-center">
                  <Badge
                    type="AccountStatus"
                    value={STATUS_LABELS[u.status]}
                    raw={u.status}
                  />
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => {
                      setEditingUser(u);
                      setEditRole(u.role);
                      setEditStatus(u.status);
                    }}
                    className="p-2 hover:bg-slate-800 rounded"
                    title="Chỉnh sửa"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between items-center mt-4 text-slate-400">
        <span>
          Trang {paging.page}/{paging.totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={paging.page === 1}
            onClick={() => fetchUsers(paging.page - 1)}
          >
            <ChevronLeft />
          </button>
          <button
            disabled={paging.page === paging.totalPages}
            onClick={() => fetchUsers(paging.page + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chỉnh sửa người dùng</h3>
              <button onClick={() => setEditingUser(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <CustomDropdown
                options={Object.entries(ROLE_LABELS).map(([v, l]) => ({
                  value: v.toUpperCase(),
                  label: l,
                }))}
                value={editRole}
                onChange={setEditRole}
              />

              <CustomDropdown
                options={Object.entries(STATUS_LABELS).map(([v, l]) => ({
                  value: v,
                  label: l,
                }))}
                value={editStatus}
                onChange={setEditStatus}
              />
            </div>

            <button
              onClick={handleSaveEdit}
              className="mt-6 w-full bg-yellow-500 text-black py-2 rounded-lg"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
