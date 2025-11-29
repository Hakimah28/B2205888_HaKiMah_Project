const mongoose = require("mongoose");
const DocGia = require("../models/DocGia");

mongoose.connect("mongodb://localhost:27017/quanlymuonsach", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

    const docGiaMau = [
  {
    MaDocGia: "DG001",
    HoLot: "Nguyen Van",
    Ten: "An",
    NgaySinh: new Date("1995-03-12"),
    Phai: "Nam",
    DiaChi: "123 Lý Tự Trọng, Cần Thơ",
    DienThoai: "0901234567"
  },
  {
    MaDocGia: "DG002",
    HoLot: "Tran Thi",
    Ten: "Bich",
    NgaySinh: new Date("1998-07-25"),
    Phai: "Nữ",
    DiaChi: "45 Nguyễn Trãi, Hà Nội",
    DienThoai: "0912345678"
  },
  {
    MaDocGia: "DG003",
    HoLot: "Le Hoang",
    Ten: "Minh",
    NgaySinh: new Date("2000-01-05"),
    Phai: "Nam",
    DiaChi: "67 Hai Bà Trưng, TP.HCM",
    DienThoai: "0923456789"
  },
  {
    MaDocGia: "DG004",
    HoLot: "Pham Thi",
    Ten: "Lan",
    NgaySinh: new Date("1992-11-20"),
    Phai: "Nữ",
    DiaChi: "12 Trần Hưng Đạo, Đà Nẵng",
    DienThoai: "0934567890"
  },
  {
    MaDocGia: "DG005",
    HoLot: "Vo Van",
    Ten: "Khanh",
    NgaySinh: new Date("1997-09-15"),
    Phai: "Nam",
    DiaChi: "89 Lê Lợi, Huế",
    DienThoai: "0945678901"
  },
  {
    MaDocGia: "DG006",
    HoLot: "Dang Thi",
    Ten: "Mai",
    NgaySinh: new Date("1999-05-30"),
    Phai: "Nữ",
    DiaChi: "34 Nguyễn Huệ, Cần Thơ",
    DienThoai: "0956789012"
  },
  {
    MaDocGia: "DG007",
    HoLot: "Nguyen Hoang",
    Ten: "Phuc",
    NgaySinh: new Date("1994-02-18"),
    Phai: "Nam",
    DiaChi: "56 Phan Chu Trinh, TP.HCM",
    DienThoai: "0967890123"
  },
  {
    MaDocGia: "DG008",
    HoLot: "Tran Van",
    Ten: "Son",
    NgaySinh: new Date("1996-08-08"),
    Phai: "Nam",
    DiaChi: "78 Nguyễn Văn Cừ, Hà Nội",
    DienThoai: "0978901234"
  },
  {
    MaDocGia: "DG009",
    HoLot: "Ho Thi",
    Ten: "Thu",
    NgaySinh: new Date("1993-12-01"),
    Phai: "Nữ",
    DiaChi: "90 Bạch Đằng, Đà Nẵng",
    DienThoai: "0989012345"
  },
  {
    MaDocGia: "DG010",
    HoLot: "Nguyen Thi",
    Ten: "Hanh",
    NgaySinh: new Date("1991-04-22"),
    Phai: "Nữ",
    DiaChi: "101 Trần Phú, Hải Phòng",
    DienThoai: "0990123456"
  }
];

async function seed() {
  try {
    await DocGia.deleteMany(); // xoá dữ liệu cũ
    await DocGia.insertMany(docGiaMau);
    console.log("✅ Đã thêm 10 độc giả mẫu");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu:", error);
  }
}

seed();
