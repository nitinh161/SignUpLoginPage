const mongoose = require('mongoose')
const findOrCreate = require("mongoose-findorcreate");
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  facebookId:{
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email:{
type:String,
required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', UserSchema)