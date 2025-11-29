<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Tạo Phiếu Mượn</h2>

      <label>Mã Độc Giả:</label>
      <input v-model="maDocGia" placeholder="VD: DG001" />

      <label>Mã Sách:</label>
      <input v-model="maSach" placeholder="VD: S001" />

      <label>Ngày Mượn:</label>
      <input v-model="ngayMuon" type="date" />

      <label>Ngày Trả:</label>
      <input v-model="ngayTra" type="date" />

      <!-- Cảnh báo phạt -->
      <div class="info-box">
        <p class="text-muted">⚠️ Nếu trả quá hạn sẽ bị phạt <strong>2000đ/ngày</strong>.</p>
        <p class="text-muted">⏳ Thời gian mượn tối đa là <strong>7 ngày, Tính từ ngày bắt đầu mượn</strong>.</p>
      </div>

      <div class="button-group">
        <button class="btn-primary" @click="submitMuon">Xác nhận</button>
        <button class="btn-secondary" @click="$emit('close')">Hủy</button>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "added"]);

const maDocGia = ref("");
const maSach = ref("");
const ngayMuon = ref("");
const ngayTra = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const submitMuon = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!maDocGia.value || !maSach.value) {
    errorMessage.value = "Vui lòng nhập đầy đủ Mã Độc Giả và Mã Sách.";
    return;
  }

  // Validate ngày trả phải >= ngày mượn
  if (ngayMuon.value && ngayTra.value) {
    const nm = new Date(ngayMuon.value);
    const nt = new Date(ngayTra.value);
    if (nt < nm) {
      errorMessage.value = "Ngày trả không được trước ngày mượn.";
      return;
    }
  }

  try {
    const response = await fetch("http://localhost:5000/api/muontra/muon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        MaDocGia: maDocGia.value,
        MaSach: maSach.value,
        NgayMuon: ngayMuon.value || new Date(),
        NgayTra: ngayTra.value || null
      })
    });

    const result = await response.json();

    if (!response.ok) {
      errorMessage.value = result.message || "Lỗi khi tạo phiếu mượn!";
      return;
    }

    successMessage.value = "✅ Tạo phiếu mượn thành công!";
    emit("added");

    setTimeout(() => {
      emit("close");
    }, 1000);
  } catch (error) {
    errorMessage.value = "Không thể tạo phiếu mượn. Vui lòng kiểm tra lại.";
    console.error("Lỗi:", error);
  }
};
</script>

<style scoped>
@import "PopupStyles.css";

.info-box {
  margin: 10px 0;
  padding: 10px;
  background: #f9f9f9;
  border-left: 4px solid #3498db;
  border-radius: 6px;
  font-size: 14px;
}
.text-muted {
  color: #7f8c8d;
  font-style: italic;
}
</style>
