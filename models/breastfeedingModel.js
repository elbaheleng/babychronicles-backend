const mongoose = require('mongoose') // import mongoose

//create schema
const breastfeedingSchema = new mongoose.Schema({ //Schema is a class in mongoose
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
babyid:{
    type: String,
    required: true
}

})

const breastfeedings = mongoose.model("breastfeedings",breastfeedingSchema) // users is the name of collection
module.exports = breastfeedings