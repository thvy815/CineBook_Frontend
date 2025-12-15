"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

import { userAdminService } from "../../../../services/auth/userService";
import { useDebounce } from "../../../../hooks/useDebounce";
import { Badge } from "../../../ui/Badge";
import { CustomDropdown } from "../../../ui/CustomDropdown";

/* ================= ROLE CONFIG ================= */
const ROLE_LABELS: Record<string, string> = {
  Customer: "Khách hàng",
  Staff: "Nhân viên",
  Manager: "Quản lý",
  Admin: "Admin",
};

const ROLE_API_VALUES = ["Customer", "Staff", "Manager", "Admin"];

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

  /* ===== EDIT USER ===== */
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  /* ===== CREATE USER ===== */
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    role: "Customer",
    status: "ACTIVE",
  });

  /* ================= FETCH USERS ================= */
  const fetchUsers = async (page = 1, showSkeleton = false) => {
    try {
      if (showSkeleton) setLoading(true);

      const response = await userAdminService.getAllUsers({
        page,
        size: ITEMS_PER_PAGE,
        keyword: debouncedSearch || undefined,
        role: selectedRole !== "Tất cả" ? selectedRole : undefined,
        status: selectedStatus !== "Tất cả" ? selectedStatus : undefined,
        sortBy: "CreatedAt",
        sortType: "DESC",
      });

      const items = response?.data ?? [];

      setUsers(items);
      setPaging({
        page: response?.page ?? page,
        totalPages: response?.totalPages ?? 1,
        total: response?.totalElements ?? items.length,
      });
    } catch {
      Swal.fire("Lỗi", "Không thể tải danh sách người dùng", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, true);
  }, []);

  useEffect(() => {
    fetchUsers(1);
  }, [debouncedSearch, selectedRole, selectedStatus]);

  /* ================= UPDATE USER ================= */
  async function handleSaveEdit() {
    try {
      await userAdminService.updateUserRoleStatus(editingUser.id, {
        role: editRole, // ✅ Staff | Admin | ...
        status: editStatus,
      });

      Swal.fire("Thành công", "Đã cập nhật người dùng", "success");
      setEditingUser(null);
      fetchUsers(paging.page);
    } catch {
      Swal.fire("Lỗi", "Cập nhật thất bại", "error");
    }
  }

  /* ================= CREATE USER ================= */
  async function handleCreateUser() {
    try {
      await userAdminService.createUserByAdmin(newUser);

      Swal.fire("Thành công", "Tạo tài khoản thành công", "success");
      setShowCreateModal(false);
      setNewUser({
        email: "",
        username: "",
        password: "",
        role: "Customer",
        status: "ACTIVE",
      });
      fetchUsers(1);
    } catch {
      Swal.fire("Lỗi", "Tạo tài khoản thất bại", "error");
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
            placeholder="Tìm kiếm username / email"
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
            ...ROLE_API_VALUES.map((r) => ({
              value: r,
              label: ROLE_LABELS[r],
            })),
          ]}
          value={selectedRole}
          onChange={setSelectedRole}
        />

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg"
        >
          <Plus size={16} />
          Tạo tài khoản
        </button>
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
                    value={ROLE_LABELS[u.role]}
                    raw={u.role}
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
                      setEditRole(u.role); // ✅ Staff | Admin
                      setEditStatus(u.status);
                    }}
                    className="p-2 hover:bg-slate-800 rounded"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                options={ROLE_API_VALUES.map((r) => ({
                  value: r,
                  label: ROLE_LABELS[r],
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

      {/* ================= CREATE MODAL ================= */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-[420px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tạo tài khoản mới</h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-3">
              <input
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700"
                placeholder="Mật khẩu"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />

              <CustomDropdown
                options={ROLE_API_VALUES.map((r) => ({
                  value: r,
                  label: ROLE_LABELS[r],
                }))}
                value={newUser.role}
                onChange={(v) => setNewUser({ ...newUser, role: v })}
              />

              <CustomDropdown
                options={Object.entries(STATUS_LABELS).map(([v, l]) => ({
                  value: v,
                  label: l,
                }))}
                value={newUser.status}
                onChange={(v) => setNewUser({ ...newUser, status: v })}
              />
            </div>

            <button
              onClick={handleCreateUser}
              className="mt-6 w-full bg-emerald-600 text-white py-2 rounded-lg"
            >
              Tạo tài khoản
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
