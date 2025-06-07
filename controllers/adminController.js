const users = require("../models/userModel")
const products = require("../models/productModel")


// get all users
exports.getAllUsersController = async (req,res) =>{
    const email = req.payload
    try {
        const allusers = await users.find({email:{$ne:email}})
        res.status(200).json(allusers)
    } catch (error) {
         res.status(500).json(error)
    }
}
//add product
exports.addProductController = async(req,res) =>{
 const { title, gender, description, price, stock } = req.body
    const photo = req.file.filename
    try {
        const existingProduct = await products.findOne({ title })
        if (existingProduct) {
            res.status(401).json('You have already added a product with the same title.')
        } else {
            const newProduct = new products({
                title, gender, description, price, stock, photo
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// get all products
exports.getAllProductsController = async (req,res) =>{
    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    } catch (error) {
         res.status(500).json(error)
    }
}

//delete product
exports.deleteProductController = async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await products.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

//edit product details
exports.editProductDetailsController = async (req, res) => {
    const { _id, price, stock } = req.body
    try {
        const productDetails = await products.findOneAndUpdate({ _id }, { price, stock }, { new: true })
        await productDetails.save()
        res.status(200).json(productDetails)
    } catch (error) {
        res.status(500).json(error)
    }

}