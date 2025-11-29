<template>
  <div class="admin-page">
    <h2>👥 Danh sách nhân viên</h2>
    <table>
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
          <td>
            <button @click="openEditPopup(nv)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>

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
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
