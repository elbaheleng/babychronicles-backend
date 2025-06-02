const mongoose = require('mongoose') // import mongoose

//create schema
const bottlefeedSchema = new mongoose.Schema({ //Schema is a class in mongoose
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
quantity:{
    type: Number,
    required: true
},
babyid:{
    type: String,
    required: true
}

})

const bottlefeeds = mongoose.model("bottlefeeds",bottlefeedSchema) // bottlefeeds is the name of collection
module.exports = bottlefeeds