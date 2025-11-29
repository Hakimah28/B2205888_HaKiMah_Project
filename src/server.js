// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Route test
app.get('/', (req, res) => {
  res.send('Server chạy thành công ');
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server đang chạy tại http://localhost:${PORT}`);
});
