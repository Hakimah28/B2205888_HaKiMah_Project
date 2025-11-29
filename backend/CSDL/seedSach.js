const mongoose = require("mongoose");
const Sach = require("../models/Sach");

mongoose.connect("mongodb://localhost:27017/quanlymuonsach", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sachMau = [
  {
    MaSach: "S001",
    TenSach: "Lập Trình JavaScript Cơ Bản",
    DonGia: 95000,
    SoQuyen: 10,
    NamXuatBan: 2020,
    MaNXB: "NXB001",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S002",
    TenSach: "Cơ Sở Dữ Liệu",
    DonGia: 120000,
    SoQuyen: 8,
    NamXuatBan: 2019,
    MaNXB: "NXB002",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S003",
    TenSach: "Thuật Toán và Lập Trình",
    DonGia: 150000,
    SoQuyen: 12,
    NamXuatBan: 2021,
    MaNXB: "NXB003",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S004",
    TenSach: "Tiếng Anh Giao Tiếp",
    DonGia: 80000,
    SoQuyen: 15,
    NamXuatBan: 2018,
    MaNXB: "NXB004",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S005",
    TenSach: "Ngữ Pháp Tiếng Anh",
    DonGia: 100000,
    SoQuyen: 20,
    NamXuatBan: 2022,
    MaNXB: "NXB005",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S006",
    TenSach: "Lịch Sử Việt Nam",
    DonGia: 110000,
    SoQuyen: 7,
    NamXuatBan: 2017,
    MaNXB: "NXB006",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S007",
    TenSach: "Địa Lý Thế Giới",
    DonGia: 90000,
    SoQuyen: 9,
    NamXuatBan: 2016,
    MaNXB: "NXB007",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S008",
    TenSach: "Toán Cao Cấp",
    DonGia: 130000,
    SoQuyen: 11,
    NamXuatBan: 2020,
    MaNXB: "NXB008",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S009",
    TenSach: "Văn Học Việt Nam Hiện Đại",
    DonGia: 95000,
    SoQuyen: 6,
    NamXuatBan: 2015,
    MaNXB: "NXB009",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S010",
    TenSach: "Truyện Kiều",
    DonGia: 75000,
    SoQuyen: 5,
    NamXuatBan: 2010,
    MaNXB: "NXB010",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S011",
    TenSach: "Kinh Tế Học Cơ Bản",
    DonGia: 140000,
    SoQuyen: 13,
    NamXuatBan: 2019,
    MaNXB: "NXB011",
    NguonGoc: "Trong nước"
  },
  {
    MaSach: "S012",
    TenSach: "Marketing Hiện Đại",
    DonGia: 160000,
    SoQuyen: 14,
    NamXuatBan: 2021,
    MaNXB: "NXB012",
    NguonGoc: "Trong nước"
  }
];


async function seed() {
  try {
    await Sach.deleteMany(); // xoá dữ liệu cũ
    await Sach.insertMany(sachMau);
    console.log("✅ Đã thêm 12 sách mẫu");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu:", error);
  }
}

seed();
