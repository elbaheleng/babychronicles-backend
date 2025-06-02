const users = require("../models/userModel");
const babies = require("../models/babyModel");
const jwt = require('jsonwebtoken');
const breastfeedings = require("../models/breastfeedingModel");




//register
exports.registerController = async (req, res) => {
    const { fullname, email, password, dob, gender, name } = req.body
    //console.log(fullname, email, password);
    try {
        const existingUser = await users.findOne({ email })// only email because key and value same
        if (existingUser) {
            res.status(409).json('Already user exist')
        } else {
            const newUser = new users({// key and value same, so written only one, newUser is ready in server
                fullname,
                email,
                password,
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
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, 'secretkey')
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
    const email = req.payload
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
   const  {_id, dob, gender, name, userMail} = req.body
    try {
        const babyDetails = await babies.findOneAndUpdate({_id},{_id, dob, gender, name, userMail},{new:true})
        await babyDetails.save()
        res.status(200).json(babyDetails)
    } catch (error) {
         res.status(500).json(error)
    }

}

//add breastfeeding
exports.addBreastfeedingController = async (req, res) => {
   const  {babyid, date, starttime, endtime, duration, side} = req.body
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