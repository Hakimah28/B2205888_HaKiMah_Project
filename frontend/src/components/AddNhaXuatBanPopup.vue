<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Thêm Nhà Xuất Bản</h2>
      <form @submit.prevent="submitAdd">
        <label>Mã NXB:</label>
        <input v-model="newNXB.MaNXB" type="text" required />

        <label>Tên Nhà Xuất Bản:</label>
        <input v-model="newNXB.TenNXB" type="text" required />

        <label>Địa Chỉ:</label>
        <input v-model="newNXB.DiaChi" type="text" required />

        <div class="button-group">
          <button type="submit" class="btn-primary">Thêm</button>
          <button type="button" class="btn-cancel" @click="$emit('close')">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "added"]);

const newNXB = ref({ MaNXB: "", TenNXB: "", DiaChi: "" });

// 🔹 Thêm nhà xuất bản
const submitAdd = async () => {
  try {
    await fetch("http://localhost:5000/api/nhaxuatban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNXB.value),
    });

    emit("added"); // Thông báo cập nhật danh sách
    emit("close"); // Đóng popup
  } catch (error) {
    console.error("Lỗi khi thêm nhà xuất bản:", error);
  }
};
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
}
.popup-content {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
label {
  font-weight: bold;
  display: block;
  margin: 10px 0 5px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background:  #007bff;
}
.btn-cancel {
  background: red;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
.btn-cancel:hover {
  background: darkred;
}
</style>
