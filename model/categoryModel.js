const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name : {
        type: String,
        required: true
    }
});

const categoryModel = mongoose.model("Categorys", categorySchema);

module.exports = categoryModel;
