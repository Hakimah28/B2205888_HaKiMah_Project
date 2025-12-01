<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Sách Đã Ghim</h2>

      <!-- Thông báo khi ghim thành công -->
      <div v-if="showMessage" class="popup-alert">
        📌 Sách đã được ghim thành công!
      </div>

      <!-- Danh sách sách đã ghim -->
      <ul v-if="pinnedList.length">
        <li v-for="sach in pinnedList" :key="sach._id">
          <strong>{{ sach.TenSach }}</strong> – {{ sach.MaSach }}
        </li>
      </ul>
      <p v-else class="text-muted">Chưa có sách nào được ghim.</p>

      <!-- Nút đóng -->
      <div class="button-group">
        <button class="btn-secondary" @click="$emit('close')">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ isOpen: Boolean, pinnedList: Array });
const emit = defineEmits(["close"]);

// ✅ Trạng thái hiển thị thông báo
const showMessage = ref(true);

// Hàm gọi khi ghim sách thành công
const handlePinSuccess = () => {
  showMessage.value = true;
  setTimeout(() => {
    showMessage.value = false;
  }, 3000); // ẩn sau 3 giây
};

</script>

<style scoped>
@import "PopupStyles.css";

/* Thông báo ghim sách */
.popup-alert {
  background: #d1e7dd;
  color: #0f5132;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}
</style>
