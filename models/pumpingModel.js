const mongoose = require('mongoose') // import mongoose

//create schema
const pumpingSchema = new mongoose.Schema({ //Schema is a class in mongoose
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
side:{
    type: String,
    required: true
},
usermail:{
    type: String,
    required: true
},
quantity:{
    type: Number,
    required: true
}

})

const pumpings = mongoose.model("pumpings",pumpingSchema) // pumpings is the name of collection
module.exports = pumpings