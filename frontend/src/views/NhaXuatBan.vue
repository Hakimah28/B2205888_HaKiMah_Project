<template>
  <div class="nxb-page container">
    <div class="header">
      <h2><i class="fas fa-building me-2"></i>Quản Lý Nhà Xuất Bản</h2>
      <button @click="showAddPopup = true" class="btn btn-primary">
        <i class="fas fa-plus me-1"></i> Thêm NXB
      </button>
    </div>

    <div v-if="nhaXuatBanList.length" class="nxb-grid">
      <div v-for="nxb in nhaXuatBanList" :key="nxb._id" class="nxb-card shadow-sm">
        <div v-if="!nxb.isEditing" class="nxb-info">
          <h5>{{ nxb.TenNXB }}</h5>
          <p><strong>Mã:</strong> {{ nxb.MaNXB }}</p>
          <p><strong>Địa chỉ:</strong> {{ nxb.DiaChi }}</p>
        </div>

        <div v-else class="nxb-edit">
          <input v-model="nxb.TenNXB" class="form-control mb-2" placeholder="Tên NXB" />
          <input v-model="nxb.DiaChi" class="form-control" placeholder="Địa chỉ" />
        </div>

        <div class="nxb-actions mt-3">
          <button v-if="!nxb.isEditing" @click="editNXB(nxb)" class="btn btn-warning btn-sm">
            <i class="fas fa-edit"></i> Sửa
          </button>
          <button v-if="nxb.isEditing" @click="updateNXB(nxb)" class="btn btn-success btn-sm">
            <i class="fas fa-save"></i> Lưu
          </button>
          <button v-if="nxb.isEditing" @click="cancelEdit(nxb)" class="btn btn-secondary btn-sm">
            <i class="fas fa-times"></i> Hủy
          </button>
          <button @click="deleteNXB(nxb._id)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i> Xóa
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-muted text-center mt-4">
      <i class="fas fa-info-circle me-2"></i>Không có dữ liệu nhà xuất bản nào.
    </p>

    <AddNhaXuatBanPopup :isOpen="showAddPopup" @close="showAddPopup = false" @added="fetchNhaXuatBan" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import AddNhaXuatBanPopup from "../components/AddNhaXuatBanPopup.vue";

export default {
  components: { AddNhaXuatBanPopup },
  setup() {
    const nhaXuatBanList = ref([]);
    const showAddPopup = ref(false);

    const fetchNhaXuatBan = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/nhaxuatban");
        nhaXuatBanList.value = await response.json();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách NXB:", error);
      }
    };

    const editNXB = (nxb) => {
      nxb.isEditing = true;
    };

    const updateNXB = async (nxb) => {
      try {
        await fetch(`http://localhost:5000/api/nhaxuatban/${nxb._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ TenNXB: nxb.TenNXB, DiaChi: nxb.DiaChi }),
        });
        nxb.isEditing = false;
        fetchNhaXuatBan();
      } catch (error) {
        console.error("Lỗi khi cập nhật NXB:", error);
      }
    };

    const cancelEdit = (nxb) => {
      nxb.isEditing = false;
      fetchNhaXuatBan();
    };

    const deleteNXB = async (id) => {
      if (!confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) return;
      try {
        await fetch(`http://localhost:5000/api/nhaxuatban/${id}`, { method: "DELETE" });
        fetchNhaXuatBan();
      } catch (error) {
        console.error("Lỗi khi xóa NXB:", error);
      }
    };

    onMounted(fetchNhaXuatBan);

    return {
      nhaXuatBanList,
      showAddPopup,
      fetchNhaXuatBan,
      editNXB,
      updateNXB,
      cancelEdit,
      deleteNXB
    };
  }
};
</script>

<style scoped>
.nxb-page {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.nxb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.nxb-card {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #ddd;
}
.nxb-info h5 {
  color:#5ba1e6;
  margin-bottom: 10px;
}
.nxb-info p {
  margin: 4px 0;
  font-size: 14px;
}
.nxb-edit input {
  width: 100%;
}
.nxb-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
