const mongoose = require("mongoose"),Schema = mongoose.Schema

const signupSchema = new mongoose.Schema({
    email:String,
    password:String

});
const signupModal = mongoose.model("Usersignup", signupSchema);
module.exports = signupModal;