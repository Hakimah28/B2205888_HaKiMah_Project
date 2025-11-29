const express = require("express");
const router = express.Router();
const NhanVien = require("../models/NhanVien");
const Sach = require("../models/Sach");
const DocGia = require("../models/DocGia");
const MuonTra = require("../models/TheoDoiMuonSach");
const { authenticateToken, verifyRole } = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs");

// ======================= QUẢN LÝ NHÂN VIÊN =======================

// 📋 Lấy danh sách tất cả nhân viên
router.get("/nhanvien", authenticateToken, verifyRole("Quản Lý"), async (req, res) => {
  try {
    const list = await NhanVien.find();
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên", error });
  }
});

// ✏️ Cập nhật thông tin nhân viên (bao gồm cấp quyền)
router.put("/nhanvien/:MSNV", authenticateToken, verifyRole("Quản Lý"), async (req, res) => {
  try {
    const { MSNV } = req.params;
    const updateData = req.body;

    // Nếu có mật khẩu mới thì mã hóa
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updated = await NhanVien.findOneAndUpdate(
      { MSNV },
      { $set: updateData },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json({ message: "Cập nhật thành công", nhanVien: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật nhân viên", error });
  }
});

// 🗑️ Xóa nhân viên
router.delete("/nhanvien/:MSNV", authenticateToken, verifyRole("Quản Lý"), async (req, res) => {
  try {
    const { MSNV } = req.params;
    const deleted = await NhanVien.findOneAndDelete({ MSNV });
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json({ message: "Đã xóa nhân viên" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa nhân viên", error });
  }
});

// ======================= THỐNG KÊ =======================

// 📊 Lấy thống kê tổng hợp
router.get("/thongke", authenticateToken, verifyRole("Quản Lý"), async (req, res) => {
  try {
    const stats = {
      sach: await Sach.countDocuments(),
      docgia: await DocGia.countDocuments(),
      nhanvien: await NhanVien.countDocuments(),
      muontra: await MuonTra.countDocuments()
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thống kê", error });
  }
});

module.exports = router;
