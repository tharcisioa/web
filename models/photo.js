const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = new Schema({
  username: String,
  path: String ,
  caption: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})
const Photos= mongoose.model('photos', photoSchema)
module.exports = Photos

