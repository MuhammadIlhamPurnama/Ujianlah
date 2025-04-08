const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.signup = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, errors: "Email sudah digunakan" });
    }

    const user = new Users({ nama, email, password });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET_KEY);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user || user.password !== password) {
      return res.json({ success: false, errors: 'Email atau password salah' });
    }

    const token = jwt.sign({ user: { id: user.id } }, JWT_SECRET_KEY);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
