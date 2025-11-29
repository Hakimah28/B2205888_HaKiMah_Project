const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NhanVien = require("../models/NhanVien");

// Middleware xác thực token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Thiếu token" });

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.user = user; // chứa { id, MSNV, chucVu }
    next();
  });
};

// 📌 Lấy thông tin cá nhân từ token
router.get("/", authenticateToken, async (req, res) => {
  try {
    const nhanVien = await NhanVien.findOne({ MSNV: req.user.MSNV });
    if (!nhanVien) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(nhanVien);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// 📌 Cập nhật thông tin cá nhân
router.put("/", authenticateToken, async (req, res) => {
  try {
    const { hotenNV, diaChi, soDienThoai, password } = req.body;
    const updateData = { hotenNV, diaChi, soDienThoai };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedNhanVien = await NhanVien.findOneAndUpdate(
      { MSNV: req.user.MSNV },
      { $set: updateData },
      { new: true }
    );

    if (!updatedNhanVien) return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    res.json({ message: "Cập nhật thành công!", nhanVien: updatedNhanVien });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// 📌 Quản Lý có thể xem danh sách toàn bộ nhân viên
router.get("/all", authenticateToken, async (req, res) => {
  try {
    if (req.user.chucVu !== "Quản Lý") {
      return res.status(403).json({ message: "Chỉ Quản Lý mới có quyền xem danh sách nhân viên" });
    }
    const nhanViens = await NhanVien.find();
    res.json(nhanViens);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// 📌 Quản Lý có thể chỉnh sửa thông tin nhân viên bất kỳ
router.put("/:MSNV", authenticateToken, async (req, res) => {
  try {
    if (req.user.chucVu !== "Quản Lý") {
      return res.status(403).json({ message: "Chỉ Quản Lý mới có quyền chỉnh sửa nhân viên khác" });
    }

    const { hotenNV, diaChi, soDienThoai, password, chucVu } = req.body;
    const updateData = { hotenNV, diaChi, soDienThoai, chucVu };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedNhanVien = await NhanVien.findOneAndUpdate(
      { MSNV: req.params.MSNV },
      { $set: updateData },
      { new: true }
    );

    if (!updatedNhanVien) return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    res.json({ message: "Cập nhật thành công!", nhanVien: updatedNhanVien });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;
