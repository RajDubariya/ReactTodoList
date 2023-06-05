const jwt = require("jsonwebtoken");

// jwt secret key
const JWT_KEY = "raj@@99";

const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(400).json("authorization token not found");
  }

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
