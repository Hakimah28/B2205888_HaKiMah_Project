<template>
  <div class="popup">
    <div class="popup-content">
      <h3>✏️ Chỉnh sửa nhân viên</h3>
      <form @submit.prevent="updateNhanVien">
        <input v-model="editData.hotenNV" placeholder="Họ tên" />
        <input v-model="editData.diaChi" placeholder="Địa chỉ" />
        <input v-model="editData.soDienThoai" placeholder="Số điện thoại" />
        <select v-model="editData.chucVu">
          <option>Nhân Viên</option>
          <option>Quản Lý</option>
        </select>
        <input v-model="editData.password" type="password" placeholder="Mật khẩu mới (nếu đổi)" />
        <button type="submit">Lưu</button>
        <button type="button" @click="$emit('close')">Đóng</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nhanVien"],
  data() {
    return {
      editData: { ...this.nhanVien, password: "" }
    };
  },
  methods: {
    async updateNhanVien() {
      const token = localStorage.getItem("token");
      const payload = {
        hotenNV: this.editData.hotenNV,
        diaChi: this.editData.diaChi,
        soDienThoai: this.editData.soDienThoai,
        chucVu: this.editData.chucVu
      };
      if (this.editData.password.trim() !== "") {
        payload.password = this.editData.password;
      }
      await fetch(`http://localhost:5000/api/admin/nhanvien/${this.nhanVien.MSNV}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      alert("✅ Cập nhật thành công!");
      this.$emit("updated");
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
@import "PopupStyles.css";
</style>