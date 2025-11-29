import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router nếu có
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css'

                   
const app = createApp(App);

app.use(router); // Sử dụng Vue Router (nếu có)
app.mount('#app'); // Gắn ứng dụng vào phần tử có id="app"
