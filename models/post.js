const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  username: String,
  content: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
const Post= mongoose.model('post', postSchema)
module.exports = Post