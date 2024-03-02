// model/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    image:{type:String},
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
