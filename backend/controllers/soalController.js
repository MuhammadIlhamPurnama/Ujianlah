const BankSoal = require('../models/BankSoal');

exports.getAllSoal = async (req, res) => {
  try {
    const allSoal = await BankSoal.find({});
    res.send(allSoal);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil soal' });
  }
};
