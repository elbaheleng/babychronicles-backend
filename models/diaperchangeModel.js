const mongoose = require('mongoose') // import mongoose

//create schema
const diaperchangeSchema = new mongoose.Schema({ //Schema is a class in mongoose
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

const diaperchanges = mongoose.model("diaperchanges",diaperchangeSchema) // bottlefeeds is the name of collection
module.exports = diaperchanges