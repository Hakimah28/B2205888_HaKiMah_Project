const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/QuanLyMuonSach";

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((error) => console.error("❌ Lỗi kết nối MongoDB:", error));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));        // Đăng nhập / đăng ký
app.use("/api/sach", require("./routes/sachRoutes"));        // Quản lý sách
app.use("/api/docgia", require("./routes/docgiaRoutes"));    // Quản lý độc giả
app.use("/api/nhaxuatban", require("./routes/nhaxuatbanRoutes")); // Quản lý nhà xuất bản
app.use("/api/muontra", require("./routes/muontraRoutes"));  // Quản lý mượn trả
app.use("/api/me", require("./routes/nhanvienRoutes"));  // Quản lý hồ sơ nhân viên
app.use("/api/admin", require("./routes/adminRoutes"));

// Route test
app.get("/", (req, res) => {
  res.send("🚀 Server đang chạy thành công");
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🌐 Server đang chạy tại http://localhost:${PORT}`);
});
