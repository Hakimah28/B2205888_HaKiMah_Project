<template>
  <div class="admin-page">
    <h2 class="page-title">👥 Danh sách nhân viên</h2>
    <div class="table-wrapper">
      <table class="staff-table">
        <thead>
          <tr>
            <th>MSNV</th>
            <th>Họ tên</th>
            <th>Chức vụ</th>
            <th>Địa chỉ</th>
            <th>SĐT</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nv in nhanVienList" :key="nv.MSNV">
            <td>{{ nv.MSNV }}</td>
            <td>{{ nv.hotenNV }}</td>
            <td>{{ nv.chucVu }}</td>
            <td>{{ nv.diaChi }}</td>
            <td>{{ nv.soDienThoai }}</td>
            <td class="actions">
              <button @click="openEditPopup(nv)" class="btn-edit">✏️ Sửa</button>
              <button @click="deleteNhanVien(nv.MSNV)" class="btn-delete">🗑️ Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Popup chỉnh sửa -->
    <AdminEditNhanVienPopup
      v-if="showEditPopup"
      :nhanVien="selectedNhanVien"
      @close="showEditPopup = false"
      @updated="fetchNhanVien"
    />
  </div>
</template>

<script>
import AdminEditNhanVienPopup from "../components/AdminEditNhanVienPopup.vue";

export default {
  name: "AdminNhanVien",
  components: { AdminEditNhanVienPopup },
  data() {
    return {
      nhanVienList: [],
      showEditPopup: false,
      selectedNhanVien: null
    };
  },
  mounted() {
    this.fetchNhanVien();
  },
  methods: {
    async fetchNhanVien() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/nhanvien", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Không thể lấy danh sách nhân viên");
        this.nhanVienList = await res.json();
      } catch (error) {
        console.error("Lỗi khi lấy nhân viên:", error);
        alert("Không thể tải danh sách nhân viên.");
      }
    },
    openEditPopup(nv) {
      this.selectedNhanVien = nv;
      this.showEditPopup = true;
    },
    async deleteNhanVien(msnv) {
      if (!confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/admin/nhanvien/${msnv}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Xóa thất bại");
        this.fetchNhanVien();
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        alert("Không thể xóa nhân viên.");
      }
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 30px;
  font-family: "Segoe UI", sans-serif;
  background-color: #f9f9f9;
}
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
}
.table-wrapper {
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.staff-table {
  width: 100%;
  border-collapse: collapse;
}
.staff-table th {
  background-color: #3498db;
  color: white;
  padding: 12px;
  text-align: left;
}
.staff-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.staff-table tr:hover {
  background-color: #f0f8ff;
}
.actions {
  display: flex;
  gap: 8px;
}
.btn-edit {
  background-color: #f1c40f;
  color: #2c3e50;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-delete {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-edit:hover {
  background-color: #f39c12;
}
.btn-delete:hover {
  background-color: #c0392b;
}
</style>
