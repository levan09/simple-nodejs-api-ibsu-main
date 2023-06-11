const res = require('express/lib/response');
const ProductModel = require('../models/product');
const ApiResponse = require('../utils/ApiResponse');
const error = require('mongoose/lib/error');


module.exports = {
    getAllProducts: async(req, res) =>{
        try{
            const products = await ProductModel.find({});
            ApiResponse.success(res, products);
        }catch(error){
            ApiResponse.failure(res, error, 'error_on_getAllProducts');
        }
    },

    getProduct: async(req, res) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            ApiResponse.success(res, product);
        }catch(error){
            ApiResponse.failure(res, error, 'error_on_getProductById')
        }
    },

    addProduct: async(req, res) => {
        try{
            const body = req.body;
            const result = await new ProductModel(body).save();
            ApiResponse.success(res, result);
        }catch(error){
            ApiResponse.failure(res, error, 'error_on_addProduct')
        }
    },

    updateProduct: async(req, res) => {
        try {
            const rec = await ProductModel.findByIdAndUpdate({
                _id: req.params.id
            },{
                $set: req.body
            }, {
                new: true
            });
            if(!rec){
                ApiResponse.failure(res, {}, 'record_not_found', 404);
            }
            ApiResponse.success(res, rec);
        }catch(error){
            ApiResponse.failure(res, error, 'eror_on_updateProduct');
        }
    },
    
    search: async (req, res) => {
        try {
            const query = req.query;
            let skip = 0;
            let limit = 10;
            if (query.skip) {
                skip = +query.skip;
            }
            if (query.limit) {
                limit = +query.limit;
            }
            const queryForSearch = {};
            if (req.query.searchText) {
                queryForSearch.$or = {
                    name: new RegExp(`.*${req.query.searchText}.*`, "i")
                }
            }
            const result = await StudentModel.find(queryForSearch)
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(limit)
                .lean();
            ApiResponse.success(res, result);
        } catch (error) {
            ApiResponse.failure(res, error, 'error_on_search');
        }
    }
}
