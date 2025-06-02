const mongoose = require('mongoose') // import mongoose

//create schema
const sleepSchema = new mongoose.Schema({ //Schema is a class in mongoose
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

const sleeps = mongoose.model("sleeps",sleepSchema) // users is the name of collection
module.exports = sleeps