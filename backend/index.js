const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require('dotenv').config();
const port = process.env.port;
const MDB_KEY = process.env.MDB_KEY;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const cors = require("cors")

app.use(express.json());
app.use(cors())

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log('Error : ' + error);
  }
});

app.get('/', (req,res) => {
  res.send('Express is runnning')
});


// Connect database
mongoose.connect(MDB_KEY);

// Define the schema for bankSoal collection
const bankSoalSchema = new mongoose.Schema({
  Title: String,
  waktu: Number,
  ujianId: String,
  type: String,
  Soal: Array,
  harga:Number,
  jawabanBenar:Number
});

// Create the model
const BankSoal = mongoose.model('BankSoal', bankSoalSchema, 'bankSoal');

// Create all soal API
app.get('/allsoal', async (req,res) => {
  let allSoal = await BankSoal.find({});
  console.log('AllSoal fetched');
  res.send(allSoal);
})

// Define schema for users model
const usersSchema = new mongoose.Schema({
  nama: {
    type:String,
    required:true
  },
  email: {
    type:String,
    unique:true,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  keranjang : {
    type:Array,
    default:[]
  },
  ujianSaya : {
    type:Array,
    default:[]
  },
  pembayaran : {
    type:Array,
    default:[]
  },
  historyPembayaran : {
    type:Array,
    default:[]
  },
  data: {
    type:Date,
    default:Date.now
  }
})

// Create users model
const Users = mongoose.model('Users', usersSchema);

// Create Signup API
app.post('/signup', async (req,res) => {
  let checkUser = await Users.findOne({email:req.body.email});

  if (checkUser) {
    return res.status(400).json({success:false, errors:"Email sudah digunakan"})
  };


  let keranjang = [];
  let ujianSaya = [];
  let pembayaran = [];
  let historyPembayaran = [];

  const user = new Users({
    nama:req.body.nama,
    email:req.body.email,
    password:req.body.password,
    keranjang:keranjang,
    ujianSaya:ujianSaya,
    pembayaran:pembayaran,
    historyPembayaran:historyPembayaran
  });

  await user.save();

  const data = {
    user :{
      id:user.id
    }
  }

  const token = jwt.sign(data, JWT_SECRET_KEY);
  res.json({success:true,token})

})

// Create login API

app.post('/login', async (req,res) => {
  let user = await Users.findOne({email:req.body.email});

  if (user) {
    let checkPassword = req.body.password = user.password;
    if (checkPassword) {
      const data = {
        user : {
          id: user.id
        }
      }

      const token = jwt.sign(data, JWT_SECRET_KEY);
      res.json({success:true, token});
    } else {
      res.json({success:false, errors:'Password Salah'})
    }
  } else {
    res.json({success:false, errors:'Email Salah / Tidak ada pengguna menggunakan email ini'})
  }
})

// Middleware to fetch user

const fetchUser = async (req,res,next) => {
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).send({errors:"Harap autentikasi menggunakan token yang valid"})
  } else {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);
      req.user = data.user;
      next();
    } catch {
      res.status(401).send({errors:"Harap autentikasi menggunakan token yang valid"})
    }
  }
}

//Create getUserData API
app.get('/getuserdata',fetchUser, async (req,res) => {
  let userData = await Users.findOne({_id:req.user.id});
  res.send(userData)
  console.log('user fetched')
})

//Create getKeranjangData API
app.get('/getkeranjangdata',fetchUser, async (req,res) => {
  let userData = await Users.findOne({_id:req.user.id});
  res.send(userData.keranjang)
  console.log('keranjang fetched')
})

//Create getPembayaranData API
app.get('/pembayarandata',fetchUser, async (req,res) => {
  let userData = await Users.findOne({_id:req.user.id});
  res.send(userData.pembayaran)
  console.log('pembayaran fetched')
})

//Create getHistoryPembayaran API
app.get('/historypembayarandata',fetchUser, async (req,res) => {
  let userData = await Users.findOne({_id:req.user.id});
  res.send(userData.historyPembayaran)
  console.log('History pembayaran fetched')
})

//Create getUjianSaya API
app.get('/ujiansayadata',fetchUser, async (req,res) => {
  let userData = await Users.findOne({_id:req.user.id});
  res.send(userData.ujianSaya)
  console.log('Ujian saya fetched')
})

// Create addToKeranjang API

