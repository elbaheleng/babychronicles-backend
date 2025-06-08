const users = require("../models/userModel");
const babies = require("../models/babyModel");
const jwt = require('jsonwebtoken');
const breastfeedings = require("../models/breastfeedingModel");
const bottlefeeds = require("../models/bottlefeedModel");
const diaperchanges = require("../models/diaperchangeModel");
const sleeps = require("../models/sleepModel");
const pottytimes = require("../models/pottytimeModel");
const playtimes = require("../models/playtimeModel");
const baths = require("../models/bathModel");
const milestones = require("../models/milestoneModel");
const healths = require("../models/healthModel");
const pumpings = require("../models/pumpingModel");
const photos = require("../models/photoModel");
const products = require("../models/productModel");
const stripe = require('stripe')(process.env.STRIPEKEY);
const bcrypt = require('bcrypt');




//register
exports.registerController = async (req, res) => {
    const { fullname, email, password, dob, gender, name } = req.body
    try {
        const existingUser = await users.findOne({ email })// only email because key and value same
        if (existingUser) {
            res.status(409).json('User already exist')
        } else {
            const hashed = await bcrypt.hash(password, 10)
            const newUser = new users({// key and value same, so written only one, newUser is ready in server
                fullname,
                email,
                password: hashed
            })
            
            await newUser.save()// newUser is added to mongoDB
            const newBaby = new babies({
                dob,
                gender,
                userMail: email,
                name
            })
            await newBaby.save()// newUser is added to mongoDB

            res.status(200).json({ newUser })
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })// only email because key and value same
        if (existingUser) {
            const existingpassword = await bcrypt.compare(password, existingUser.password)
            if(existingpassword){
                const token = jwt.sign({ userMail: existingUser.email }, process.env.SECRETKEY)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(401).json("Incorrect email or password") // password doesnot match
            }
        } else {
            res.status(404).json("User doesnot exist. Please Register") // user doesnot exist
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

//get all babies added by user
exports.getAllBabiesController = async (req, res) => {
    console.log("inside controller");
    
    const email = req.payload
    console.log(email);
    
    try {
        const allbabies = await babies.find({ userMail: email })
        res.status(200).json(allbabies)
    } catch (error) {
        res.status(500).json(error)
    }
}

//add a new baby
exports.addANewBabyController = async (req, res) => {
    const { dob, gender, name, usermail } = req.body
    try {
        const existingBaby = await babies.findOne({
            dob,
            gender,
            name,
            userMail: usermail,
        });
        if (existingBaby) {
            res.status(400).json(existingBaby)
        } else {
            const newBaby = new babies({
                dob,
                gender,
                userMail: usermail,
                name
            })
            await newBaby.save()
            res.status(200).json(newBaby)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}
//edit baby details
exports.editBabyDetailsController = async (req, res) => {
    const { _id, dob, gender, name, userMail } = req.body
    try {
        const babyDetails = await babies.findOneAndUpdate({ _id }, { _id, dob, gender, name, userMail }, { new: true })
        await babyDetails.save()
        res.status(200).json(babyDetails)
    } catch (error) {
        res.status(500).json(error)
    }

}

//add breastfeeding
exports.addBreastfeedingController = async (req, res) => {
    const { babyid, date, starttime, endtime, duration, side } = req.body
    console.log(babyid, date, starttime, endtime, duration, side);

    try {
        const newBreastfeeding = new breastfeedings({
            babyid, date, starttime, endtime, duration, side
        })
        await newBreastfeeding.save()
        res.status(200).json(newBreastfeeding)
    } catch (error) {
        res.status(500).json(error)
    }

}
//get breastfeedings
exports.getBreastfeedingsController = async (req, res) => {
    const { id } = req.params
    try {
        const allBreastfeedings = await breastfeedings.find({ babyid: id })
        res.status(200).json(allBreastfeedings)
    } catch (error) {
        res.status(500).json(error)
    }

}
//delete breastfeeding
exports.deleteBreastfeedingController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteBreastfeeding = await breastfeedings.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBreastfeeding)
    } catch (error) {
        res.status(500).json(error)
    }

}

//add bottlefeed
exports.addBottlefeedController = async (req, res) => {
    const { babyid, date, type, time, quantity } = req.body


    try {
        const newBottlefeed = new bottlefeeds({
            babyid, date, type, time, quantity
        })
        await newBottlefeed.save()
        res.status(200).json(newBottlefeed)
    } catch (error) {
        res.status(500).json(error)
    }

}
//get all bottlefeeds
exports.getBottlefeedsController = async (req, res) => {
    const { id } = req.params
    try {
        const allBottlefeeds = await bottlefeeds.find({ babyid: id })
        res.status(200).json(allBottlefeeds)
    } catch (error) {
        res.status(500).json(error)
    }

}
//delete Bottlefeed
exports.deleteBottlefeedController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteBottlefeed = await bottlefeeds.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBottlefeed)
    } catch (error) {
        res.status(500).json(error)
    }

}

