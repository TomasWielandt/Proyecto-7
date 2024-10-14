const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: Number,
        require: false,
    },
    address: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean,
        require: false,
        default: true,
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;