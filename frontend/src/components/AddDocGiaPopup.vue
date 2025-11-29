<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Thêm Đọc Giả</h2>
      <form @submit.prevent="submitAdd">
        <label>Mã Đọc Giả:</label>
        <input v-model="docGia.MaDocGia" type="text" required />

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
          <button type="submit" class="btn-primary">Thêm</button>
          <button type="button" class="btn-cancel" @click="$emit('close')">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "added"]);

const docGia = reactive({
  MaDocGia: "",
  HoLot: "",
  Ten: "",
  NgaySinh: "",
  Phai: "Nam",
  DiaChi: "",
  DienThoai: ""
});

const submitAdd = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/docgia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(docGia)
    });

    const data = await response.json();
    if (response.ok) {
      alert("Thêm đọc giả thành công!");
      emit("added");
      emit("close");
    } else {
      alert(data.message || "Lỗi khi thêm đọc giả!");
    }
  } catch (error) {
    console.error("Lỗi khi thêm đọc giả:", error);
    alert("Lỗi kết nối đến server!");
  }
};
</script>

<style scoped>
@import 'PopupStyles.css';
</style>