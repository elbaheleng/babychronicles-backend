const mongoose = require('mongoose') // import mongoose

//create schema
const pottytimeSchema = new mongoose.Schema({ //Schema is a class in mongoose
date:{
    type: Object,
    required: true
},
type:{
    type: String,
    required: true
},
time:{
    type: Object,
    required: true
},
babyid:{
    type: String,
    required: true
}

})

const pottytimes = mongoose.model("pottytimes",pottytimeSchema) // pottytimes is the name of collection
module.exports = pottytimes