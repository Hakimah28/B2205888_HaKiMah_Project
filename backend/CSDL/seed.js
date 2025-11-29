const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const NhanVien = require("./models/NhanVien");

const MONGO_URI = "mongodb://localhost:27017/quanlymuonsach"; // Đảm bảo đúng tên DB

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Kết nối MongoDB thành công");

    const hashedPassword = bcrypt.hashSync("123456", 10);

    const nhanVien = new NhanVien({
      MSNV: "NV001",
      hotenNV: "Nguyễn Văn A",
      password: hashedPassword,
      chucVu: "Nhân Viên",
      diaChi: "123 Lý Thường Kiệt, Q.10, TP.HCM",
      soDienThoai: "0901234567"
    });

    await nhanVien.save();
    console.log("✅ Đã thêm nhân viên NV001 với mật khẩu đã mã hóa");

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err);
  });
