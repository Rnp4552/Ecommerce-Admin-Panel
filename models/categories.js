const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    
    category_id : {
        type : Number
    },
    name : {
        type : String
    },
});

const categoryModel = new mongoose.model("Categories", categorySchema);

module.exports = categoryModel;