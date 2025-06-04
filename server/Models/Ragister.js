const mongoose = require("mongoose");

const RagisterSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true        
    },
    email: {
        type: String,   
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true        
    },
})

const Ragister = mongoose.model("Ragister",RagisterSchema);

module.exports = {Ragister}