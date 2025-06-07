const mongoose = require('mongoose') // import mongoose

//create schema
const healthSchema = new mongoose.Schema({ //Schema is a class in mongoose
date:{
    type: Object,
    required: true
},
time:{
    type: Object,
    required: true
},
type:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
babyid:{
    type: String,
    required: true
}

})

const healths = mongoose.model("healths",healthSchema) // healths is the name of collection
module.exports = healths