const mongoose = require("mongoose");

const bankSoalSchema = new mongoose.Schema({
  Title: String,
  waktu: Number,
  ujianId: String,
  type: String,
  Soal: Array,
  harga: Number,
  jawabanBenar: Number
});

module.exports = mongoose.model('BankSoal', bankSoalSchema, 'bankSoal');
