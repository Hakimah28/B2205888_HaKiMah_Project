<template>
  <div class="container">
    <h1 class="title">Nhân Viên</h1>

    <!-- Đăng nhập -->
    <div v-if="!isLoggedIn" class="login-form">
      <h2>Đăng nhập</h2>
      <input v-model="loginData.MSNV" type="text" placeholder="Mã số nhân viên" required />
      <input v-model="loginData.password" type="password" placeholder="Mật khẩu" required />
      <button @click="login">Đăng nhập</button>
      <p v-if="loginError" class="error">{{ loginError }}</p>
    </div>

    <!-- Nếu đã đăng nhập -->
    <div v-else>
      <p>Chào, {{ currentUser.hotenNV }} ({{ currentUser.chucVu }})</p>

      <!-- Thông tin cá nhân -->
      <div class="profile">
        <h2>Thông tin cá nhân</h2>
        <p><strong>Mã NV:</strong> {{ currentUser.MSNV }}</p>
        <p><strong>Họ tên:</strong> {{ currentUser.hotenNV }}</p>
        <p><strong>Chức vụ:</strong> {{ currentUser.chucVu }}</p>
        <p><strong>Địa chỉ:</strong> {{ currentUser.diaChi }}</p>
        <p><strong>Số điện thoại:</strong> {{ currentUser.soDienThoai }}</p>
        <button @click="openEditPopup(currentUser)">Chỉnh sửa</button>
      </div>
    </div>

    <!-- Popup Chỉnh sửa -->
    <div v-if="showEditPopup" class="popup-overlay">
      <div class="popup-content">
        <h2>Chỉnh Sửa Thông Tin Cá Nhân</h2>
        <input v-model="editData.hotenNV" type="text" placeholder="Họ Tên" required />
        <input v-model="editData.diaChi" type="text" placeholder="Địa Chỉ" required />
        <input v-model="editData.soDienThoai" type="text" placeholder="Số Điện Thoại" required />
        <input v-model="editData.password" type="password" placeholder="Mật khẩu mới (nếu có)" />
        <button @click="updateNhanVien">Cập nhật</button>
        <button @click="showEditPopup = false" class="btn-cancel">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      loginData: { MSNV: "", password: "" },
      showEditPopup: false,
      editData: {},
      loginError: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:5000/api/nhanvien/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.loginData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        this.currentUser = data.nhanVien;
        this.isLoggedIn = true;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
      } catch (error) {
        this.loginError = error.message;
      }
    },
    openEditPopup(nhanVien) {
  this.editData = {
    hotenNV: nhanVien.hotenNV,
    diaChi: nhanVien.diaChi,
    soDienThoai: nhanVien.soDienThoai,
    password: "" // luôn để trống
  };
  this.showEditPopup = true;
},

    async updateNhanVien() {
  try {
    const token = localStorage.getItem("token");
    const payload = {
      hotenNV: this.editData.hotenNV,
      diaChi: this.editData.diaChi,
      soDienThoai: this.editData.soDienThoai
    };

    if (this.editData.password && this.editData.password.trim() !== "") {
      payload.password = this.editData.password;
    }

    const response = await fetch("http://localhost:5000/api/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    alert("Cập nhật thành công!");
    this.showEditPopup = false;
    this.currentUser = result.nhanVien;
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  } catch (error) {
    console.error("Lỗi khi cập nhật nhân viên:", error);
  }
},


  },
  mounted() {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.isLoggedIn = true;
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}
h1, h2 {
  color: #333;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
}
button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s ease;
}
button:hover {
  background: #0056b3;
}
.profile {
  margin-top: 20px;
  text-align: left;
}
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
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.btn-cancel {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
}
.btn-cancel:hover {
  background: #b52b3a;
}
</style>
