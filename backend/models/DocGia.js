const mongoose = require("mongoose");

const DocGiaSchema = new mongoose.Schema({
    MaDocGia: { type: String, required: true, unique: true },
    HoLot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    Phai: { type: String, required: true },
    DiaChi: { type: String, required: true },
    DienThoai: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("DocGia", DocGiaSchema);
