const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const MDB_KEY = process.env.MDB_KEY;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MDB_KEY)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/soal', require('./routes/soalRoutes'));

app.get('/', (req, res) => {
  res.send('Express is running (MVC structure)');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
