const mongoose = require('mongoose') // import mongoose

//create schema
const productSchema = new mongoose.Schema({ //Schema is a class in mongoose
title:{
    type: String,
    required: true
},
gender:{
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
},
price:{
    type: Number,
    required: true
},
stock:{
    type: Number,
    required: true
}
})

const products = mongoose.model("products",productSchema) // products is the name of collection
module.exports = products