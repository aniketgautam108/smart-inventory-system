const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const authMiddleware = require("../middleware/authMiddleware");


// =========================
// ADD PRODUCT
// =========================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const product = new Product({

            ...req.body,

            user: req.user.id

        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// GET ALL PRODUCTS
// =========================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const products = await Product.find({
            user: req.user.id
        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// SEARCH PRODUCT
// =========================

router.get("/search/:name", authMiddleware, async (req, res) => {

    try {

        const products = await Product.find({

            user: req.user.id,

            productName: {

                $regex: req.params.name,

                $options: "i"

            }

        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// LOW STOCK PRODUCTS
// =========================

router.get("/low-stock", authMiddleware, async (req, res) => {

    try {

        const products = await Product.find({

            user: req.user.id,

            quantity: { $lt: 5 }

        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// UPDATE PRODUCT
// =========================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedProduct = await Product.findOneAndUpdate(

            {

                _id: req.params.id,

                user: req.user.id

            },

            req.body,

            {

                new: true

            }

        );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// DELETE PRODUCT
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        await Product.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id

        });

        res.json({

            message: "Product Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;