app.post('/addtokeranjang',fetchUser, async (req,res) => {

  try {
    
    let userData = await Users.findOne({_id:req.user.id});

    if (!userData) {
      return res.status(404).json({message:false, errors:'User not found'})
    }

    const ujianId = req.body.ujianId;
    

    let ujianInKeranjang = userData.keranjang.find(item => item.ujianId === ujianId);

    if (ujianInKeranjang) {
      return res.status(400).json({success: false, message: 'Soal sudah ada di keranjang'});
    } else {
      const newUjian = {
        Title:req.body.Title,
        waktu:req.body.waktu,
        ujianId:req.body.ujianId,
        type:req.body.type,
        Soal:req.body.Soal,
        harga:req.body.harga,
        jawabanBenar:req.body.jawabanBenar
      }

      userData.keranjang.push(newUjian);
    }

    await userData.save()
    
    res.status(200).json({success:true, message:"Ujian telah ditambahkan", keranjang:userData.keranjang})

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:'Server error'})
  }
})

// Create removeFromKeranjang API

app.post('/removefromkeranjang',fetchUser, async (req,res) => {

  try {
    
    let userData = await Users.findOne({_id:req.user.id});

    if (!userData) {
      return res.status(404).json({success:false, errors:'User not found'})
    }

    const ujianId = req.body.ujianId;

    const remainingItem = userData.keranjang.filter(ujian => ujianId != ujian.ujianId);

    userData.keranjang = remainingItem;
    
    await userData.save();
    
    res.status(200).json({success:true, message:"Ujian telah dihapus", keranjang:userData.keranjang})

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message:'Server error'})
  }
})

//Create Pembayaran API 
app.post('/pembayaran',fetchUser, async (req,res) => {

  try {
    let userData = await Users.findOne({_id:req.user.id})
  
    if (!userData) {
      return res.status(404).json({success:false, errors:'Pegguna tidak ditemukan'})
    }
  
    const keranjangData = userData.keranjang;
  
    userData.pembayaran.push(keranjangData);
  
    userData.keranjang = [];
  
    await userData.save();
  
    res.status(200).json({success:true, message:'Pembayaran diproses'})
  } catch (error) {
    console.log('Error memproses pembayaran')
    res.status(500).json({success:false, message:'Server error'})
  }
})


//Create Bayar API
app.post('/bayar',fetchUser, async (req,res) => {

  try {
    let userData = await Users.findOne({_id:req.user.id})
  
    if (!userData) {
      return res.status(404).json({success:false, errors:'Pengguna tidak ditemukan'})
    }
  
    const remainingPembayaran = userData.pembayaran.filter((item,index) => index != req.body.index);
    
    userData.pembayaran[req.body.index].forEach((ujian) => {

      const exist = userData.ujianSaya.some((us) => us.ujianId === ujian.ujianId);

      if (!exist) {
        userData.ujianSaya.push(ujian)
      }

    })

    userData.historyPembayaran.push(userData.pembayaran[req.body.index]);
  
    userData.pembayaran = remainingPembayaran;
  
    await userData.save() ;
  
    res.status(200).json({success:true, message:'Pembayaran berhasil'})
  } catch (error) {
    res.status(500).json({success:false, message:'Pembayaran gagal'})
    console.log('Gagal membayar')
  }
})

//Create BatalBayar API
app.post('/batalbayar',fetchUser, async (req,res) => {
  try {
    let userData = await Users.findOne({_id:req.user.id});

    if(!userData) {
      return res.status(404).json({success:false, message:'Pengguna tidak ditemukan'})
    }

    const remainingPembayaran = userData.pembayaran.filter((item,index) => index != req.body.index);
    
    userData.pembayaran = remainingPembayaran;

    await userData.save() ;

    res.status(200).json({success:true, message:'Pembatalan berhasil'})

  } catch (error) {
    res.status(500).json({success:false, message:'Pembatalan gagal'})
    console.log('Pembatalan gagal')
  }
})

// Create Selesai ujian API
app.post('/selesaiujian',fetchUser, async (req,res) => {

  try {
    let userData = await Users.findOne({_id:req.user.id});

    const newUjian = req.body.ujian.Soal;
    const newJawabanBenar = Number(req.body.ujian.jawabanBenar);

    console.log(newJawabanBenar)

    userData.ujianSaya.forEach((ujian) => {
      if (ujian.ujianId === req.body.ujian.ujianId) {
        ujian.Soal = newUjian ;
        ujian.jawabanBenar = newJawabanBenar;
        userData.markModified('ujianSaya');
      }
    })

    await userData.save()

    res.status(200).json({success:true, message:'Submit berhasil'})
  } catch (error) {
    res.status(500).json({success:false, message:'Submit gagal'})
    console.log('Submit gagal')
  }
})