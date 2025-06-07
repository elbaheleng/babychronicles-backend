const express = require('express')
const userController = require('./controllers/userController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/imgMulterMiddleware')
const adminController = require('./controllers/adminController')



//create instance to acces the class router in express
const route = new express.Router()

//user paths
route.post('/register',userController.registerController)//register
route.post('/login', userController.loginController)//login
route.get('/get-all-babies',jwtMiddleware,userController.getAllBabiesController)//get all babies added by a user
route.post("/add-a-new-baby",userController.addANewBabyController)//add a new baby
route.put('/edit-baby-details', userController.editBabyDetailsController)//edit baby details
route.post('/add-breastfeeding',userController.addBreastfeedingController)//add breastfeeding
route.get('/get-breastfeedings/:id',userController.getBreastfeedingsController)//get breastfeedings of a baby
route.delete('/delete-breastfeeding/:id',userController.deleteBreastfeedingController)//delete breastfeeding of a baby
route.post('/add-bottlefeed',userController.addBottlefeedController)//add Bottlefeed
route.get('/get-bottlefeeds/:id',userController.getBottlefeedsController)//get Bottlefeeds of a baby
route.delete('/delete-bottlefeed/:id',userController.deleteBottlefeedController)//delete Bottlefeed of a baby
route.post('/add-diaperchange',userController.addDiaperchangeController)//add diaperchange
route.get('/get-diaperchanges/:id',userController.getDiaperchangesController)//get diaperchanges of a baby
route.delete('/delete-diaperchange/:id',userController.deleteDiaperchangeController)//delete diaperchange of a baby
route.post('/add-sleep',userController.addSleepController)//add sleep
route.get('/get-sleeps/:id',userController.getSleepsController)//get sleeps of a baby
route.delete('/delete-sleep/:id',userController.deleteSleepController)//delete sleep of a baby
route.post('/add-pottytime',userController.addPottytimeController)//add Pottytime
route.get('/get-pottytimes/:id',userController.getPottytimesController)//get Pottytimes of a baby
route.delete('/delete-pottytime/:id',userController.deletePottytimeController)//delete Pottytime of a baby
route.post('/add-playtime',userController.addPlaytimeController)//add playtime
route.get('/get-playtimes/:id',userController.getPlaytimesController)//get playtimes of a baby
route.delete('/delete-playtime/:id',userController.deletePlaytimeController)//delete playtime of a baby
route.post('/add-bath',userController.addBathController)//add bath
route.get('/get-baths/:id',userController.getBathsController)//get baths of a baby
route.delete('/delete-bath/:id',userController.deleteBathController)//delete bath of a baby
route.post('/add-milestone',userController.addMilestoneController)//add milestone
route.get('/get-milestones/:id',userController.getMilestonesController)//get milestones of a baby
route.delete('/delete-milestone/:id',userController.deleteMilestoneController)//delete milestone of a baby
route.post('/add-health',userController.addHealthController)//add health
route.get('/get-healths/:id',userController.getHealthsController)//get healths of a baby
route.delete('/delete-health/:id',userController.deleteHealthController)//delete health of a baby
route.post('/add-pumping',userController.addPumpingController)//add pumping
route.get('/get-pumpings/:usermail',userController.getPumpingsController)//get pumpings 
route.delete('/delete-pumping/:id',userController.deletePumpingController)//delete pumping 
route.post('/add-photo',multerConfig.single('photo'), userController.addPhotoController)//add photo
route.get('/get-photos/:babyid',userController.getAllPhotosController)//get all photos 
route.delete('/delete-photo/:id',userController.deletePhotoController)//delete photo 
route.put('/make-payment',userController.makePaymentController)// make payment
route.put('/update-stock/:id',userController.updateStockController)// make payment
//admin paths
route.get('/get-all-users',jwtMiddleware,adminController.getAllUsersController )//get all users
route.post('/add-product',multerConfig.single('photo'), adminController.addProductController)//add photo
route.get('/get-all-products',adminController.getAllProductsController )//get all products
route.delete('/delete-product/:id',adminController.deleteProductController)//delete product 
route.put('/edit-product-details', adminController.editProductDetailsController)//edit product details







//export routes
module.exports = route