const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    user_type: { type: String, maxlength: 1, default: 'U' },
    status: { type: String, maxlength: 1, default: 'I' },
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema, 'users');