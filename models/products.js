const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    product_id : {
        type : Number
    },
    name : {
        type : String
    },
    price : {
        type : Number
    },
    image : {
        type : String
    }   
});

const ProductModel = new mongoose.model("ProductModel",ProductSchema);


module.exports = ProductModel;