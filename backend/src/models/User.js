const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  keranjang: { type: Array, default: [] },
  ujianSaya: { type: Array, default: [] },
  pembayaran: { type: Array, default: [] },
  historyPembayaran: { type: Array, default: [] },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', usersSchema);
