const mongoose = require('mongoose');

const users = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        sparse : true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
        required: true
    },
    password: {
        type : String,
        required: true
    },
})

module.exports = mongoose.model('users', users);