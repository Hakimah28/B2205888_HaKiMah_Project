<template>
  <div class="home-container">
    <h1>📚 Hệ thống Quản lý Thư viện</h1>
    <p>Chào mừng bạn đến với hệ thống quản lý mượn trả sách.</p>

    <div class="quick-links">
      <router-link to="/sach" class="card">
        <h3>📖 Quản lý Sách</h3>
        <p>Xem, thêm, chỉnh sửa và xóa sách trong thư viện.</p>
      </router-link>

      <router-link to="/muontra" class="card">
        <h3>🔄 Mượn/Trả</h3>
        <p>Quản lý việc mượn và trả sách của độc giả.</p>
      </router-link>

      <router-link to="/docgia" class="card">
        <h3>👥 Độc giả</h3>
        <p>Quản lý thông tin độc giả.</p>
      </router-link>

      <router-link to="/me" class="card">
        <h3>🧑‍💼 Nhân viên</h3>
        <p>Quản lý thông tin nhân viên thư viện.</p>
      </router-link>

      <router-link to="/nhaxuatban" class="card">
        <h3>🏢 Nhà xuất bản</h3>
        <p>Quản lý danh sách nhà xuất bản.</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 40px;
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  width: 220px;
  text-decoration: none;
  color: #333;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.card h3 {
  margin-bottom: 20px;
  color: #5ba1e6;
}
</style>
