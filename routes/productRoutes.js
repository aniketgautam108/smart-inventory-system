const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// Add Product
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get All Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update Product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete Product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/search/:name", async (req, res) => {

    try {

        const products = await Product.find({
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
router.get("/low-stock", async (req, res) => {

    try {

        const products = await Product.find({
            quantity: { $lt: 5 }
        });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.put("/:id", async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            { returnDocument: "after" }

        );

        res.json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;