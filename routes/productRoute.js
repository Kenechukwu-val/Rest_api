const express = require('express');

const ProductController = require('../controller/productController');

const router = express.Router();

//  Route to add a product
router.post('/addProduct', ProductController.addProduct);

// Route to get all products
router.get('/getProduct', ProductController.getProduct);

// Route to get a single product by Id
router.get('/getProduct/:Id', ProductController.getProductId);


module.exports = router