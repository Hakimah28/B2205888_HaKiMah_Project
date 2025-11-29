import { createRouter, createWebHistory } from 'vue-router';
import Sach from '../views/Sach.vue';
import MuonTra from '../views/MuonTra.vue';
import DocGia from '../views/DocGia.vue';
import NhanVien from '../views/NhanVien.vue';
import NhaXuatBan from '../views/NhaXuatBan.vue';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Me from '../views/NhanVien.vue';

// ✅ import thêm các trang quản lý
import AdminNhanVien from '../views/AdminNhanvien.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/sach', component: Sach, meta: { requiresAuth: true } },
  { path: '/muontra', component: MuonTra, meta: { requiresAuth: true } },
  { path: '/docgia', component: DocGia, meta: { requiresAuth: true } },
  { path: '/nhanvien', component: NhanVien, meta: { requiresAuth: true } },
  { path: '/nhaxuatban', component: NhaXuatBan, meta: { requiresAuth: true } },
  { path: '/login', component: Auth },
  { path: '/me', component: Me, meta: { requiresAuth: true } },

  // ✅ các route quản lý chỉ cho Quản Lý
  { path: '/adminnhanvien', component: AdminNhanVien, meta: { requiresAuth: true, role: 'Quản Lý' } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, role: 'Quản Lý' } },

  // catch-all
  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Nếu route yêu cầu đăng nhập mà chưa có token
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // Nếu route yêu cầu role mà user không khớp
  if (to.meta.role && currentUser?.chucVu !== to.meta.role) {
    return next("/"); // hoặc chuyển sang trang báo lỗi
  }

  next();
});

export default router;
