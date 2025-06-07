const mongoose = require('mongoose') // import mongoose

//create schema
const photoSchema = new mongoose.Schema({ //Schema is a class in mongoose
babyid:{
    type: String,
    required: true
},
date:{
    type: Object,
    required: true
},
title:{
    type: String,
    required: true
},
description:{
    type: String,
    required: true
},
photo:{
    type: String,
    required: true
}

})

const photos = mongoose.model("photos",photoSchema) // photos is the name of collection
module.exports = photos