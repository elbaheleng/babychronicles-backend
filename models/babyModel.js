const mongoose = require('mongoose') // import mongoose

//create schema
const babySchema = new mongoose.Schema({ //Schema is a class in mongoose
dob:{
    type: String,
    required: true
},
gender:{
    type: String,
    required: true
},
userMail:{
    type: String,
    required: true
},
name:{
    type: String,
    required: true
}

})

const babies = mongoose.model("babies",babySchema) // users is the name of collection
module.exports = babies