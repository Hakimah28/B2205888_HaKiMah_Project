<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Chi Tiết Sách</h2>

      <p><strong>Mã Sách:</strong> {{ sach.MaSach }}</p>
      <p><strong>Tên Sách:</strong> {{ sach.TenSach }}</p>
      <p><strong>Giá:</strong> {{ formatPrice(sach.DonGia) }}</p>
      <p><strong>Số Quyển:</strong> {{ sach.SoQuyen }}</p>
      <p><strong>Năm XB:</strong> {{ sach.NamXuatBan }}</p>
      <p><strong>NXB:</strong> {{ sach.MaNXB }}</p>
      <p><strong>Nguồn Gốc:</strong> {{ sach.NguonGoc }}</p>

      <div class="button-group">
        <button class="btn-primary" @click="$emit('pin', sach)">📌 Ghim</button>
        <button class="btn-secondary" @click="$emit('close')">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ isOpen: Boolean, sach: Object });

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price);
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex; justify-content: center; align-items: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
.btn-primary {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
.btn-secondary {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
