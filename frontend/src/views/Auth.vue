<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="tab-buttons">
        <button :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">Đăng nhập</button>
        <button :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">Đăng ký</button>
      </div>

      <!-- Đăng nhập -->
      <form v-if="activeTab === 'login'" @submit.prevent="login">
        <input v-model="loginMSNV" type="text" placeholder="Mã số nhân viên (MSNV)" required />
        <input v-model="loginPassword" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>

      <!-- Đăng ký -->
      <form v-if="activeTab === 'register'" @submit.prevent="register">
        <input v-model="regMSNV" type="text" placeholder="Mã số nhân viên (MSNV)" required />
        <input v-model="regHoten" type="text" placeholder="Họ tên nhân viên" required />
        <input v-model="regPassword" type="password" placeholder="Mật khẩu" required />
        <input v-model="regDiaChi" type="text" placeholder="Địa chỉ" required />
        <input v-model="regSoDienThoai" type="text" placeholder="Số điện thoại" required />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeTab: "login",
      loginMSNV: "",
      loginPassword: "",
      regMSNV: "",
      regHoten: "",
      regPassword: "",
      regDiaChi: "",
      regSoDienThoai: "",
      errorMessage: "",
      currentUser: null,
      isLoggedIn: false
    };
  },
  methods: {
    async login() {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        MSNV: this.loginMSNV,
        password: this.loginPassword
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    // Lưu token
    localStorage.setItem("token", data.token);

    // Lấy dữ liệu mới nhất
    const meResponse = await fetch("http://localhost:5000/api/me", {
      headers: { Authorization: `Bearer ${data.token}` }
    });
    const meData = await meResponse.json();

    this.currentUser = meData;
    this.isLoggedIn = true;
    localStorage.setItem("currentUser", JSON.stringify(meData));

    // ✅ Chuyển hướng sang trang chủ
    this.$router.push("/");   // hoặc "/home" nếu bạn đặt route tên khác
  } catch (error) {
    this.errorMessage = error.message;
  }
},


    async register() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            MSNV: this.regMSNV,
            hotenNV: this.regHoten,
            password: this.regPassword,
            diaChi: this.regDiaChi,
            soDienThoai: this.regSoDienThoai
          })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        alert("🎉 Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        this.activeTab = "login";
        this.regMSNV = "";
        this.regHoten = "";
        this.regPassword = "";
        this.regDiaChi = "";
        this.regSoDienThoai = "";
      } catch (error) {
        alert("❌ Lỗi đăng ký: " + (error.message || "Không thể đăng ký."));
      }
    }
  },
  mounted() {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.isLoggedIn = true;
    }
  }
};
</script>


<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #e0eafc, #cfdef3);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.tab-buttons button {
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  margin: 0 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tab-buttons button.active {
  background: #007bff;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button[type="submit"] {
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background: #0056b3;
}

.error {
  color: red;
  margin-top: 0.5rem;
  text-align: center;
}
</style>

