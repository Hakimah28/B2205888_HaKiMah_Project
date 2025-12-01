<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Chỉnh Sửa Sách</h2>
      <label>Mã Sách:</label>
      <input v-model="sachData.MaSach" disabled />

      <label>Tên Sách:</label>
      <input v-model="sachData.TenSach" />

      <label>Đơn Giá:</label>
      <input v-model.number="sachData.DonGia" type="number" />

      <label>Số Quyển:</label>
      <input v-model.number="sachData.SoQuyen" type="number" />

      <label>Năm Xuất Bản:</label>
      <input v-model.number="sachData.NamXuatBan" type="number" />

      <label>Nhà Xuất Bản:</label>
      <input v-model="sachData.MaNXB" />

      <label>Tác Giả:</label>
      <input v-model="sachData.TacGia" />

      <div class="button-group">
        <button class="btn-primary" @click="submitEdit">Lưu</button>
        <button class="btn-secondary" @click="$emit('close')">Hủy</button>
      </div>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  props: {
    isOpen: Boolean,
    sach: Object,
  },
  setup(props, { emit }) {
    const sachData = ref({});
    const successMessage = ref("");

    watchEffect(() => {
      if (props.sach) {
        sachData.value = { ...props.sach };
        successMessage.value = "";
      }
    });

    const submitEdit = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/sach/${sachData.value._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sachData.value),
        });

        if (!response.ok) throw new Error("Lỗi khi cập nhật sách!");

        successMessage.value = "✅ Cập nhật sách thành công!";
        setTimeout(() => {
          emit("updated");
          emit("close");
        }, 1000);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    return { sachData, submitEdit, successMessage };
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
input, select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.btn-primary {
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.success-message {
  margin-top: 15px;
  color: #28a745;
  font-weight: 500;
  text-align: center;
}
</style>
