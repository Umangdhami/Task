const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    admin_id: {
        type:String,
    },
    product_name: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    product_description: {
        type:String,
        required:true
    },
    category_id: {
        type:String
    }
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
