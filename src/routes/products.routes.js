const express = require('express');
const productsControll = require('../controllers/products.controller');
const router = express.Router();

router.get('/:id', productsControll.getClient);

module.exports = {
    routes: router
}