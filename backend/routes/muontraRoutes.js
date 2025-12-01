const express = require("express");
const router = express.Router();
const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");

// 📥 Lấy toàn bộ danh sách phiếu mượn
router.get("/", async (req, res) => {
  try {
    const records = await TheoDoiMuonSach.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách mượn trả", error });
  }
});

// 📝 Tạo phiếu mượn mới (tính trạng thái nếu có ngày trả)
router.post("/muon", async (req, res) => {
  const { MaDocGia, MaSach, NgayMuon, NgayTra } = req.body;

  if (!MaDocGia || !MaSach) {
    return res.status(400).json({ message: "Thiếu thông tin độc giả hoặc sách." });
  }

  try {
    const ngayMuon = NgayMuon ? new Date(NgayMuon) : new Date();
    const ngayTra = NgayTra ? new Date(NgayTra) : null;

    const hanMuon = 7;
    const ngayHetHan = new Date(ngayMuon);
    ngayHetHan.setDate(ngayHetHan.getDate() + hanMuon);

    let quaHan = false;
    let soNgayTre = 0;
    let tienPhat = 0;

    if (ngayTra && ngayTra > ngayHetHan) {
      const msPerDay = 1000 * 60 * 60 * 24;
      soNgayTre = Math.floor((ngayTra - ngayHetHan) / msPerDay);
      quaHan = true;
      tienPhat = soNgayTre * 2000;
    }

    const newRecord = new TheoDoiMuonSach({
      MaDocGia,
      MaSach,
      NgayMuon: ngayMuon,
      NgayTra: ngayTra,
      QuaHan: quaHan,
      SoNgayTre: soNgayTre,
      TienPhat: tienPhat
    });

    await newRecord.save();
    res.status(201).json({ message: "Tạo phiếu mượn thành công", record: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo phiếu mượn", error });
  }
});

// ✅ Trả sách (cập nhật ngày trả + kiểm tra quá hạn + tính tiền phạt)
router.put("/tra/:id", async (req, res) => {
  try {
    const record = await TheoDoiMuonSach.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });

    record.NgayTra = new Date();

    const hanMuon = 7;
    const ngayHetHan = new Date(record.NgayMuon);
    ngayHetHan.setDate(ngayHetHan.getDate() + hanMuon);

    const msPerDay = 1000 * 60 * 60 * 24;
    const soNgayTre = Math.floor((record.NgayTra - ngayHetHan) / msPerDay);

    if (soNgayTre > 0) {
      record.QuaHan = true; // ✅ sửa lại đúng
      record.SoNgayTre = soNgayTre;
      record.TienPhat = soNgayTre * 2000;
    } else {
      record.QuaHan = false;
      record.SoNgayTre = 0;
      record.TienPhat = 0;
    }

    await record.save();
    res.json({ message: "Đã trả sách thành công", record });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi trả sách", error });
  }
});

// ✏️ Cập nhật thông tin phiếu mượn
router.put("/:id", async (req, res) => {
  const { MaDocGia, MaSach, NgayMuon, NgayTra } = req.body;

  try {
    const record = await TheoDoiMuonSach.findByIdAndUpdate(
      req.params.id,
      { MaDocGia, MaSach, NgayMuon, NgayTra },
      { new: true }
    );

    if (!record) return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });
    res.json({ message: "Cập nhật thành công", record });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật phiếu mượn", error });
  }
});

// 🗑️ Xóa phiếu mượn
router.delete("/:id", async (req, res) => {
  try {
    const record = await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });
    res.json({ message: "Xóa phiếu mượn thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa phiếu mượn", error });
  }
});

module.exports = router;
