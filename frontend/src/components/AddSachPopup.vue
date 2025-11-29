<template>
    <div v-if="isOpen" class="popup-overlay">
      <div class="popup-content">
        <h2>Thêm Sách</h2>
        <form @submit.prevent="submitAdd">
          <label>Mã Sách:</label>
          <input v-model="sach.MaSach" type="text" required />
  
          <label>Tên Sách:</label>
          <input v-model="sach.TenSach" type="text" required />
  
          <label>Đơn Giá:</label>
          <input v-model="sach.DonGia" type="number" required />
  
          <label>Số Quyển:</label>
          <input v-model="sach.SoQuyen" type="number" required />
  
          <label>Năm Xuất Bản:</label>
          <input v-model="sach.NamXuatBan" type="number" required />
  
          <label>Nhà Xuất Bản:</label>
          <select v-model="sach.MaNXB" required>
            <option v-for="nxb in danhSachNXB" :key="nxb._id" :value="nxb._id">{{ nxb.TenNXB }}</option>
          </select>
  
          <label>Tác Giả:</label>
          <input v-model="sach.NguonGoc" type="text" required />
  
          <div class="button-group">
            <button type="submit" class="btn-primary">Thêm</button>
            <button type="button" class="btn-secondary" @click="$emit('close')">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted } from "vue";
  
  defineProps({ isOpen: Boolean });
  const emit = defineEmits(["close", "added"]);
  
  const sach = reactive({
    MaSach: "",
    TenSach: "",
    DonGia: 0,
    SoQuyen: 0,
    NamXuatBan: 0,
    MaNXB: "",
    NguonGoc: ""
  });
  
  const danhSachNXB = ref([]);
  
  const fetchNXB = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/nhaxuatban");
      danhSachNXB.value = await response.json();
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhà xuất bản:", error);
    }
  };
  
  const submitAdd = async () => {
    try {
      await fetch("http://localhost:5000/api/sach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sach)
      });
      emit("added");
      emit("close");
    } catch (error) {
      console.error("Lỗi khi thêm sách:", error);
    }
  };
  
  onMounted(fetchNXB);
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    width: 400px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 15px;
    color: #333;
  }
  
  label {
    font-weight: 600;
    color: #444;
    display: block;
    margin-top: 10px;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    margin-top: 5px;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-secondary:hover {
    background: #495057;
  }
  </style>
  