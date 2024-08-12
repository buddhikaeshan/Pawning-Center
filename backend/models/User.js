const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    login_type: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    profile_completed: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);