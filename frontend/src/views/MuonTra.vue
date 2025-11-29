<template>
  <div class="muontra-page container">
    <div class="header">
      <h2><i class="fas fa-book-reader me-2"></i>Quản lý Mượn/Trả Sách</h2>
      <div class="actions">
        <button @click="showAddPopup = true" class="btn btn-primary">
          <i class="fas fa-plus me-1"></i> Tạo phiếu mượn
        </button>
      </div>
    </div>

    <div v-if="muonTraList.length" class="loan-grid">
      <div v-for="phieu in muonTraList" :key="phieu._id" class="loan-card shadow-sm">
        <div class="loan-info" @click="viewDetail(phieu)">
          <h5>Độc giả: {{ phieu.MaDocGia }}</h5>
          <p><strong>Mã sách:</strong> {{ phieu.MaSach }}</p>
          <p><strong>Ngày mượn:</strong> {{ formatDate(phieu.NgayMuon) }}</p>
          <p><strong>Ngày trả:</strong> {{ phieu.NgayTra ? formatDate(phieu.NgayTra) : 'Chưa trả' }}</p>
          <p>
            <strong>Trạng thái:</strong>
            <span v-if="phieu.QuaHan" class="status-late">
              Quá hạn ({{ phieu.SoNgayTre }} ngày) - Phạt: {{ phieu.TienPhat.toLocaleString() }}đ
            </span>
            <span v-else-if="phieu.NgayTra" class="status-ok">Đúng hạn</span>
            <span v-else class="status-pending">Đang mượn</span>
          </p>
        </div>
        <div class="loan-actions" @click.stop>
          <button v-if="!phieu.NgayTra" @click="traSach(phieu._id)" class="btn btn-success btn-sm">
            ✅ Trả sách
          </button>
          <button @click="deletePhieu(phieu._id)" class="btn btn-danger btn-sm">
            🗑️ Xóa
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-muted text-center mt-4">
      <i class="fas fa-info-circle me-2"></i>Không có phiếu mượn nào.
    </p>

    <!-- Popups -->
    <AddMuonTraPopup :isOpen="showAddPopup" @close="showAddPopup = false" @added="fetchMuonTra" />
    <MuonTraDetailPopup :isOpen="showDetailPopup" :phieu="selectedPhieu" @close="showDetailPopup = false" />
  </div>
</template>

<script>
import AddMuonTraPopup from "../components/AddMuonTraPopup.vue";
import MuonTraDetailPopup from "../components/MuonTraDetailPopup.vue";

export default {
  components: { AddMuonTraPopup, MuonTraDetailPopup },
  data() {
    return {
      muonTraList: [],
      showAddPopup: false,
      showDetailPopup: false,
      selectedPhieu: null
    };
  },
  mounted() {
    this.fetchMuonTra();
  },
  methods: {
    async fetchMuonTra() {
      try {
        const response = await fetch("http://localhost:5000/api/muontra");
        this.muonTraList = await response.json();
      } catch (error) {
        console.error("Lỗi khi tải danh sách mượn/trả:", error);
      }
    },
    viewDetail(phieu) {
      this.selectedPhieu = phieu;
      this.showDetailPopup = true;
    },
    async traSach(id) {
      if (!confirm("Xác nhận trả sách?")) return;
      try {
        await fetch(`http://localhost:5000/api/muontra/tra/${id}`, { method: "PUT" });
        this.fetchMuonTra();
      } catch (error) {
        console.error("Lỗi khi trả sách:", error);
      }
    },
    async deletePhieu(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa phiếu mượn này?")) return;
      try {
        await fetch(`http://localhost:5000/api/muontra/${id}`, { method: "DELETE" });
        this.fetchMuonTra();
      } catch (error) {
        console.error("Lỗi khi xóa phiếu mượn:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
    }
  }
};
</script>

<style scoped>
.muontra-page { padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.actions button { margin-left: 10px; }
.loan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.loan-card { background: #fff; border-radius: 10px; padding: 15px; border: 1px solid #ddd; cursor: pointer; transition: all 0.3s ease; }
.loan-card:hover { box-shadow: 0 6px 14px rgba(0,0,0,0.15); transform: translateY(-2px); }
.loan-info h5 { margin-bottom: 10px; color: #3498db; }
.loan-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
.status-late { color: #e74c3c; font-weight: bold; }
.status-ok { color: #2ecc71; font-weight: bold; }
.status-pending { color: #f39c12; font-weight: bold; }
</style>
