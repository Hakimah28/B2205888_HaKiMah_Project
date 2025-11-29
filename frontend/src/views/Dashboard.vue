<template>
  <div class="dashboard">
    <h2>📊 Báo cáo thống kê thư viện</h2>

    <div class="stats-card">
      <div class="stat-item"><strong>Tổng số sách:</strong> {{ stats.sach }}</div>
      <div class="stat-item"><strong>Tổng số độc giả:</strong> {{ stats.docgia }}</div>
      <div class="stat-item"><strong>Tổng số nhân viên:</strong> {{ stats.nhanvien }}</div>
      <div class="stat-item"><strong>Lượt mượn/trả:</strong> {{ stats.muontra }}</div>
    </div>

    <!-- Biểu đồ -->
    <canvas id="statsChart"></canvas>

    <button class="action-btn" @click="showPrintPopup = true">🖨️ In / Xuất PDF</button>

    <div v-if="showPrintPopup" class="popup-overlay">
      <div class="popup-content">
        <h3>📤 Xuất báo cáo thống kê</h3>
        <button @click="printPage">🖨️ In trực tiếp</button>
        <button @click="exportPDF">📄 Tải PDF</button>
        <button @click="showPrintPopup = false">❌ Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  data() {
    return {
      stats: { sach: 0, docgia: 0, nhanvien: 0, muontra: 0 },
      showPrintPopup: false,
      chart: null
    };
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/admin/thongke", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Không thể lấy thống kê");
        this.stats = await res.json();
        this.renderChart();
      } catch (error) {
        console.error("Lỗi thống kê:", error);
        alert("Không thể tải thống kê.");
      }
    },
    renderChart() {
      if (this.chart) this.chart.destroy(); // xoá biểu đồ cũ nếu có
      const ctx = document.getElementById("statsChart");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Sách", "Độc giả", "Nhân viên", "Mượn/Trả"],
          datasets: [
            {
              label: "Thống kê",
              data: [
                this.stats.sach,
                this.stats.docgia,
                this.stats.nhanvien,
                this.stats.muontra
              ],
              backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"]
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Biểu đồ thống kê thư viện"
            }
          }
        }
      });
    },
    printPage() {
      window.print();
    },
    exportPDF() {
      import("jspdf").then(({ jsPDF }) => {
        const doc = new jsPDF();
        const date = new Date().toLocaleString("vi-VN");

        doc.setFontSize(16);
        doc.text("📊 Báo cáo thống kê thư viện", 10, 10);
        doc.setFontSize(10);
        doc.text(`Thời gian tạo: ${date}`, 10, 18);

        doc.line(10, 20, 200, 20);

        doc.setFontSize(12);
        doc.text(`• Tổng số sách: ${this.stats.sach}`, 10, 30);
        doc.text(`• Tổng số độc giả: ${this.stats.docgia}`, 10, 40);
        doc.text(`• Tổng số nhân viên: ${this.stats.nhanvien}`, 10, 50);
        doc.text(`• Lượt mượn/trả: ${this.stats.muontra}`, 10, 60);

        doc.save("baocao_thuvien.pdf");
      });
    }
  }
};
</script>


<style scoped>
.dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.stats-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.stat-item {
  margin: 8px 0;
  font-size: 16px;
}
.action-btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}
.popup-content button {
  margin: 10px 5px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
