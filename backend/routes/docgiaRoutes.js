const express = require("express");
const DocGia = require("../models/DocGia");

const router = express.Router();

// 📌 Lấy danh sách tất cả đọc giả
router.get("/", async (req, res) => {
    try {
        const docGiaList = await DocGia.find();
        res.status(200).json(docGiaList);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server khi lấy danh sách đọc giả", error });
    }
});

// 📌 Tìm đọc giả theo Mã Đọc Giả (MaDocGia)
router.get("/search/:maDocGia", async (req, res) => {
    try {
        const docGia = await DocGia.findOne({ MaDocGia: req.params.maDocGia });
        if (!docGia) {
            return res.status(404).json({ message: "Không tìm thấy đọc giả!" });
        }
        res.status(200).json(docGia);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server khi tìm đọc giả!", error });
    }
});

// 📌 Tìm đọc giả theo ID
router.get("/search/:maDocGia", async (req, res) => {
    try {
        const docGia = await DocGia.findOne({ MaDocGia: req.params.maDocGia });
        if (!docGia) {
            return res.status(404).json({ message: "Không tìm thấy đọc giả" });
        }
        res.status(200).json(docGia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// 📌 Thêm đọc giả mới (Kiểm tra MaDocGia đã tồn tại chưa)
router.post("/", async (req, res) => {
    try {
        const { MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai } = req.body;

        // Kiểm tra nếu MaDocGia đã tồn tại
        const existingDocGia = await DocGia.findOne({ MaDocGia });
        if (existingDocGia) {
            return res.status(400).json({ message: "Mã Đọc Giả đã tồn tại!" });
        }

        const newDocGia = new DocGia({ MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai });
        await newDocGia.save();
        res.status(201).json({ message: "Thêm đọc giả thành công!", docGia: newDocGia });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm đọc giả!", error });
    }
});

// Cập nhật thông tin đọc giả theo MaDocGia
router.put("/:MaDocGia", async (req, res) => {
    try {
        const { MaDocGia } = req.params;
        const updatedDocGia = await DocGia.findOneAndUpdate({ MaDocGia }, req.body, { new: true });

        if (!updatedDocGia) {
            return res.status(404).json({ message: "Không tìm thấy đọc giả để cập nhật" });
        }
        res.status(200).json({ message: "Cập nhật thành công!", docGia: updatedDocGia });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật đọc giả", error });
    }
});


// 📌 Xóa đọc giả (Kiểm tra ID hợp lệ)
router.delete("/:id", async (req, res) => {
    try {
        const deletedDocGia = await DocGia.findOneAndDelete({ MaDocGia: req.params.id });
        if (!deletedDocGia) {
            return res.status(404).json({ message: "Không tìm thấy đọc giả để xóa" });
        }
        res.status(200).json({ message: "Xóa thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
