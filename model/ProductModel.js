const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);