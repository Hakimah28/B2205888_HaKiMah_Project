const express = require("express");
const router = express.Router();
const Sach = require("../models/Sach");

// Lấy danh sách tất cả sách
router.get("/", async (req, res) => {
    try {
        const sachList = await Sach.find().populate("MaSach", "TenSach");
        res.json(sachList);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách sách", error });
    }
});

// Thêm sách mới
router.post("/", async (req, res) => {
    try {
        const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc } = req.body;

        // Kiểm tra sách đã tồn tại chưa
        const sachTonTai = await Sach.findOne({ MaSach });
        if (sachTonTai) {
            return res.status(400).json({ message: "Mã sách đã tồn tại!" });
        }

        const sachMoi = new Sach({ MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc });
        await sachMoi.save();
        res.status(201).json({ message: "Thêm sách thành công", sach: sachMoi });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm sách", error });
    }
});

// Cập nhật sách theo ID
router.put("/:id", async (req, res) => {
    try {
        const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc } = req.body;
        const sachCapNhat = await Sach.findByIdAndUpdate(
            req.params.id,
            { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc },
            { new: true }
        );

        if (!sachCapNhat) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }

        res.json({ message: "Cập nhật sách thành công", sach: sachCapNhat });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật sách", error });
    }
});

// Xóa sách theo ID
router.delete("/:id", async (req, res) => {
    try {
        const sachXoa = await Sach.findByIdAndDelete(req.params.id);
        if (!sachXoa) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }
        res.json({ message: "Xóa sách thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa sách", error });
    }
});

// Tìm kiếm sách theo mã hoặc tên
router.get("/search", async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm" });
        }

        // Tìm sách theo MaSach hoặc Tên sách
        const sach = await Sach.find({
            $or: [
                { MaSach: keyword }, // Tìm theo Mã sách
                { TenSach: { $regex: keyword, $options: "i" } } // Tìm theo Tên sách (không phân biệt hoa thường)
            ]
        }).populate("MaNXB"); // Nếu cần lấy thông tin Nhà Xuất Bản

        if (sach.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }

        res.json(sach);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});


module.exports = router;