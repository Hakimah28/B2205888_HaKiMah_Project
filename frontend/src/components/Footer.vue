<template>
  <footer class="footer">
    <div class="footer-container">
      
      <!-- Cột 1: Liên hệ -->
      <div class="footer-column">
        <h3>📞 Liên hệ</h3>
        <p>Email: <a href="mailto:quanlythuvienct@gmail.com">quanlythuvienct@gmail.com</a></p>
        <p>Điện thoại: <a href="tel:+84126635789">0126 635 789</a></p>
        <p>Địa chỉ: Đại học Cần Thơ, Phường Ninh Kiều, Cần Thơ</p>
        <p><strong>Giờ làm việc:</strong></p>
        <ul>
          <li>Thứ 2 – Thứ 6: 7:30 – 21:00</li>
          <li>Thứ 7 – Chủ nhật: 7:00 – 21:00</li>
        </ul>
        <p>
          📍 <a href="https://www.google.com/maps/place/Đại+Học+Cần+Thơ" 
                target="_blank" 
                class="map-link">
            Xem bản đồ
          </a>
        </p>
      </div>

      <!-- Cột 2: Giới thiệu -->
      <div class="footer-column">
        <h3>📚 Quản lý thư viện</h3>
        <p>
         Hệ thống quản lý thư viện hiện đại,giúp tra cứu và mượn trả sách nhanh chóng với kho tàng tri thức phong phú và đa dạng
        </p>
      </div>

      <!-- Cột 3: Liên kết hữu ích -->
      <div class="footer-column">
        <h3>🔗 Liên kết hữu ích</h3>
        <ul>
          <li><router-link to="/">Trang chủ</router-link></li>
          <li><router-link to="/sach">Sách</router-link></li>
          <li><router-link to="/muontra">Mượn Trả</router-link></li>
          <li><router-link to="/docgia">Độc giả</router-link></li>
          
        </ul>
      </div>

      <!-- Cột 4: Bản đồ -->
      <div class="footer-column">
        <h3>🗺️ Bản đồ</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.305261365932!2d105.77042125!3d10.02993395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089b7f0e6e4e3%3A0x6f8e6f8e6f8e6f8e!2zQ-G7rWEgUXXhuqNuIGjhu41jIFRoxrDhu51uIFRoxrDhu51uLCBUaOG7pyBDaMOtbmgsIENhbiBUaMOybmc!5e0!3m2!1svi!2s!4v1682334567890!5m2!1svi!2s"
          width="100%"
          height="200"
          style="border:0; border-radius:8px;"
         
          loading="lazy">
        </iframe>
      </div>
    </div>

    <!-- Ghi chú cuối footer -->
    <div class="footer-bottom">
      <p>© 2025 Quản lý thư viện</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #5ba1e6;
  color: white;
  padding: 40px 20px 20px;
  margin-top: 40px;
  font-family: Arial, sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: auto;
}

.footer-column {
  flex: 1;
  min-width: 250px;
}

.footer-column h3 {
  margin-bottom: 12px;
  font-size: 18px;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 6px;
}

.footer-column p,
.footer-column ul li {
  margin: 6px 0;
  line-height: 1.6;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li a,
.footer-column a {
  color:#ffffff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-column ul li a:hover,
.footer-column a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.footer-column iframe {
  width: 100%;
  height: 200px;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  border-top: 1px solid #5ba1e6;
  padding-top: 10px;
  font-size: 14px;
  opacity: 0.8;
}
</style>
