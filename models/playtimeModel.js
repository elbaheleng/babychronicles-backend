const mongoose = require('mongoose') // import mongoose

//create schema
const playtimeSchema = new mongoose.Schema({ //Schema is a class in mongoose
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
description:{
    type: String,
    required: true
},
babyid:{
    type: String,
    required: true
}
})

const playtimes = mongoose.model("playtimes",playtimeSchema) // playtimes is the name of collection
module.exports = playtimes