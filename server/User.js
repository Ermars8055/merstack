const mongoose = require('mongoose');

// define schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: Number,
    location: String,
    password: String  // ✅ new field
});

// create model object
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
