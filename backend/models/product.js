const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: false,
    },
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    imageUrl: {
    type: String, 
    required: false, 
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;