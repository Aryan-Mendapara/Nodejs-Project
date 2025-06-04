const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    // otp: {
    //     type: Number,
    //     require: true
    // }
}, {timestamps: true})

const Login = mongoose.model("Login",LoginSchema)

module.exports = {Login};