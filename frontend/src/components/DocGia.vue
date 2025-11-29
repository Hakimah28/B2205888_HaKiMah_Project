<template>
  <div class="container">
    <h1 class="title">Quản Lý Đọc Giả</h1>

    <!-- Các nút mở popup -->
    <button @click="showAddPopup = true" class="btn">Thêm Đọc Giả</button>
    <button @click="showSearchPopup = true" class="btn">Tìm Đọc Giả</button>

    <!-- Bảng danh sách đọc giả -->
    <table class="table">
      <thead>
        <tr>
          <th>Mã Đọc Giả</th>
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

          <td>
            <button v-if="editingId !== dg.MaDocGia" @click="startEdit(dg)" class="btn-edit">Sửa</button>
            
            <button v-else @click="saveEdit" class="btn-primary">Lưu</button>
            <button v-if="editingId === dg.MaDocGia" @click="cancelEdit" class="btn-cancel">Hủy</button>
            <button @click="deleteDocGia(dg.MaDocGia)" class="btn-delete">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="docGiaList.length === 0">Không có dữ liệu</p>

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
        console.error("Lỗi khi tải danh sách đọc giả:", error);
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
          alert("Lỗi khi cập nhật đọc giả!");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật đọc giả:", error);
      }
    },
    cancelEdit() {
      this.editingId = null;
    },
    async deleteDocGia(id) {
  if (!confirm("Bạn có chắc chắn muốn xóa đọc giả này?")) return;
  try {
    const response = await fetch(`http://localhost:5000/api/docgia/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Xóa không thành công");
    this.docGiaList = this.docGiaList.filter(dg => dg.MaDocGia !== id); // Xóa trực tiếp trên frontend
  } catch (error) {
    console.error("Lỗi khi xóa đọc giả:", error);
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
  max-width: 900px;
  margin: 20px auto;
  text-align: center;
}
.btn {
  margin: 10px;
  padding: 10px;
  background: rgb(66, 147, 233);
  color: white;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background: #488fdb;
}
.btn-primary {
  background: #28a745;
  color: white;
}
.btn-cancel {
  background: red;
  color: white;
}
.btn-edit {
  background: orange;
  color: white;
}
.btn-delete {
  background: crimson;
  color: white;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 10px;
}
.table th {
  background: rgb(84, 158, 237);
  color: white;
}
</style>
