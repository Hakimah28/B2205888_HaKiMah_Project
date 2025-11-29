<template>
    <div v-if="isOpen" class="popup-overlay">
      <div class="popup">
        <h2>Xóa Độc Giả</h2>
        <p>Bạn có chắc chắn muốn xóa độc giả <strong>{{ docGia.ten }}</strong> không?</p>
        <button @click="confirmDelete">Xóa</button>
        <button @click="$emit('close')">Hủy</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isOpen', 'docGia'],
    methods: {
      confirmDelete() {
        this.$emit('deleted', this.docGia.maDocGia);
      }
    }
  };
  </script>
  
  <style scoped>
  /* CSS Popup */
  </style>
  