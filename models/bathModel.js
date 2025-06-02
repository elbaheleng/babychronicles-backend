const mongoose = require('mongoose') // import mongoose

//create schema
const bathSchema = new mongoose.Schema({ //Schema is a class in mongoose
date:{
    type: Object,
    required: true
},
starttime:{
    type: Object,
    required: true
},
endtime:{
    type: Object,
    required: true
},
duration:{
    type: Number,
    required: true
},
babyid:{
    type: String,
    required: true
}
})

const baths = mongoose.model("baths",bathSchema) // baths is the name of collection
module.exports = baths