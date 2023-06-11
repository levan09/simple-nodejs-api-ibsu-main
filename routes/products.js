var express = require('express');
var router = express.Router();

var ProductService = require('../services/ProductService');
var ApiSecurity = require('../middlewares/apiSecurity');

router.get('/all', ApiSecurity.requireLogin, ProductService.getAllProducts);
router.get('/search', ProductService.search);
router.get('/:id', ProductService.getProduct);
router.post('/', ProductService.addProduct);
router.put('/:id', ProductService.updateProduct);

module.exports = router;