const mongoose = require("mongoose");

const TheoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true }, 
  MaSach: { type: String, required: true },   
  NgayMuon: { type: Date, required: true, default: Date.now },
  NgayTra: { type: Date },
  QuaHan: { type: Boolean, default: false },
  SoNgayTre: { type: Number, default: 0 },
  TienPhat: { type: Number, default: 0 }   // 💰 thêm field tiền phạt
}, { timestamps: true });

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);
