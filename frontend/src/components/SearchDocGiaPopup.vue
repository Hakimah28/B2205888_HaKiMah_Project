<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Tìm Đọc Giả</h2>
      <form @submit.prevent="searchDocGia">
        <label>Mã Đọc Giả:</label>
        <input v-model="maDocGia" type="text" required />

        <div class="button-group">
          <button type="submit" class="btn-primary">Tìm</button>
          <button type="button" class="btn-cancel" @click="$emit('close')">Hủy</button>
        </div>
      </form>

      <div v-if="searched">
        <h3>Kết Quả:</h3>
        <div v-if="docGia">
          <p><strong>Họ Lót:</strong> {{ docGia.HoLot }}</p>
          <p><strong>Tên:</strong> {{ docGia.Ten }}</p>
          <p><strong>Ngày Sinh:</strong> {{ new Date(docGia.NgaySinh).toLocaleDateString() }}</p>
          <p><strong>Phái:</strong> {{ docGia.Phai }}</p>
          <p><strong>Địa Chỉ:</strong> {{ docGia.DiaChi }}</p>
          <p><strong>Điện Thoại:</strong> {{ docGia.DienThoai }}</p>
        </div>
        <p v-else class="error-text">Không tìm thấy đọc giả.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "search"]);

const maDocGia = ref(""); // 🔹 Nhập Mã Đọc Giả từ người dùng
const docGia = ref(null);
const searched = ref(false);

const searchDocGia = async () => {
  try {
    console.log("🔍 Đang tìm:", maDocGia.value); // 🔹 Kiểm tra đầu vào trên console

    const response = await fetch(`http://localhost:5000/api/docgia/search/${maDocGia.value}`);
    
    if (!response.ok) throw new Error("Không tìm thấy đọc giả");
    
    docGia.value = await response.json();
    console.log("✅ Kết quả:", docGia.value);
  } catch (error) {
    docGia.value = null;
    console.error("❌ Lỗi khi tìm đọc giả:", error);
  } finally {
    searched.value = true;
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
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: left;
}
label {
  font-weight: bold;
  display: block;
  margin: 10px 0 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-primary:hover {
  background: #0056b3;
}
.btn-cancel {
  background: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-cancel:hover {
  background: darkred;
}
.error-text {
  color: red;
  font-weight: bold;
}
</style>
