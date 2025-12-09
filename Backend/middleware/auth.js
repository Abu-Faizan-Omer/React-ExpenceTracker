
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = (req, res, next) => {
  try {
    let token = req.header("Authorization")
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" })
    }
    
   
    if (token.startsWith("Bearer ")) {
      token = token.slice(7); // "Bearer abc123" → "abc123"
    }
    
    const decoded = jwt.verify(token, 'secretkey');
    console.log(" User ID:", decoded.userId);
    
    req.user = { id: decoded.userId } // { userId: 1 }
    next();
  } catch (err) {
    console.error(" Auth error:", err.message);
    return res.status(401).json({ success: false });
  }
};

module.exports = { authenticate };
