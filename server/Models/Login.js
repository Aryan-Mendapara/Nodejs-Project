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
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
    // otp: {
    //     type: Number,
    //     require: true
    // }
}, {timestamps: true})

const Login = mongoose.model("rolecheck",LoginSchema)

module.exports = {Login};