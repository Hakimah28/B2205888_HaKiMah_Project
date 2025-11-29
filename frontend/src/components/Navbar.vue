<template>
  <nav class="navbar">
    <div class="navbar-brand">📚 Quản lý thư viện</div>

    <ul class="navbar-links">
      <li><router-link to="/" exact-active-class="active">Trang chủ</router-link></li>
      <li><router-link to="/sach" exact-active-class="active">Sách</router-link></li>
      <li><router-link to="/muontra" exact-active-class="active">Mượn/Trả</router-link></li>
      <li><router-link to="/docgia" exact-active-class="active">Độc giả</router-link></li>
      <li><router-link to="/nhaxuatban" exact-active-class="active">Nhà xuất bản</router-link></li>

      <!-- Dropmenu Quản lý -->
    </ul>
    <div class="dropdown">
      <button class="dropdown-btn">👤 Tài khoản</button>
      <div class="dropdown-content">
        <router-link to="/me">Thông tin cá nhân</router-link>
        <button @click="logout">Đăng xuất</button>
      </div>
    </div>
    <div v-if="isManager" class="dropdown">
      <button class="dropdown-btn">⚙️ Quản lý</button>
        <div class="dropdown-content">
          <router-link to="/adminnhanvien">Quản lý nhân viên</router-link>
          <router-link to="/dashboard">Xem thống kê</router-link>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return { isManager: false };
  },
  mounted() {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.chucVu === "Quản Lý") this.isManager = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
  },
};
</script>
