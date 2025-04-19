const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const userController = require('../controllers/userController');

router.get('/getuserdata', fetchUser, userController.getUserData);
router.get('/getkeranjangdata', fetchUser, userController.getKeranjangData);
router.get('/pembayarandata', fetchUser, userController.getPembayaranData);
router.get('/historypembayarandata', fetchUser, userController.getHistoryPembayaran);
router.get('/ujiansayadata', fetchUser, userController.getUjianSaya);

router.post('/addtokeranjang', fetchUser, userController.addToKeranjang);
router.post('/removefromkeranjang', fetchUser, userController.removeFromKeranjang);
router.post('/pembayaran', fetchUser, userController.pembayaran);
router.post('/bayar', fetchUser, userController.bayar);
router.post('/batalbayar', fetchUser, userController.batalBayar);
router.post('/selesaiujian', fetchUser, userController.selesaiUjian);

module.exports = router;
