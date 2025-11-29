const mongoose = require("mongoose");
const NhaXuatBan = require("../models/NhaXuatBan");

mongoose.connect("mongodb://localhost:27017/quanlymuonsach", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const nxbMau = [
  {
    MaNXB: "NXB001",
    TenNXB: "NXB Giáo Dục",
    DiaChi: "123 Lý Tự Trọng, Hà Nội"
  },
  {
    MaNXB: "NXB002",
    TenNXB: "NXB Khoa Học",
    DiaChi: "45 Nguyễn Trãi, TP.HCM"
  },
  {
    MaNXB: "NXB003",
    TenNXB: "NXB Trẻ",
    DiaChi: "67 Hai Bà Trưng, TP.HCM"
  },
  {
    MaNXB: "NXB004",
    TenNXB: "NXB Ngoại Ngữ",
    DiaChi: "12 Trần Hưng Đạo, Đà Nẵng"
  },
  {
    MaNXB: "NXB005",
    TenNXB: "NXB Giáo Dục",
    DiaChi: "89 Lê Lợi, Huế"
  },
  {
    MaNXB: "NXB006",
    TenNXB: "NXB Chính Trị",
    DiaChi: "34 Nguyễn Huệ, Hà Nội"
  },
  {
    MaNXB: "NXB007",
    TenNXB: "NXB Khoa Học",
    DiaChi: "56 Phan Chu Trinh, TP.HCM"
  },
  {
    MaNXB: "NXB008",
    TenNXB: "NXB Giáo Dục",
    DiaChi: "78 Nguyễn Văn Cừ, Cần Thơ"
  },
  {
    MaNXB: "NXB009",
    TenNXB: "NXB Văn Học",
    DiaChi: "90 Bạch Đằng, Đà Nẵng"
  },
  {
    MaNXB: "NXB010",
    TenNXB: "NXB Văn Học",
    DiaChi: "101 Trần Phú, Hải Phòng"
  },
  {
    MaNXB: "NXB011",
    TenNXB: "NXB Kinh Tế",
    DiaChi: "202 Nguyễn Huệ, Hà Nội"
  },
  {
    MaNXB: "NXB012",
    TenNXB: "NXB Kinh Tế",
    DiaChi: "303 Lê Lợi, TP.HCM"
  }
];


async function seed() {
  try {
    await NhaXuatBan.deleteMany(); // xoá dữ liệu cũ
    await NhaXuatBan.insertMany(nxbMau);
    console.log("✅ Đã thêm 12 NXB mẫu");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu:", error);
  }
}

seed();
