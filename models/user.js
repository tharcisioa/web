
// 1
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
 
// 2
const userSchema = new Schema({
  email: String,
  username: String,
  password: String
}, {
 
  // 3
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
 
// 4
const User = mongoose.model('user', userSchema)
module.exports = User