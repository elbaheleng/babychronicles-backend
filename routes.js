const express = require('express')
const userController = require('./controllers/userController')
const jwtMiddleware = require('./middleware/jwtMiddleware')

//create instance to acces the class router in express
const route = new express.Router()

//user paths
route.post('/register',userController.registerController)//register
route.post('/login', userController.loginController)//login
route.get('/get-all-babies',jwtMiddleware,userController.getAllBabiesController)//get all babies added by a user
route.post("/add-a-new-baby",userController.addANewBabyController)//add a new baby
route.put('/edit-baby-details', userController.editBabyDetailsController)//edit baby details
route.post('/add-breastfeeding',userController.addBreastfeedingController)//add breastfeeding
//export routes
module.exports = route