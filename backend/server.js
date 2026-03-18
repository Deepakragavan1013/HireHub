const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/applications', require('./routes/applicationRoutes'))
app.get('/', (req, res) => {
  res.json({ message: 'HireHub API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})