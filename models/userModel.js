const mongoose = require('mongoose') // import mongoose

//create schema
const userSchema = new mongoose.Schema({ //Schema is a class in mongoose
fullname:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
}

})

const users = mongoose.model("users",userSchema) // users is the name of collection
module.exports = users