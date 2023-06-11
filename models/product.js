const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type: String},
    category: {type: String},
    price: {type: Number},
    storages:[{
        name: {type: String},
        stock:{type: Number}
    }],
    status: {type: Boolean},
    description: {type: String}
}, {
    collection:'product',
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 30000
    },
    read: 'nearest'
});

const Model = mongoose.model('product', productSchema);
module.exports = Model;