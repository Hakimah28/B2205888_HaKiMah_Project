<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Chi Tiết Sách</h2>
      <div v-if="sach">
        <p><strong>Mã Sách:</strong> {{ sach.MaSach }}</p>
        <p><strong>Tên Sách:</strong> {{ sach.TenSach }}</p>
        <p><strong>Giá:</strong> {{ formatPrice(sach.DonGia) }}</p>
        <p><strong>Số Quyển:</strong> {{ sach.SoQuyen }}</p>
        <p><strong>Năm XB:</strong> {{ sach.NamXuatBan }}</p>
        <p><strong>NXB:</strong> {{ sach.MaNXB }}</p>
        <p><strong>Nguồn Gốc:</strong> {{ sach.NguonGoc }}</p>
      </div>
      <div class="button-group">
        <button class="btn-secondary" @click="$emit('pin', sach)">📌 Ghim</button>
        <button class="btn-cancel" @click="$emit('close')">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ isOpen: Boolean, sach: Object });
const emit = defineEmits(["close", "pin"]);

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Làm mờ nền */
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
  position: relative;
}

.popup-header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.popup-body label {
  font-weight: 600;
  color: #444;
}

.popup-body input, 
.popup-body select {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
  margin-right: 10px;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #495057;
}
</style>
