const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    }

});

module.exports = mongoose.model(
    "Product",
    productSchema
);