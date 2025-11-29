const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NhanVien = require("../models/NhanVien");

// 🆕 Đăng ký tài khoản nhân viên (không cần token)
router.post("/register", async (req, res) => {
  console.log("📥 Dữ liệu nhận được:", req.body);
  try {
    const { MSNV, hotenNV, password, diaChi, soDienThoai } = req.body;

    // Kiểm tra thông tin bắt buộc
    if (!MSNV || !hotenNV || !password || !diaChi || !soDienThoai) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // Kiểm tra trùng MSNV
    const existing = await NhanVien.findOne({ MSNV });
    if (existing) {
      return res.status(400).json({ message: "MSNV đã tồn tại!" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo nhân viên mới
    const newNhanVien = new NhanVien({
      MSNV,
      hotenNV,
      password: hashedPassword,
      chucVu: "Nhân Viên", // mặc định là nhân viên
      diaChi,
      soDienThoai
    });

    await newNhanVien.save();
    res.status(201).json({ message: "Đăng ký thành công!", nhanVien: newNhanVien });
  } catch (error) {
    console.error("❌ Lỗi đăng ký:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "MSNV đã tồn tại!" });
    }
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// 🔐 Đăng nhập nhân viên
router.post("/login", async (req, res) => {
  try {
    const { MSNV, password } = req.body;

    // Tìm nhân viên theo MSNV
    const nhanVien = await NhanVien.findOne({ MSNV });
    if (!nhanVien) return res.status(404).json({ message: "Nhân viên không tồn tại!" });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, nhanVien.password);
    if (!isMatch) return res.status(401).json({ message: "Mật khẩu không đúng!" });

    // Tạo token
    const token = jwt.sign(
      { id: nhanVien._id, MSNV: nhanVien.MSNV, chucVu: nhanVien.chucVu },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    // Trả về thông tin
    res.json({
      message: "Đăng nhập thành công!",
      token,
      nhanVien: {
        MSNV: nhanVien.MSNV,
        hotenNV: nhanVien.hotenNV,
        chucVu: nhanVien.chucVu,
        diaChi: nhanVien.diaChi,
        soDienThoai: nhanVien.soDienThoai
      }
    });
  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;
