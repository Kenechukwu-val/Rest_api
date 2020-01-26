const Product = require('../model/ProductModel');

//controller to add products
exports.addProduct = (req, res, next) => {

        const product = new Product({
             Name: req.body.Name,
             Description: req.body.Description,
             Price: req.body.Price,
             Category: req.body.Category,
             Image: req.file.path,
             Color: req.body.Color,
        })
        product
            .save()
            .then(() => {
                console.log(req.file);
                res.status(200).json({
                    message: 'Products Added Successfully'
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Products Not Added',
                    err
                })
                  
            })

}

//controller to get all products
exports.getProduct = (req, res, next) => {
    Product
        .find()
        .select('_id Name Price')
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Name: doc.Name,
                        Price: doc.Price
                    }
                })
            };

            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })

}


//controller to get a product by ID
exports.getProductId = (req, res, next) => {
    const id = req.params.Id;

    Product.findById(id)
        .then((docs) => {
            res.status(200).json({
                message: 'Requested Product Found',
                docs
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })

}

