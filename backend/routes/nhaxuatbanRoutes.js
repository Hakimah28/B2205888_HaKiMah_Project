const express = require("express");
const NhaXuatBan = require("../models/NhaXuatBan");

const router = express.Router();

// Lấy danh sách nhà xuất bản
router.get("/", async (req, res) => {
  try {
    const nxbList = await NhaXuatBan.find();
    res.json(nxbList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Thêm nhà xuất bản mới
router.post("/", async (req, res) => {
  try {
    const newNXB = new NhaXuatBan(req.body);
    await newNXB.save();
    res.status(201).json(newNXB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật nhà xuất bản
router.put("/:id", async (req, res) => {
  try {
    const updatedNXB = await NhaXuatBan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNXB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa nhà xuất bản
router.delete("/:id", async (req, res) => {
  try {
    await NhaXuatBan.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa nhà xuất bản thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
