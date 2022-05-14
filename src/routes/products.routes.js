const express = require('express');
const productsControll = require('../controllers/products.controller');
const router = express.Router();

router.get('/:id', productsControll.getProduct);

module.exports = {
    routes: router
}