//add diaperchange
exports.addDiaperchangeController = async (req, res) => {
    const { babyid, date, type, time } = req.body


    try {
        const newDiaperchange = new diaperchanges({
            babyid, date, type, time
        })
        await newDiaperchange.save()
        res.status(200).json(newDiaperchange)
    } catch (error) {
        res.status(500).json(error)
    }

}
//get all diaperchanges
exports.getDiaperchangesController = async (req, res) => {
    const { id } = req.params
    try {
        const allDiaperchanges = await diaperchanges.find({ babyid: id })
        res.status(200).json(allDiaperchanges)
    } catch (error) {
        res.status(500).json(error)
    }

}
//delete diaperchange
exports.deleteDiaperchangeController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteDiaperchange = await diaperchanges.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteDiaperchange)
    } catch (error) {
        res.status(500).json(error)
    }

}

//add sleep
exports.addSleepController = async (req, res) => {
    const { babyid, date, starttime, endtime, duration } = req.body


    try {
        const newSleep = new sleeps({
            babyid, date, starttime, endtime, duration
        })
        await newSleep.save()
        res.status(200).json(newSleep)
    } catch (error) {
        res.status(500).json(error)
    }

}
//get all sleeps
exports.getSleepsController = async (req, res) => {
    const { id } = req.params
    try {
        const allSleeps = await sleeps.find({ babyid: id })
        res.status(200).json(allSleeps)
    } catch (error) {
        res.status(500).json(error)
    }

}
//delete sleep
exports.deleteSleepController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteSleep = await sleeps.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteSleep)
    } catch (error) {
        res.status(500).json(error)
    }

}
//add pottytime
exports.addPottytimeController = async (req, res) => {
    const { babyid, date, type, time } = req.body


    try {
        const newPottytime = new pottytimes({
            babyid, date, type, time
        })
        await newPottytime.save()
        res.status(200).json(newPottytime)
    } catch (error) {
        res.status(500).json(error)
    }

}
//get all pottytimes
exports.getPottytimesController = async (req, res) => {
    const { id } = req.params
    try {
        const allPottytimes = await pottytimes.find({ babyid: id })
        res.status(200).json(allPottytimes)
    } catch (error) {
        res.status(500).json(error)
    }

}
//delete diaperchange
exports.deletePottytimeController = async (req, res) => {
    const { id } = req.params
    try {
        const deletePottytime = await pottytimes.findByIdAndDelete({ _id: id })
        res.status(200).json(deletePottytime)
    } catch (error) {
        res.status(500).json(error)
    }

}

