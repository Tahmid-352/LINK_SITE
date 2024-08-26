const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const buttonRoutes = require('./routes/buttons');
const adminRoutes = require('./routes/admin');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buttons', buttonRoutes);
app.use('/api/admin', adminRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



// app.get('/api/titles', async (req, res) => {
//   try {
//     const titles = await Title.find();
//     res.json(titles);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post('/api/titles', async (req, res) => {
//   const { title, link } = req.body;
//   const newTitle = new Title({ title, link });
//   try {
//     await newTitle.save();
//     res.status(201).json(newTitle);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// All other routes should return the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
