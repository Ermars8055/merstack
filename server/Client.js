const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: Number,
  city: String,
  password: String
});

module.exports = mongoose.model("Client", ClientSchema);

