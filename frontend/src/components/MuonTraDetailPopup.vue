<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Chi Tiết Phiếu Mượn</h2>
      <p><strong>Độc giả:</strong> {{ phieu.MaDocGia }}</p>
      <p><strong>Mã sách:</strong> {{ phieu.MaSach }}</p>
      <p><strong>Ngày mượn:</strong> {{ formatDate(phieu.NgayMuon) }}</p>
      <p><strong>Ngày trả:</strong> {{ phieu.NgayTra ? formatDate(phieu.NgayTra) : 'Chưa trả' }}</p>
      <div class="button-group">
        <button class="btn-secondary" @click="$emit('close')">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ isOpen: Boolean, phieu: Object });
const emit = defineEmits(["close"]);
const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
