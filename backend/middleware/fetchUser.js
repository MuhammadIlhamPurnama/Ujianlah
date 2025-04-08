const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ errors: "Token tidak ditemukan" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ errors: "Token tidak valid" });
  }
};

module.exports = fetchUser;
