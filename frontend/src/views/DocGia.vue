<template>
  <div class="container">
    <h1 class="title">📖 Quản Lý Độc Giả</h1>

    <!-- Các nút mở popup -->
    <div class="actions">
      <button @click="showAddPopup = true" class="btn btn-add">➕ Thêm Độc Giả</button>
      <button @click="showSearchPopup = true" class="btn btn-search">🔍 Tìm Độc Giả</button>
    </div>

    <!-- Bảng danh sách độc giả -->
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Mã Độc Giả</th>
            <th>Họ Lót</th>
            <th>Tên</th>
            <th>Ngày Sinh</th>
            <th>Phái</th>
            <th>Địa Chỉ</th>
            <th>Điện Thoại</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dg in docGiaList" :key="dg.MaDocGia">
            <td>{{ dg.MaDocGia }}</td>
            <td v-if="editingId !== dg.MaDocGia">{{ dg.HoLot }}</td>
            <td v-else><input v-model="editDocGia.HoLot" /></td>

            <td v-if="editingId !== dg.MaDocGia">{{ dg.Ten }}</td>
            <td v-else><input v-model="editDocGia.Ten" /></td>

            <td v-if="editingId !== dg.MaDocGia">{{ new Date(dg.NgaySinh).toLocaleDateString() }}</td>
            <td v-else><input v-model="editDocGia.NgaySinh" type="date" /></td>

            <td v-if="editingId !== dg.MaDocGia">{{ dg.Phai }}</td>
            <td v-else>
              <select v-model="editDocGia.Phai">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </td>

            <td v-if="editingId !== dg.MaDocGia">{{ dg.DiaChi }}</td>
            <td v-else><input v-model="editDocGia.DiaChi" /></td>

            <td v-if="editingId !== dg.MaDocGia">{{ dg.DienThoai }}</td>
            <td v-else><input v-model="editDocGia.DienThoai" /></td>

            <td class="actions-cell">
              <button v-if="editingId !== dg.MaDocGia" @click="startEdit(dg)" class="btn btn-edit">✏️ Sửa</button>
              <button v-else @click="saveEdit" class="btn btn-primary">💾 Lưu</button>
              <button v-if="editingId === dg.MaDocGia" @click="cancelEdit" class="btn btn-cancel">❌ Hủy</button>
              <button @click="deleteDocGia(dg.MaDocGia)" class="btn btn-delete">🗑️ Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="docGiaList.length === 0" class="empty">Không có dữ liệu</p>

    <!-- Popups -->
    <AddDocGiaPopup :isOpen="showAddPopup" @close="showAddPopup = false" @added="fetchDocGia" />
    <SearchDocGiaPopup :isOpen="showSearchPopup" @close="showSearchPopup = false" @search="setSearchResult" />
  </div>
</template>

<script>
import AddDocGiaPopup from "../components/AddDocGiaPopup.vue";
import SearchDocGiaPopup from "../components/SearchDocGiaPopup.vue";

export default {
  components: { AddDocGiaPopup, SearchDocGiaPopup },
  data() {
    return {
      docGiaList: [],
      showAddPopup: false,
      showSearchPopup: false,
      editingId: null,
      editDocGia: {
        MaDocGia: "",
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "",
        DiaChi: "",
        DienThoai: ""
      }
    };
  },
  mounted() {
    this.fetchDocGia();
  },
  methods: {
    async fetchDocGia() {
      try {
        const response = await fetch("http://localhost:5000/api/docgia");
        this.docGiaList = await response.json();
      } catch (error) {
        console.error("Lỗi khi tải danh sách độc giả:", error);
      }
    },
    startEdit(dg) {
      this.editingId = dg.MaDocGia;
      this.editDocGia = { ...dg };
    },
    async saveEdit() {
      try {
        const response = await fetch(`http://localhost:5000/api/docgia/${this.editDocGia.MaDocGia}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editDocGia)
        });
        if (response.ok) {
          this.fetchDocGia();
          this.editingId = null;
        } else {
          alert("Lỗi khi cập nhật độc giả!");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật độc giả:", error);
      }
    },
    cancelEdit() {
      this.editingId = null;
    },
    async deleteDocGia(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa độc giả này?")) return;
      try {
        const response = await fetch(`http://localhost:5000/api/docgia/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Xóa không thành công");
        this.docGiaList = this.docGiaList.filter(dg => dg.MaDocGia !== id);
      } catch (error) {
        console.error("Lỗi khi xóa độc giả:", error);
      }
    },
    setSearchResult(result) {
      this.docGiaList = result;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #6d9dcd;
}
.actions {
  margin-bottom: 15px;
}
.btn {
  margin: 5px;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}
.btn-add {
  background: #3498db;
  color: white;
}
.btn-search {
  background: #1abc9c;
  color: white;
}
.btn-primary {
  background: #2ecc71;
  color: white;
}
.btn-cancel {
  background: #e74c3c;
  color: white;
}
.btn-edit {
  background: #f39c12;
  color: white;
}
.btn-delete {
  background: #c0392b;
  color: white;
}
.btn:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}
.table-wrapper {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.table th {
  background: #5ba1e6;
  color: white;
}
.table tr:nth-child(even) {
  background: #f9f9f9;
}
.table tr:hover {
  background: #ecf0f1;
}
.actions-cell button {
  margin: 2px;
}
.empty {
  margin-top: 15px;
  font-style: italic;
  color: #7f8c8d;
}
</style>
