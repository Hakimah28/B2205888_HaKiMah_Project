<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>{{ isEdit ? "Chỉnh Sửa Quản Trị Viên" : "Thêm Quản Trị Viên" }}</h2>

      <label>Tên đăng nhập:</label>
      <input v-model="username" placeholder="VD: admin01" />

      <label>Email:</label>
      <input v-model="email" type="email" placeholder="VD: admin@example.com" />

      <label>Mật khẩu:</label>
      <input v-model="password" type="password" placeholder="Nhập mật khẩu" />

      <label>Vai trò:</label>
      <select v-model="role">
        <option value="admin">Admin</option>
        <option value="nhanvien">Nhân viên</option>
      </select>

      <div class="button-group">
        <button class="btn-primary" @click="submitQuanTriVien">
          {{ isEdit ? "Cập nhật" : "Xác nhận" }}
        </button>
        <button class="btn-secondary" @click="$emit('close')">Hủy</button>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  isOpen: Boolean,
  isEdit: Boolean,
  quanTriVien: Object // khi chỉnh sửa sẽ truyền dữ liệu vào đây
});
const emit = defineEmits(["close", "saved"]);

const username = ref("");
const email = ref("");
const password = ref("");
const role = ref("admin");
const errorMessage = ref("");
const successMessage = ref("");

// Khi mở popup chỉnh sửa, load dữ liệu vào form
watchEffect(() => {
  if (props.isEdit && props.quanTriVien) {
    username.value = props.quanTriVien.username || "";
    email.value = props.quanTriVien.email || "";
    role.value = props.quanTriVien.role || "admin";
    password.value = ""; // không hiển thị mật khẩu cũ
  } else {
    username.value = "";
    email.value = "";
    password.value = "";
    role.value = "admin";
  }
});

const submitQuanTriVien = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!username.value || !email.value || (!props.isEdit && !password.value)) {
    errorMessage.value = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  try {
    const url = props.isEdit
      ? `http://localhost:5000/api/nhanvien/${props.quanTriVien._id}`
      : "http://localhost:5000/api/nhanvien";

    const method = props.isEdit ? "PUT" : "POST";

    const bodyData = {
      username: username.value,
      email: email.value,
      role: role.value
    };

    if (!props.isEdit) {
      bodyData.password = password.value;
    }

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData)
    });

    const result = await response.json();

    if (!response.ok) {
      errorMessage.value = result.message || "Lỗi khi lưu quản trị viên!";
      return;
    }

    successMessage.value = props.isEdit
      ? "✅ Cập nhật quản trị viên thành công!"
      : "✅ Thêm quản trị viên thành công!";
    emit("saved");

    setTimeout(() => {
      emit("close");
    }, 1000);
  } catch (error) {
    errorMessage.value = "Không thể lưu quản trị viên. Vui lòng kiểm tra lại.";
    console.error("Lỗi:", error);
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
  background: rgba(0,0,0,0.4);
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  gap: 10px;
}
.btn-primary {
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.success-message {
  margin-top: 10px;
  color: #28a745;
  font-weight: 500;
  text-align: center;
}
.error-message {
  margin-top: 10px;
  color: #dc3545;
  font-weight: 500;
  text-align: center;
}
</style>
