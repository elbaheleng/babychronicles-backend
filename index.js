const express = require('express')//import express library
const cors = require('cors')//import cors 
const route = require('./routes')//import route, based on Router class defined in express
require('dotenv').config() // import dotenv and from that, use config() to load env variables
require('./dbconnection')





const babyChroniclesServer = express()// to create the server


babyChroniclesServer.use(cors())//connect the server with frontend using cors
babyChroniclesServer.use(express.json())//to parse JSON data, we use middleware
babyChroniclesServer.use(route)// tell rserver to use route




//create port
PORT = 4000 || process.env.PORT

// make server listen to port
babyChroniclesServer.listen(PORT, ()=>{
    console.log(`server running successfully at port ${PORT}`); 
})