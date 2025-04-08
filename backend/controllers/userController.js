const Users = require('../models/User');

exports.getUserData = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.send(user);
};

exports.getKeranjangData = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.send(user.keranjang);
};

exports.getPembayaranData = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.send(user.pembayaran);
};

exports.getHistoryPembayaran = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.send(user.historyPembayaran);
};

exports.getUjianSaya = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.send(user.ujianSaya);
};

exports.addToKeranjang = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    const ujianId = req.body.ujianId;

    const exist = user.keranjang.some(item => item.ujianId === ujianId);
    if (exist) {
      return res.status(200).json({ success: false, message: 'Soal sudah ada di keranjang' });
    }

    user.keranjang.push(req.body);
    await user.save();

    res.status(200).json({ success: true, message: 'Ujian ditambahkan', keranjang: user.keranjang });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.removeFromKeranjang = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    user.keranjang = user.keranjang.filter(item => item.ujianId !== req.body.ujianId);
    await user.save();

    res.status(200).json({ success: true, message: 'Ujian dihapus', keranjang: user.keranjang });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.pembayaran = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    user.pembayaran.push(user.keranjang);
    user.keranjang = [];
    await user.save();

    res.status(200).json({ success: true, message: 'Pembayaran diproses' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.bayar = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    const index = req.body.index;

    const pembayaranData = user.pembayaran[index];
    if (!pembayaranData) return res.status(400).json({ success: false, message: 'Invalid index' });

    pembayaranData.forEach((ujian) => {
      if (!user.ujianSaya.some(u => u.ujianId === ujian.ujianId)) {
        user.ujianSaya.push(ujian);
      }
    });

    user.historyPembayaran.push(pembayaranData);
    user.pembayaran.splice(index, 1);
    await user.save();

    res.status(200).json({ success: true, message: 'Pembayaran berhasil' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Pembayaran gagal' });
  }
};

exports.batalBayar = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    const index = req.body.index;

    user.pembayaran.splice(index, 1);
    await user.save();

    res.status(200).json({ success: true, message: 'Pembatalan berhasil' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Pembatalan gagal' });
  }
};

exports.selesaiUjian = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    const { ujian } = req.body;

    user.ujianSaya.forEach(item => {
      if (item.ujianId === ujian.ujianId) {
        item.Soal = ujian.Soal;
        item.jawabanBenar = ujian.jawabanBenar;
      }
    });

    user.markModified('ujianSaya');
    await user.save();

    res.status(200).json({ success: true, message: 'Submit berhasil' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Submit gagal' });
  }
};
