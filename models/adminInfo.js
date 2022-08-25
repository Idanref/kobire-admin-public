const mongoose = require('mongoose');

const adminInfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminInfo = mongoose.model('AdminInfo', adminInfoSchema);

module.exports = AdminInfo;
