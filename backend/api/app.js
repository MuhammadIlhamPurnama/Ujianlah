const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const soalRoutes = require('./routes/soalRoutes');

const app = express();
const port = process.env.PORT || 5000;
const MDB_KEY = process.env.MDB_KEY;
const app_url = process.env.APP_URL || '*';

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MDB_KEY)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/soal', soalRoutes);

app.get('/', (req, res) => {
  res.send('Express is running');
});


module.exports = app; 