//add playtime
exports.addPlaytimeController = async (req, res) => {
    const { babyid, date, starttime, endtime, duration, description } = req.body
    try {
        const newPlaytime = new playtimes({
            babyid, date, starttime, endtime, duration, description
        })
        await newPlaytime.save()
        res.status(200).json(newPlaytime)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get playtimes
exports.getPlaytimesController = async (req, res) => {
    const { id } = req.params
    try {
        const allPlaytimes = await playtimes.find({ babyid: id })
        res.status(200).json(allPlaytimes)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete playtime
exports.deletePlaytimeController = async (req, res) => {
    const { id } = req.params
    try {
        const deletePlaytime = await playtimes.findByIdAndDelete({ _id: id })
        res.status(200).json(deletePlaytime)
    } catch (error) {
        res.status(500).json(error)
    }
}

//add bath
exports.addBathController = async (req, res) => {
    const { babyid, date, starttime, endtime, duration } = req.body
    try {
        const newBath = new baths({
            babyid, date, starttime, endtime, duration
        })
        await newBath.save()
        res.status(200).json(newBath)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get baths
exports.getBathsController = async (req, res) => {
    const { id } = req.params
    try {
        const allBaths = await baths.find({ babyid: id })
        res.status(200).json(allBaths)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete bath
exports.deleteBathController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteBath = await baths.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteBath)
    } catch (error) {
        res.status(500).json(error)
    }
}

//add milestone
exports.addMilestoneController = async (req, res) => {
    const { babyid, date, description } = req.body
    try {
        const newMilestone = new milestones({
            babyid, date, description
        })
        await newMilestone.save()
        res.status(200).json(newMilestone)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get milestones
exports.getMilestonesController = async (req, res) => {
    const { id } = req.params
    try {
        const allMilestones = await milestones.find({ babyid: id })
        res.status(200).json(allMilestones)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete milestone
exports.deleteMilestoneController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteMilestone = await milestones.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteMilestone)
    } catch (error) {
        res.status(500).json(error)
    }
}

//add health
exports.addHealthController = async (req, res) => {
    const { babyid, date, type, description, time } = req.body

    try {
        const newHealth = new healths({
            babyid, date, type, description, time
        })
        await newHealth.save()
        res.status(200).json(newHealth)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get healths
exports.getHealthsController = async (req, res) => {
    const { id } = req.params
    try {
        const allHealths = await healths.find({ babyid: id })
        res.status(200).json(allHealths)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete health
exports.deleteHealthController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteHealth = await healths.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteHealth)
    } catch (error) {
        res.status(500).json(error)
    }
}

//add pumping
exports.addPumpingController = async (req, res) => {
    const { usermail, side, quantity, date, starttime, endtime, duration } = req.body
    try {
        const newPumping = new pumpings({
            usermail, side, quantity, date, starttime, endtime, duration
        })
        await newPumping.save()
        res.status(200).json(newPumping)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get pumpings
exports.getPumpingsController = async (req, res) => {
    const { usermail } = req.params

    try {
        const allPumpings = await pumpings.find({ usermail })
        res.status(200).json(allPumpings)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete pumping
exports.deletePumpingController = async (req, res) => {
    const { id } = req.params
    try {
        const deletePumping = await pumpings.findByIdAndDelete({ _id: id })
        res.status(200).json(deletePumping)
    } catch (error) {
        res.status(500).json(error)
    }
}

//add photo
exports.addPhotoController = async (req, res) => {
    const { title, description, date, babyid } = req.body
    const photo = req.file.filename
    try {
        const existingPhoto = await photos.findOne({ photo, babyid })
        if (existingPhoto) {
            res.status(401).json('You have already added a photo with the same filename.')
        } else {
            const newPhoto = new photos({
                title, description, date, babyid, photo
            })
            await newPhoto.save()
            res.status(200).json(newPhoto)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//get photos
exports.getAllPhotosController = async (req, res) => {
    const { babyid } = req.params
    try {
        const allPhotos = await photos.find({ babyid }).sort({date:-1})
        res.status(200).json(allPhotos)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete photo
exports.deletePhotoController = async (req, res) => {
    const { id } = req.params
   // console.log(id);
    
    try {
        const deletePhoto = await photos.findByIdAndDelete({ _id: id })
        res.status(200).json(deletePhoto)
    } catch (error) {
        res.status(500).json(error)
    }
}

//payment controller
exports.makePaymentController = async (req, res) => {
    const { productDetails } = req.body
    
    try {
        const existingProduct = await products.findById({ _id: productDetails._id })
        console.log(existingProduct);
        
        //create stripe checkout session
        const line_item = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: productDetails.title,
                    description: `${productDetails.description}`,
                    metadata: {
                        gender: productDetails.gender,
                        price: `${productDetails.price}`,
                        stock: `${productDetails.stock}`,
                    }
                },
                unit_amount: Math.round(productDetails.price*100) // multiplied by 100 to convert cents to dollar, math.round to round to nearest integer
            },
            quantity: 1
        }]
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], //purchased using card
            line_items: line_item, // details of produt that is being purchased
            mode: "payment",//make payment  or subscription or setup
            success_url: `http://localhost:5173/payment_success/${productDetails._id}`,//url to be shown if payment is successful
            cancel_url: 'http://localhost:5173/payment_error'//url to be shown if payment is failed
        });
        
        res.status(200).json({sessionId:session.id })
    
    } catch (error) {
        res.status(500).json(error)

    }
}
//update stock
exports.updateStockController = async (req, res) => {
    
     const { id } = req.params
     console.log(id);
     
    try {
        const productDetails = await products.findOneAndUpdate({_id:id}, { $inc: { stock: -1 } }, { new: true })
        await productDetails.save()
        console.log(productDetails);
        
        res.status(200).json(productDetails)
    } catch (error) {
        res.status(500).json(error)
    }

}