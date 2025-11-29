const mongoose = require("mongoose");
const TheoDoiMuonSach = require("../models/TheoDoiMuonSach");

mongoose.connect("mongodb://localhost:27017/quanlymuonsach", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const muonSachMau = [
  {
    MaDocGia: "DG001",
    MaSach: "S001",
    NgayMuon: new Date("2025-11-01"),
    NgayTra: new Date("2025-11-10")
  },
  {
    MaDocGia: "DG002",
    MaSach: "S004",
    NgayMuon: new Date("2025-11-03"),
    NgayTra: new Date("2025-11-12")
  },
  {
    MaDocGia: "DG003",
    MaSach: "S007",
    NgayMuon: new Date("2025-11-05"),
    NgayTra: new Date("2025-11-15")
  },
  {
    MaDocGia: "DG004",
    MaSach: "S010",
    NgayMuon: new Date("2025-11-07"),
    NgayTra: new Date("2025-11-20")
  },
  {
    MaDocGia: "DG005",
    MaSach: "S002",
    NgayMuon: new Date("2025-11-08"),
    NgayTra: new Date("2025-11-18")
  },
  {
    MaDocGia: "DG006",
    MaSach: "S012",
    NgayMuon: new Date("2025-11-10"),
    NgayTra: new Date("2025-11-25")
  },
  {
    MaDocGia: "DG007",
    MaSach: "S005",
    NgayMuon: new Date("2025-11-12"),
    NgayTra: new Date("2025-11-22")
  }
];

async function seed() {
  try {
    await TheoDoiMuonSach.deleteMany(); // xoá dữ liệu cũ
    await TheoDoiMuonSach.insertMany(muonSachMau);
    console.log("✅ Đã thêm 7 lượt mượn sách mẫu");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu:", error);
  }
}

seed();
