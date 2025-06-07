const mongoose = require('mongoose') // import mongoose

//create schema
const milestoneSchema = new mongoose.Schema({ //Schema is a class in mongoose
date:{
    type: Object,
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

const milestones = mongoose.model("milestones",milestoneSchema) // milestones is the name of collection
module.exports = milestones