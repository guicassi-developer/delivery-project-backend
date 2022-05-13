const express = require('express');
const addressControll = require('../controllers/address.controller');
const router = express.Router();

router.get('/:id', addressControll.getAddress);

module.exports = {
    routes: router
}