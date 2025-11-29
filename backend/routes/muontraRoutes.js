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

// 📝 Tạo phiếu mượn mới
router.post("/muon", async (req, res) => {
  const { MaDocGia, MaSach, NgayMuon, NgayTra } = req.body;

  if (!MaDocGia || !MaSach) {
    return res.status(400).json({ message: "Thiếu thông tin độc giả hoặc sách." });
  }

  try {
    const newRecord = new TheoDoiMuonSach({
      MaDocGia,
      MaSach,
      NgayMuon: NgayMuon || new Date(), // nhận từ body, nếu không có thì lấy ngày hiện tại
      NgayTra: NgayTra || null
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

    const hanMuon = 7; // số ngày cho phép mượn
    const ngayHetHan = new Date(record.NgayMuon);
    ngayHetHan.setDate(ngayHetHan.getDate() + hanMuon);

    if (record.NgayTra > ngayHetHan) {
      record.QuaHan = true;
      record.SoNgayTre = Math.ceil((record.NgayTra - ngayHetHan) / (1000 * 60 * 60 * 24));
      record.TienPhat = record.SoNgayTre * 2000; // 💰 tính tiền phạt
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
