const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema2 = new Schema({
  username: String,
  content: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
const Post= mongoose.model('post', postSchema2)
module.exports = Post