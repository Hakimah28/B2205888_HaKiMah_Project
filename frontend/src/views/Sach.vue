<template>
  <div class="sach-page container">
    <div class="header">
      <h2><i class="fas fa-book me-2"></i>Danh sách Sách</h2>
      <div class="actions">
        <button @click="showAddPopup = true" class="btn btn-primary">
          <i class="fas fa-plus me-1"></i> Thêm Sách
        </button>
        <button @click="showSearchPopup = true" class="btn btn-secondary">
          <i class="fas fa-search me-1"></i> Tìm Sách
        </button>
        <button @click="showPinnedPopup = true" class="btn btn-outline-dark">
          📌 Sách đã ghim
        </button>
      </div>
    </div>

    <div v-if="sachList.length" class="book-grid">
      <div
        v-for="sach in sachList"
        :key="sach._id"
        class="book-card shadow-sm"
        @click="viewDetail(sach)"
      >
        <div class="book-info">
          <h5>{{ sach.TenSach }}</h5>
          <p><strong>Mã:</strong> {{ sach.MaSach }}</p>
          <p><strong>Giá:</strong> {{ formatPrice(sach.DonGia) }}</p>
          <p><strong>Số quyển:</strong> {{ sach.SoQuyen }}</p>
          <p><strong>Năm XB:</strong> {{ sach.NamXuatBan }}</p>
          <p><strong>NXB:</strong> {{ sach.MaNXB }}</p>
          <p><strong>Tác giả:</strong> {{ sach.NguonGoc }}</p>
        </div>
        <div class="book-actions" @click.stop>
          <button @click="editSach(sach)" class="btn btn-warning btn-sm">
            <i class="fas fa-edit"></i> Sửa
          </button>
          <button @click="deleteSach(sach._id)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i> Xóa
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-muted text-center mt-4">
      <i class="fas fa-info-circle me-2"></i>Không có dữ liệu sách nào.
    </p>

    <!-- Popups -->
    <AddSachPopup :isOpen="showAddPopup" @close="showAddPopup = false" @added="fetchSach" />
    <SearchSachPopup :isOpen="showSearchPopup" @close="showSearchPopup = false" @search="setSearchResult" />
    <EditSachPopup :isOpen="showEditPopup" :sach="selectedSach" @close="showEditPopup = false" @updated="fetchSach" />
    <BookDetailPopup :isOpen="showDetailPopup" :sach="selectedSach" @close="showDetailPopup = false" @pin="pinSach" />
    <PinnedSachPopup :isOpen="showPinnedPopup" :pinnedList="pinnedList" @close="showPinnedPopup = false" />
  </div>
</template>

<script>
import AddSachPopup from "../components/AddSachPopup.vue";
import SearchSachPopup from "../components/SearchSachPopup.vue";
import EditSachPopup from "../components/EditSachPopup.vue";
import BookDetailPopup from "../components/BookDetailPopup.vue";
import PinnedSachPopup from "../components/PinnedSachPopup.vue";

export default {
  components: {
    AddSachPopup,
    SearchSachPopup,
    EditSachPopup,
    BookDetailPopup,
    PinnedSachPopup
  },
  data() {
    return {
      sachList: [],
      showAddPopup: false,
      showSearchPopup: false,
      showEditPopup: false,
      showDetailPopup: false,
      showPinnedPopup: false,
      selectedSach: null,
      pinnedList: []
    };
  },
  mounted() {
    this.fetchSach();
  },
  methods: {
    async fetchSach() {
      try {
        const response = await fetch("http://localhost:5000/api/sach");
        this.sachList = await response.json();
      } catch (error) {
        console.error("Lỗi khi tải danh sách sách:", error);
      }
    },
    editSach(sach) {
      this.selectedSach = sach;
      this.showEditPopup = true;
    },
    viewDetail(sach) {
      this.selectedSach = sach;
      this.showDetailPopup = true;
    },
    async deleteSach(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa sách này?")) return;
      try {
        await fetch(`http://localhost:5000/api/sach/${id}`, { method: "DELETE" });
        this.fetchSach();
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
      }
    },
    setSearchResult(result) {
      this.sachList = result;
    },
    pinSach(sach) {
      if (!this.pinnedList.find(item => item._id === sach._id)) {
        this.pinnedList.push(sach);
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(price);
    }
  }
};
</script>

<style scoped>
.sach-page {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.actions button {
  margin-left: 10px;
}
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.book-card {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.book-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.book-info h5 {
  margin-bottom: 10px;
  color: #5ba1e6;
}
.book-info p {
  margin: 4px 0;
  font-size: 14px;
}
.book-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
</style>
