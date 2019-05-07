const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  sex: Boolean,
  phone: Number,
  create_time: Date
})
adminSchema.index({id: 1});

const Admin = mongoose.model('Admin', adminSchema, 'admins');

module.exports = Admin;