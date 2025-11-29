<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Chỉnh Sửa Đọc Giả</h2>
      <form @submit.prevent="submitEdit">
        <label>Mã Đọc Giả:</label>
        <input v-model="docGia.MaDocGia" type="text" disabled />

        <label>Họ Lót:</label>
        <input v-model="docGia.HoLot" type="text" required />

        <label>Tên:</label>
        <input v-model="docGia.Ten" type="text" required />

        <label>Ngày Sinh:</label>
        <input v-model="docGia.NgaySinh" type="date" required />

        <label>Phái:</label>
        <select v-model="docGia.Phai" required>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <label>Địa Chỉ:</label>
        <input v-model="docGia.DiaChi" type="text" required />

        <label>Điện Thoại:</label>
        <input v-model="docGia.DienThoai" type="text" required />

        <div class="button-group">
          <button type="submit" class="btn-primary">Lưu</button>
          <button type="button" class="btn-cancel" @click="$emit('close')">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({ isOpen: Boolean, docGiaData: Object });
const emit = defineEmits(["close", "updated"]);

const docGia = reactive({
  MaDocGia: "",
  HoLot: "",
  Ten: "",
  NgaySinh: "",
  Phai: "",
  DiaChi: "",
  DienThoai: ""
});

// 🛠 Khi `docGiaData` thay đổi, cập nhật dữ liệu vào form
watch(() => props.docGiaData, (newVal) => {
  if (newVal) {
    console.log("🔄 Cập nhật dữ liệu vào form:", newVal);  // Debug log
    Object.assign(docGia, newVal);
  }
}, { immediate: true, deep: true });

const submitEdit = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/docgia/${docGia.MaDocGia}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(docGia)
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Cập nhật thành công!", data);  // Debug log
      emit("updated"); // Gọi lại danh sách đọc giả
      emit("close");
    } else {
      alert(data.message || "Lỗi khi cập nhật đọc giả!");
    }
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật:", error);
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
}

.popup-content h2 {
  text-align: center;
  color: #333;
}

label {
  font-weight: 600;
  color: #444;
}

input, select {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-primary:hover {
  background:  #007bff;
}

.btn-cancel {
  background: #dc3545;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #a71d2a;
}
</style>
