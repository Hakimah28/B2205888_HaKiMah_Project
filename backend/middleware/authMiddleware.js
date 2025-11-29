const jwt = require("jsonwebtoken");

// 🛡️ Middleware xác thực token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Thiếu token." });

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ." });
    req.user = user;
    next();
  });
}

// 🛡️ Middleware kiểm tra vai trò (dùng chucVu trong token)
function verifyRole(role) {
  return (req, res, next) => {
    if (req.user.chucVu !== role) {
      return res.status(403).json({ message: "Không có quyền truy cập." });
    }
    next();
  };
}

module.exports = { authenticateToken, verifyRole };
