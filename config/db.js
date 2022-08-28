const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://0.0.0.0:27017/')
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = connectDB
