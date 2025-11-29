<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Cột 1: Liên hệ -->
      <div class="footer-column">
        <h3>📞 Liên hệ</h3>
        <p>Email: quanlymuonsach@example.com</p>
        <p>Điện thoại: 84 123 456 789</p>
        <p>Địa chỉ: Đại Học Cần Thơ, Phường Ninh Kiều, Cần Thơ</p>
        <p>Giờ làm việc: T2-T6: 8:00AM - 20:00PM<br />T7: 8:00AM- 21:00PM</p>
      </div>

      <!-- Cột 2: Giới thiệu -->
      <div class="footer-column">
        <h3>📚 Quản lý thư viện</h3>
        <p>Hệ thống quản lý thư viện hiện đại, cung cấp dịch vụ mượn trả sách trực tuyến với kho tàng tri thức phong phú và đa dạng.</p>
      </div>

      <!-- Cột 3: Liên kết hữu ích -->
      <div class="footer-column">
        <h3>🔗 Liên kết hữu ích</h3>
        <ul>
          <li><router-link to="/">Trang chủ</router-link></li>
          <li><router-link to="/sach">Sách</router-link></li>
          <li><router-link to="/docgia">Độc giả</router-link></li>
          <li><router-link to="/muontra">Mượn/Trả</router-link></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #5ba1e6;
  color: white;
  padding: 30px 20px;
  margin-top: 40px;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  max-width: 1000px;
  margin: auto;
}

.footer-column {
  flex: 1;
  min-width: 250px;
}

.footer-column h3 {
  margin-bottom: 10px;
  font-size: 18px;
  border-bottom: 1px solid white;
  padding-bottom: 5px;
}

.footer-column p {
  margin: 6px 0;
  line-height: 1.5;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin: 6px 0;
}

.footer-column ul li a {
  color: white;
  text-decoration: none;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}
</style>

  