<template>
  <div v-if="isOpen" class="popup-overlay">
    <div class="popup-content">
      <h2>Tìm Kiếm Sách</h2>
      <form @submit.prevent="searchSach">
        <label>Chọn kiểu tìm kiếm:</label>
        <select v-model="searchType" required>
          <option value="ma">Mã sách</option>
          <option value="ten">Tên sách</option>
          <option value="tacgia">Tác giả</option>
        </select>

        <label>Nhập từ khóa:</label>
        <input v-model="keyword" type="text" required />

        <div class="button-group">
          <button type="submit" class="btn-primary">Tìm</button>
          <button type="button" class="btn-secondary" @click="$emit('close')">Hủy</button>
        </div>
      </form>

      <div v-if="sach">
        <h3>Kết Quả:</h3>
        <p><strong>Mã Sách:</strong> {{ sach.MaSach || 'Không có dữ liệu' }}</p>
        <p><strong>Tên Sách:</strong> {{ sach.TenSach || 'Không có dữ liệu' }}</p>
        <p><strong>Tác Giả:</strong> {{ sach.TacGia || 'Không có dữ liệu' }}</p>
        <p><strong>Nhà Xuất Bản:</strong> {{ sach.NguonGoc || 'Không có thông tin' }}</p>
        <p><strong>Năm Xuất Bản:</strong> {{ sach.NamXuatBan || 'Không có dữ liệu' }}</p>
      </div>
      <p v-else-if="searched">Không tìm thấy sách.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "search"]);

const searchType = ref("ma");
const keyword = ref("");
const sach = ref(null);
const searched = ref(false);

const searchSach = async () => {
  try {
    const queryParam = {
      ma: "ma",
      ten: "ten",
      tacgia: "tacgia"
    }[searchType.value];

    const response = await fetch(`http://localhost:5000/api/sach/search?type=${queryParam}&keyword=${keyword.value}`);
    if (!response.ok) throw new Error("Không tìm thấy sách");

    const data = await response.json();
    sach.value = Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Lỗi khi tìm sách:", error);
    sach.value = null;
  } finally {
    searched.value = true;
  }
};
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
}

.popup-content label {
  font-weight: 600;
  margin-top: 10px;
  display: block;
}

.popup-content input,
.popup-content select {
  padding: 10px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.btn-primary {
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
