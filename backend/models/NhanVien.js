const mongoose = require("mongoose");

const NhanVienSchema = new mongoose.Schema({
    MSNV: { type: String, required: true, unique: true, trim: true },
    hotenNV: { type: String, required: true },
    password: { type: String, required: true },  
    chucVu: { type: String, required: true, enum: ["Nhân Viên", "Quản Lý"] },
    diaChi: { type: String, required: true },
    soDienThoai: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("NhanVien", NhanVienSchema);

