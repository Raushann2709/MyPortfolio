require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Submission Schema
const submissionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

// async function insert()
// {
//   await Submission.create({
//     firstName: 'raushan',
//     lastName: 'shrivastwa',
//     email: 'abc@gmail.com',
//     phone: '62354',
//     message: 'hiii'
//   }
//   )
// }
// insert();


// API Endpoint
app.post('/api/submit', async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving submission' });
  }
});

module.exports = app;
